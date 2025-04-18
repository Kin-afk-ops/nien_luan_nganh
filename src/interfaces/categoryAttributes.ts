export interface Option {
    id: number;
    value: string;
    _id: string;
  }
  
 export interface ListDataType {
    id: number;
    label: string;
    name: string;
    options: Option[];
    _id: string;
  }
  
 export interface ProductAttribute {
    _id: string;
    attributeId: number;
    label: string;
    listDataTypes: ListDataType[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  