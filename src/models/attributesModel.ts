interface Option {
    id: number;
    value: string;
  }
  
  interface Attribute {
    id: number;
    label: string;
    name: string;
    options: Option[];
  }
  
  export interface CategoryAttribute {
    attributeId: number;
    label: string;
    listDataType: Attribute[];
  }

