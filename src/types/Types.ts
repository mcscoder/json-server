import { OrderDTO, OrderStatusDTO, PaymentMethodDTO, ProductDTO, ShippingDTO, UserDTO, UserPaymentMethodDTO } from "./Database";

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