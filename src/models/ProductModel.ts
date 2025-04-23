export interface ProductModel {
    _id: string; // MongoDB sử dụng ObjectId dạng string
    name: string;
    sellerId: string;
    categories: {
        id: number;
        name: string;
        slug: string;
        parentId?: string | null;
    };
    slug: string;
    condition: string;
    quantity: number;
    price: number;
    description: string;
    details: Record<string, any>; // Mixed type
    sold: Boolean;
    // address: {
    //     userId: string;
    //     nameAddress: string;
    //     phoneAddress: string;
    //     province: string;
    //     provinceId: string;
    //     district: string;
    //     districtId: string;
    //     ward: string;
    //     wardId: string;
    //     address: string;
    //     default: boolean;
    //     createdAt: string; // ISO Date string
    //     updatedAt: string; // ISO Date string
    //   };
    addressInfo: Record<string, any>; // Mixed type 
    sellerInfo: sellerInfo; // Mixed type
    image: {
        publicId: number;
        path: string;
    };
    discount?: number;
    size?: string;
    isFreeShip: boolean;
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
    ratingStar: RatingStar;
}

export interface RatingStar {
    count: number;
    average: number;
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

export interface sellerInfo {
    userId: string;
    name: string;
    gender: string;
    birthday: string;
    introduce: string;
    avatar: {
        publicId: string;
        path: string;
    }
}

export default products;