import axiosInstance from "@/helpers/api/config";
import { CategoryAttribute } from "@/models/attributesModel";
import { categoryModel } from "@/models/CategoryModel";

export const getAllCategories = () => {
    const response =  axiosInstance.get("/category/getallCategories");
    return response.then(res => res.data);
 
}

export const getAllCateAttr = () => {
    const response =  axiosInstance.get("/category/getallCateAttr");
    return response.then(res => res.data);
}

export const createCategory = (newCategory: Partial<categoryModel>) => {
    const response =  axiosInstance.post("/category/addCate",newCategory);
    return response.then(res => res.data);
}

export const createCategoryAttr = (newCateAttr: CategoryAttribute) => {
    const response = axiosInstance.post("/category/addAttr",newCateAttr);
    return response.then(res => res.data);
}