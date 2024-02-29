import { BrandDTO, CategoryDTO, DatabaseDTO, OrderDTO, OrderProductDTO, OrderStatusDTO, OrderType, PaymentMethodDTO, ProductDTO, ProductImageDTO, ProductType, ShippingDTO, UserDTO, UserPaymentMethodDTO } from "@/types";
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
      products = this.db.get("products").value().filter((product) => product.categoryId === categoryId);
      if (!products) {
        return undefined
      }
    } else {
      products = this.db.get("products").value();
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

  // 8.1. Get a order details
  getOrder(orderId: number): OrderType | undefined {
    const orderDTO: OrderDTO | undefined = this.db.get("orders").value().binarySearch((order) => [order.id, orderId]);
    if (orderDTO) {
      const orderStatusDTO: OrderStatusDTO = this.db.get("orderStatuses").value().binarySearch((orderStatus) => [orderStatus.id, orderDTO.orderStatusId])!;
      const shippingDTO: ShippingDTO = this.db.get("shippings").value().binarySearch((shipping) => [shipping.id, orderDTO.shippingId])!;
      const userPaymentMethodDTO: UserPaymentMethodDTO = this.db.get("userPaymentMethods").value().binarySearch((userPaymentMethod) => [userPaymentMethod.id, orderDTO.userPaymentMethodId])!;
      const paymentMethodDTO: PaymentMethodDTO = this.db.get("paymentMethods").value().binarySearch((paymentMethod) => [paymentMethod.id, userPaymentMethodDTO.paymentMethodId])!;
      const userDTO: UserDTO = this.db.get("users").value().binarySearch((user) => [user.id, userPaymentMethodDTO.userId])!;
      const orderProductDTO: OrderProductDTO[] = this.db.get("orderProducts").value().filter(({ orderId }) => orderId === orderDTO.id)!;
      const productDTOs: ProductDTO[] = orderProductDTO.map((orderProduct) => this.db.get("products").value().binarySearch((product) => [product.id, orderProduct.productId])!);

      const orderResponse: OrderType = {
        ...orderDTO,
        orderStatus: orderStatusDTO,
        shipping: shippingDTO,
        userPaymentMethod: {
          ...userPaymentMethodDTO,
          paymentMethod: paymentMethodDTO,
          user: userDTO
        },
        products: productDTOs
      };

      return orderResponse;
    }
    return undefined
  }

  // 8.2. Get all orders
  getOrders(): OrderType[] {
    const orders: OrderDTO[] = this.db.get("orders").value();
    const allOrdersResponse: OrderType[] = orders.map((order) => this.getOrder(order.id)!)
    return allOrdersResponse
  }
}