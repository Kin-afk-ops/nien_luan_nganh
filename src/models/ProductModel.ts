export interface ProductModel {
    id: number;
    name: string;
    sellerId: number;
    description: string;
    price: number;
    discount: number;
    shippingFee: string;
    size: string;
    categoryId: number;
    quantityStock: number;
    createdAt: Date;
    updatedAt: Date;
    imageUris: string[];
    location: string;
    status: string;
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