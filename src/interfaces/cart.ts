import { ProductInterface } from "./product";

export interface CartInterface {
  buyerId: string;
  productId: ProductInterface;
  quantity: number;
  checked: boolean;
}
