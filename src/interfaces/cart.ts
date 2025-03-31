import { ProductInterface } from "./product";

export interface CartInterface {
  buyerId: string;
  productId: string;
  product: ProductInterface;
  quantity: number;
  checked: boolean;
}
