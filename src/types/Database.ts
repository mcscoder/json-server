export interface DatabaseDTO {
  users: UserDTO[];
  shippings: ShippingDTO[];
  paymentMethods: PaymentMethodDTO[];
  userPaymentMethods: UserPaymentMethodDTO[];
  orderStatuses: OrderStatusDTO[];
  brands: BrandDTO[];
  categories: CategoryDTO[];
  products: ProductDTO[];
  productImages: ProductImageDTO[];
  orders: OrderDTO[];
  orderProducts: OrderProductDTO[];
}

export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
export interface ShippingDTO {
  id: number;
  name: string;
}
export interface PaymentMethodDTO {
  id: number;
  name: string;
}
export interface UserPaymentMethodDTO {
  id: number;
  cardholderName: string;
  cardNumber: string;
  paymentMethodId: number;
  userId: number;
}
export interface OrderStatusDTO {
  id: number;
  name: string;
}
export interface BrandDTO {
  id: number;
  name: string;
}
export interface CategoryDTO {
  id: number;
  name: string;
}
export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  quantity: number;
  regularPrice: number;
  salePrice: number;
  sku: string;
  sales: number;
  brandId: number;
  categoryId: number;
}
export interface ProductImageDTO {
  id: number;
  imageURL: string;
  imageName: string;
  productId: number;
}
export interface OrderDTO {
  id: number;
  note: string;
  address: string;
  orderStatusId: number;
  shippingId: number;
  userPaymentMethodId: number;
}
export interface OrderProductDTO {
  productId: number;
  orderId: number;
  quantity: number;
  price: number;
}