import { BrandDTO, CategoryDTO, OrderDTO, OrderProductDTO, OrderStatusDTO, PaymentMethodDTO, ProductDTO, ProductImageDTO, ShippingDTO, UserDTO, UserPaymentMethodDTO } from "./Database";

export type UserPaymentMethodType = Pick<UserPaymentMethodDTO, "id" | "cardholderName" | "cardNumber"> & {
  paymentMethod: PaymentMethodDTO;
  user: UserDTO;
}

export type OrderType = Pick<OrderDTO, "id" | "note" | "address"> & {
  orderStatus: OrderStatusDTO;
  shipping: ShippingDTO;
  userPaymentMethod: UserPaymentMethodType;
  orderProducts: OrderProductType[];
}

export type ProductType = Pick<ProductDTO, "id" | "name" | "description" | "quantity" | "regularPrice" | "salePrice" | "sku" | "sales"> & {
  brand: BrandDTO;
  category: CategoryDTO;
  productImages: Pick<ProductImageDTO, "id" | "imageName" | "imageURL">[]
}

export type OrderProductType = OrderProductDTO & {
  product: ProductType;
}

export type CategoryWithQuantityType = CategoryDTO & {
  quantity: number
}