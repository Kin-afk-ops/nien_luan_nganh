import { ProductModel } from "./ProductModel";

export interface FillerProductModel {
    totalProducts: number;
    products: ProductModel[];
    totalPages: number;
    page: number;
}