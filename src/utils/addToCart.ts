import axiosInstance from "@/helpers/api/config";
import { Cart } from "@/interfaces/cart";

export const addToCart = (buyerId: string, cart: Cart) => {
    try {
        console.log(buyerId);
        axiosInstance.post(`/cart/${buyerId}`, cart)
        .then(res => console.log(res));
    }catch(error) {
        console.error("Error adding product to cart:", error);
    }
}