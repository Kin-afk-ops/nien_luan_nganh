export interface CategoriesInterface {
  _id:string;
  id: string;
  name: string;
  slug: string;
  parentId?: number | null;
}
