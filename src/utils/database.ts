import { BrandDTO, CategoryDTO, CategoryWithQuantityType, DatabaseDTO, OrderDTO, OrderProductType, OrderStatusDTO, OrderType, PaymentMethodDTO, ProductDTO, ProductImageDTO, ProductType, ShippingDTO, UserDTO, UserPaymentMethodDTO } from "@/types";
import { JsonServerRouter } from "json-server"
import { LowdbSync } from "lowdb"
import { generateId } from "./common";

export class DB {
  db: LowdbSync<DatabaseDTO>;
  constructor(router: JsonServerRouter<DatabaseDTO>) {
    this.db = router.db;
  }

  // 1.1. Get a single product
  getProduct(productId: number): ProductType | undefined {
    const product: ProductDTO | undefined = this.db.get("products").value().binarySearch((product) => [product.id, productId])
    if (product) {
      const brand: BrandDTO = this.db.get("brands").value().binarySearch((brand) => [brand.id, product.brandId])!
      const category: CategoryDTO = this.db.get("categories").value().binarySearch((category) => [category.id, product.categoryId])!
      const productImages: ProductImageDTO[] = this.db.get("productImages").value().filter((productImage) => productImage.productId === product.id)

      const productResponse: ProductType = {
        ...product,
        brand,
        category,
        productImages,
      }
      return productResponse;
    }
    return undefined;
  }

  // 1.2. Get all products
  getProducts(categoryId: number | undefined = undefined): ProductType[] | undefined {
    let products: ProductDTO[] | undefined
    if (categoryId) {
      products = this.db.get("products").value().filter((product) => product.categoryId === categoryId && !product.isDeprecated);
      if (!products) {
        return undefined
      }
    } else {
      products = this.db.get("products").value().filter((product) => !product.isDeprecated);
    }
    const allProductsResponse: ProductType[] = products.map(({ id }) => this.getProduct(id)!);
    return allProductsResponse;
  }

  // 1.3. Add a product
  // 1.3.1. Add information of the product
  addProduct(newProduct: ProductDTO) {
    newProduct.id = generateId(this.db.get("products").value());
    this.db.get("products").push(newProduct).write();
    return newProduct
  }

  // 1.4. Deprecated a product
  deprecatedProduct(productId: number): void {
    const product = this.db.get("products")
      .value().binarySearch(({ id }) => [id, productId])!;
    if (product.isDeprecated) {
      product.isDeprecated = false
    } else {
      product.isDeprecated = true
    }
    this.db.write();
  }

  // 1.5. Update product
  // 1.5.1. Update product images
  deleteProductImages(productImageIds: number[]): void {
    let productImages = this.db.get("productImages")
    productImageIds.forEach((id) => {
      productImages = productImages.remove({ id });
    })
    productImages.write();
  }
  // 1.5.2. Upload new images
  uploadProductImages(productId: number, fileList: Express.Multer.File[]) {
    fileList.forEach((file) => {
      const productImage: ProductImageDTO = {
        id: generateId(this.db.get("productImages").value()),
        imageName: file.originalname,
        imageURL: `/api/public/images/${file.filename}`,
        productId
      }
      this.db.get("productImages").push(productImage).write();
    })
  }

  // 2.1. Get a category
  getCategory(categoryId: number): CategoryWithQuantityType | undefined {
    const category: CategoryDTO | undefined = this.db.get("categories").value().binarySearch((category) => [category.id, categoryId])
    if (category) {
      const quantity: number = this.db.get("products").value().reduce((quantity, product) => {
        if (product.categoryId === category.id && !product.isDeprecated) quantity++;
        return quantity
      }, 0)
      const categoryResponse: CategoryWithQuantityType = {
        ...category,
        quantity
      }
      return categoryResponse;
    }
    return undefined;
  }

  // 2.2. Get all categories
  getCategories(): CategoryWithQuantityType[] {
    const categories: CategoryDTO[] = this.db.get("categories").value();
    const categoriesResponse: CategoryWithQuantityType[] = categories.map(({ id: categoryId }) => {
      return this.getCategory(categoryId)!
    })
    return categoriesResponse;
  }

  // 8.1. Get a order details
  getOrder(orderId: number): OrderType | undefined {
    const orderDTO: OrderDTO | undefined = this.db.get("orders").value().binarySearch((order) => [order.id, orderId]);
    if (orderDTO) {
      const orderStatusDTO: OrderStatusDTO = this.db.get("orderStatuses").value().binarySearch((orderStatus) => [orderStatus.id, orderDTO.orderStatusId])!;
      const shippingDTO: ShippingDTO = this.db.get("shippings").value().binarySearch((shipping) => [shipping.id, orderDTO.shippingId])!;
      const userPaymentMethodDTO: UserPaymentMethodDTO = this.db.get("userPaymentMethods").value().binarySearch((userPaymentMethod) => [userPaymentMethod.id, orderDTO.userPaymentMethodId])!;
      const paymentMethodDTO: PaymentMethodDTO = this.db.get("paymentMethods").value().binarySearch((paymentMethod) => [paymentMethod.id, userPaymentMethodDTO.paymentMethodId])!;
      const userDTO: UserDTO = this.db.get("users").value().binarySearch((user) => [user.id, userPaymentMethodDTO.userId])!;
      const orderProducts: OrderProductType[] = []
      this.db.get("orderProducts").value().forEach((orderProduct) => {
        if (orderProduct.orderId === orderDTO.id) {
          orderProducts.push({ ...orderProduct, product: this.getProduct(orderProduct.productId)! })
        }
      })

      const orderResponse: OrderType = {
        ...orderDTO,
        orderStatus: orderStatusDTO,
        shipping: shippingDTO,
        userPaymentMethod: {
          ...userPaymentMethodDTO,
          paymentMethod: paymentMethodDTO,
          user: userDTO
        },
        orderProducts
      };

      return orderResponse;
    }
    return undefined
  }

  // 8.2. Get all orders
  getOrders(statusId: number | undefined = undefined): OrderType[] {
    let orders: OrderDTO[];
    if (statusId === undefined) {
      orders = this.db.get("orders").value()
    } else {
      orders = this.db.get("orders").value().filter((order) => order.orderStatusId === statusId)
    }
    const allOrdersResponse: OrderType[] = orders.map((order) => this.getOrder(order.id)!)
    return allOrdersResponse
  }
}