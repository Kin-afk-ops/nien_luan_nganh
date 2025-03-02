import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "./features/user/userSlice";

import axiosInstance from "../helpers/api/config";
import { LoginUser } from "@/interfaces/loginUser";
import { AppDispatch } from "./store";

// Khai báo các loại (types) cho tham số

// Hàm login

export const login = async (
  dispatch: AppDispatch,
  user: LoginUser,
  setNoAccount: (value: boolean) => void,
  phoneMode: boolean
): Promise<void> => {
  dispatch(loginStart());

  if (phoneMode) {
    try {
      const res = await axiosInstance.post("/auth/login/phone", user);
      dispatch(loginSuccess(res.data));
      setNoAccount(false);
      alert("!đăng nhập thành công");
    } catch (err) {
      console.log(err);

      dispatch(loginFailure());
      setNoAccount(true);
    }
  } else {
    try {
      const res = await axiosInstance.post("/auth/login/email", user);
      dispatch(loginSuccess(res.data));
      setNoAccount(false);
      alert("!đăng nhập thành công");
    } catch (err) {
      console.log(err);

      dispatch(loginFailure());
      setNoAccount(true);
    }
  }
};
