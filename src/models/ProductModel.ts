export interface ProductModel {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    quantityStock: number;
    createdAt: Date;
    updatedAt: Date;
    imageUri: string;
    location: string;
    slug: string;
    categorySlug: string;
}

export interface ProductCardModel {
    id: number;
    name: string;
    image: string;
    price: number;
    location: string;
}

const products: ProductModel[] = [
   
];

export default products;