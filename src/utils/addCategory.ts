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

export const updateCategory = (updatedCategory: categoryModel) => {
    const response = axiosInstance.put(`/category/updateCate/${updatedCategory.id}`, updatedCategory);
    return response.then(res => res.data);
}

export const updateCategoryAttr = (updatedCategoryAttr: CategoryAttribute) => {
    const response = axiosInstance.put(`/category/updateAttr/${updatedCategoryAttr.attributeId}`, updatedCategoryAttr);
    return response.then(res => res.data);
}

export const getAttributeByCateId = (cateId: number) => {
    const response = axiosInstance.get(`/category/getAttrByCateId/${cateId}`);
    return response.then(res => res.data);
}


export const getLabelNamePairsByCateId = async (cateId: number): Promise<{ label: string; name: string }[]> => {
    try {
        console.log(cateId);
        const data: CategoryAttribute = await getAttributeByCateId(cateId);
        return data.listDataTypes.reduce((acc, { label, name }) => {
            acc.push({ label, name });
            return acc;
        }, [] as { label: string; name: string }[]);
    } catch (error) {
        console.error("Error fetching category attributes:", error);
        return [];
    }
};