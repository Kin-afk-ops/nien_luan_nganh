import axios from "axios";

let token: string | undefined;

if (typeof window !== "undefined") {
  const storedToken = window.localStorage.getItem("token");
  if (storedToken) {
    token = `Bearer ${storedToken}`;
  }
}

const axiosInstance = axios.create({
  // baseURL: "https://next-shop-backend-delta.vercel.app/api",

  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    token: token || "",
  },
});

// export const axiosClient = axios.create({
//   baseURL: "http://localhost:3000/api",
//   withCredentials: true,
//   credentials: "include",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export default axiosInstance;
