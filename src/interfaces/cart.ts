import { ProductInterface } from "./product";

export interface CartInterface {
  buyerId: string;
  productId: string;
  quantity: number;
  checked: boolean;
}
