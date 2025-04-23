import axiosInstance from "@/helpers/api/config";
import { CartFormInterface } from "@/interfaces/cart";

export const addToCart = (buyerId: string, cart: CartFormInterface) => {
  try {
    console.log(buyerId);
    axiosInstance
      .post(`/cart/${buyerId}`, cart)
      .then((res) => console.log(res.data));
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};
