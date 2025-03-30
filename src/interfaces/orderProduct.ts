import { AddressInterface } from "./addressUser";
import { ProductInterface } from "./product";

interface productArray {
  productId: ProductInterface[];
  quantity: number;
}

export interface OrderProductInterface {
  _id: string;
  buyerId: string;
  addressId: AddressInterface;
  status: string;
  note: string;
  shippingFee: number;
  totalAmount: number;
  products: productArray;
  paymentMethod: string;
  received: boolean;
}
