"use client";
import { useEffect, useState } from "react";
import style from "./adminLogin.module.css";
import { validationEmpty } from "@/helpers/validation/address";
import { login } from "@/lib/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { LoginUser } from "@/interfaces/loginUser";
import { RootState } from "@/hooks/useAppDispatch";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isError = useSelector((state: RootState) => state.user.isError);
  const [noAccount, setNoAccount] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isErrorUser, setIsErrorUser] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<boolean>(false);

  //   useEffect(()=>{
  //     const getError = async ():Promise<void>=>{
  //         const isError = useSelector((state: RootState) => state.user.isError);
  //         setIsErrorUser(isError)
  //     }

  //     getError()
  //   },[loadingError])

  const validationUsername = (): boolean => {
    if (!validationEmpty(username)) {
      setUsernameError("Hãy nhập tên tài khoản");
      return false;
    } else {
      return true;
    }
  };

  const validationPassword = (): boolean => {
    if (!validationEmpty(password)) {
      setPasswordError("Hãy nhập mật khẩu");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (): Promise<void> => {
    validationUsername();
    validationPassword();

    if (validationUsername() && validationPassword()) {
      const loginUser: LoginUser = {
        phone: username,
        password: password,
        email: "none",
      };

      await login(dispatch, loginUser, setNoAccount, true);
      if (isError) {
        alert("Đăng nhập sai tài khoản hoặc mật khẩu");
      }
    }
  };
  return (
    <div className={style.adminLogin}>
      <div className={style.adminLoginContainer}>
        <h4 className={style.adminLoginTitle}>ĐĂNG NHẬP</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className={style.adminLoginForm}
        >
          <div className={style.adminLoginBlock}>
            <div className={style.adminLoginLabel}>Tên tài khoản</div>
            <div className={style.adminLoginBlockContent}>
              <input
                type="text"
                className={style.adminLoginInput}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setUsernameError("")}
              />

              <p className={style.adminLoginError}>{usernameError}</p>
            </div>
          </div>

          <div className={style.adminLoginBlock}>
            <div className={style.adminLoginLabel}>Mật khẩu</div>

            <div className={style.adminLoginBlockContent}>
              <input
                type="password"
                className={style.adminLoginInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordError("")}
              />

              <p className={style.adminLoginError}>{passwordError}</p>
            </div>
          </div>

          <div className={style.adminLoginSubmit}>
            <button className={style.adminLoginSubmitButton} type="submit">
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
