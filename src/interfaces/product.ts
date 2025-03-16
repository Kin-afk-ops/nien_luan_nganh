export interface ICategory {
  name?: string;
  slug?: string;
  parentId?: string | null;
}

export interface ProductInterface {
  name: string;
  sellerId: string;
  categories?: ICategory;
  slug: string;
  condition: string;
  quantity: number;
  price: number;
  description: string;
  details?: Record<string, any>;
  addressId: string; // Sử dụng string cho ObjectId khi gửi dữ liệu
  discount?: number;
  createdAt?: string; // Định dạng ISO date khi gửi qua API
  updatedAt?: string;
}
