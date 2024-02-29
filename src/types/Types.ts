import { BrandDTO, CategoryDTO, OrderDTO, OrderStatusDTO, PaymentMethodDTO, ProductDTO, ProductImageDTO, ShippingDTO, UserDTO, UserPaymentMethodDTO } from "./Database";

export type UserPaymentMethodType = Pick<UserPaymentMethodDTO, "id" | "cardholderName" | "cardNumber"> & {
  paymentMethod: PaymentMethodDTO;
  user: UserDTO;
}

export type OrderType = Pick<OrderDTO, "id" | "note" | "address"> & {
  orderStatus: OrderStatusDTO;
  shipping: ShippingDTO;
  userPaymentMethod: UserPaymentMethodType;
  products: ProductDTO[];
}

export type ProductType = Pick<ProductDTO, "id" | "name" | "description" | "quantity" | "regularPrice" | "salePrice" | "sku"> & {
  brand: BrandDTO;
  category: CategoryDTO;
  productImages: Pick<ProductImageDTO, "id" | "imageName" | "imageURL">[]
}