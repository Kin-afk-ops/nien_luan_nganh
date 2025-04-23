import { AddressInterface } from "./addressUser";
import { CategoriesInterface } from "./categories";
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
    path: string;
    publicId: string;
  };
  discount: number;

  size: string;
  isFreeShip: boolean;
  sold: boolean;
  approve: boolean;
}

export interface productFormInterface {
  name: string;
  categories: CategoriesInterface | null;
  slug: string;
  condition: string | null;
  quantity: number;
  price: number;
  description: string;
  addressId: string | null;
  image: {
    publicId: string;
    path: string;
  } | null;
  details?: { [key: string]: string };
}
