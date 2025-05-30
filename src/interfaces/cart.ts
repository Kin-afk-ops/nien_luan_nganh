import { ProductInterface } from "./product";

export interface CartInterface {
  _id: string;
  buyerId: string;
  productId: string;
  product: ProductInterface;
  quantity: number;
  checked: boolean;
}

export interface CartFormInterface {
  productId: string;
  quantity: number;
}
