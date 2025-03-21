import axiosInstance from "@/helpers/api/config";
import { postComment } from "@/interfaces/comment";

export const createComment = async (productId: string, userId: string, comment: postComment) => {
    try {
       const response =  await axiosInstance.post(`/commentProduct/${productId}/${userId}`, comment);
        return response.data;
        
    }catch(error) {
        console.error(error);
        throw new Error("Failed to create comment");    
    }
}

export const getComments = async (productId: string) => {
    try {
        const response = await axiosInstance.get(`/commentProduct/${productId}`);
        return response.data;
        
    } catch(error) {
        console.error(error);
        throw new Error("Failed to get comments");
    }
}

export const likeComment = async (commentId: string, userId: string) => {
    try {
        const response = await axiosInstance.post(`/commentProduct/${commentId}/${userId}/like`);
        return response.data;
        
    } catch(error) {
        console.error(error);
        throw new Error("Failed to like comment");
    }
}

export const unlikeComment = async (commentId: string, userId: string) => {
    try {
        const response = await axiosInstance.post(`/commentProduct/${commentId}/${userId}/unlike`);
        return response.data;
        
    } catch(error) {
        console.error(error);
        throw new Error("Failed to unlike comment");
    }
}