import { AddressInterface } from "./addressUser";
import { ProductInterface } from "./product";

export interface OrderProductInterface {
  _id: string;
  buyerId: string;
  addressId: string;
  externalAddress: AddressInterface;
  status: string;
  note: string;
  shippingFee: number;
  totalAmount: number;
  productId: string;
  product: ProductInterface;
  quantity: number;
  paymentMethod: string;
  received: boolean;
}

export interface OrderProductForm {
  buyerId: string;
  addressId: string;

  note: string;
  shippingFee: number;
  totalAmount: number;
  productId: string;
  quantity: number;
  paymentMethod: string;
}
