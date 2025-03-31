import { AddressInterface } from "./addressUser";
import { InfoUserInterface } from "./infoUser";

export interface ICategory {
  id: string;
  name?: string;
  slug?: string;
  parentId?: string | null;
}

export interface ProductInterface {
  _id: string;
  name: string;
  sellerId: string;
  categories?: ICategory;
  slug: string;
  condition: string;
  quantity: number;
  price: number;
  description: string;
  details?: Record<string, any>;
  addressId: string;
  addressInfo: AddressInterface;
  sellerInfo: InfoUserInterface;
  image: {
    id: string;
    url: string;
  };
  discount: number;

  size: string;
  isFreeShip: boolean;
  sold: boolean;
}
