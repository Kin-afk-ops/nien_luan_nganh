"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../layout.css";
import "./login.css";
import Link from "next/link";
import { auth, facebookProvider, googleProvider } from "../../../../firebase";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import { EmailTestInterface } from "@/interfaces/emailTest";
import validationEmail from "@/helpers/validation/email";
import { PhoneInterface } from "@/interfaces/phoneTest";
import validationPhone from "@/helpers/validation/phone";
import validationPassword from "@/helpers/validation/password";
import { PasswordInterface } from "@/interfaces/passwordTest";
import { newUserPhone } from "@/interfaces/user";
import axiosInstance from "@/helpers/api/config";

import { login } from "@/lib/apiCall";
import { LoginUser, LoginUserGoogle } from "@/interfaces/loginUser";
import { useAppDispatch } from "@/lib/store";
import googleLogo from "../../../../public/assets/google_logo.png";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "@/lib/features/user/userSlice";
import { UserState } from "@/interfaces/userState";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [noAccount, setNoAccount] = useState<boolean>(false);
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [phoneMode, setPhoneMode] = useState<boolean>(false);
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");

  const [passwordValue, setPasswordValue] = useState<string>("");

  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");

  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState<string>("");

  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

  const [displayPassword, setDisplayPassword] = useState<boolean>(false);
  const [checkGoogleUser, setCheckGoogleUser] = useState<boolean>(false);

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );

    setRecaptchaVerifier(recaptchaVerifier);
    return () => {
      recaptchaVerifier.clear();
    };
  }, [auth]);

  const handleGoogleLogin = async (): Promise<void> => {
    dispatch(loginStart());

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User Info:", user);

      // Lấy Access Token từ Firebase
      // const idToken = await user.getIdToken();

      // console.log("Access Token:", idToken);

      // const res = await axiosInstance.post("/auth/firebase-login", {
      //   token: idToken,
      // });

      // console.log("Server Response:", res.data);

      await axiosInstance
        .post("/auth/register/find/email", {
          email: user?.email,
        })
        .then((res) => {
          alert(res.data.message);
          setCheckGoogleUser(res.data.check);
        })
        .catch(async (error) => {
          console.log(error);

          const userLogin: {
            _id: string;
            accessToken: string;
            email: string;
            phone: string;
          } = {
            _id: user.uid,
            accessToken: await user.getIdToken(),
            email: user?.email ? user?.email : "Lỗi dữ liệu",
            phone: "none",
          };

          dispatch(loginSuccess(userLogin));

          alert("Đăng nhập Google thành công!");
        });
    } catch (error) {
      console.error("Google Login Error:", error);
      dispatch(loginFailure());
    }
  };

  const handleValidationEmail = (value: string): void => {
    const vEmail: EmailTestInterface = validationEmail(value);
    setEmailError(!vEmail.pass);
    setEmailErrorMessage(vEmail.content);
  };

  const handleValidationPhone = (value: string): void => {
    const vPhone: PhoneInterface = validationPhone(value);
    setPhoneError(!vPhone.pass);
    setPhoneErrorMessage(vPhone.content);
  };

  const handleValidationPassword = (value: string): void => {
    const vPassword: PasswordInterface = validationPassword(value);

    setPasswordError(!vPassword.pass);
    setPasswordErrorMessage(vPassword.content);
  };

  const handleLogin = async (): Promise<void> => {
    if (!emailError && !passwordError) {
      const loginUser: LoginUser = {
        phone: phoneValue,
        password: passwordValue,
        email: emailValue,
      };
      login(dispatch, loginUser, setNoAccount, phoneMode);
    }

    if (!phoneError && !passwordError) {
      const loginUser: LoginUser = {
        phone: phoneValue,
        password: passwordValue,
        email: emailValue,
      };
      login(dispatch, loginUser, setNoAccount, phoneMode);
    }
  };

  // const handleFaceBookLogin = async (): Promise<void> => {};

  return (
    <div className="register">
      <div className="grid wide">
        <div className="row no-gutters">
          <div className="l-8 m-0 s-0 register__image">
            <Image
              src="/assets/account/banner_login.png"
              width={587}
              height={475}
              alt="Picture of the author"
            />
          </div>
          <div className="l-4 m-8 s-12 account__container">
            <form className="account__form">
              <div className="account__head">Đăng nhập</div>

              {phoneMode ? (
                <>
                  <div
                    className={
                      phoneError
                        ? "account__phone account__error"
                        : "account__phone"
                    }
                  >
                    <div className="account__phone--prefix">
                      <Image
                        src="/assets/quoc_ky_VN.png"
                        className="account__phone--img"
                        width={18}
                        height={13}
                        alt="Quoc ky Viet Nam"
                      ></Image>
                      +84
                    </div>
                    <input
                      className={phoneError ? "account__error--input" : ""}
                      type="text"
                      value={phoneValue}
                      onChange={(e) => setPhoneValue(e.target.value)}
                      onBlur={(e) => handleValidationPhone(e.target.value)}
                      onFocus={() => {
                        setPhoneError(false);
                        setPhoneErrorMessage("");
                      }}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className="account__error--message">
                    {phoneErrorMessage}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={
                      emailError
                        ? "account__input--block account__error"
                        : "account__input--block"
                    }
                  >
                    <input
                      className={
                        emailError
                          ? "account__input account__error--input"
                          : "account__input "
                      }
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      onBlur={(e) => handleValidationEmail(e.target.value)}
                      onFocus={() => {
                        setEmailError(false);
                        setEmailErrorMessage("");
                      }}
                      type="text"
                      placeholder="Nhập email của bạn"
                    />
                  </div>
                  <div className="account__error--message">
                    {emailErrorMessage}
                  </div>
                </>
              )}
              <div
                className={
                  passwordError
                    ? "account__input--block account__error"
                    : "account__input--block"
                }
              >
                <input
                  className={
                    passwordError
                      ? "account__input account__error--input"
                      : "account__input"
                  }
                  type={displayPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu của bạn"
                  value={passwordValue}
                  onChange={(e) => {
                    setPasswordValue(e.target.value);
                    handleValidationPassword(e.target.value);
                  }}
                  onFocus={() => {
                    setPasswordError(false);
                    setPasswordErrorMessage("");
                  }}
                />
                <div
                  className="account__password--icon"
                  onClick={() => setDisplayPassword(!displayPassword)}
                >
                  {displayPassword ? (
                    <i
                      className={
                        passwordError
                          ? "fa-regular fa-eye-slash account__error--icon"
                          : "fa-regular fa-eye-slash"
                      }
                    ></i>
                  ) : (
                    <i
                      className={
                        passwordError
                          ? "fa-regular fa-eye account__error--icon"
                          : "fa-regular fa-eye"
                      }
                    ></i>
                  )}
                </div>
              </div>

              <div className="account__error--message">
                {passwordErrorMessage}
              </div>

              <div className="account__forgot--password">
                <Link className="link " href={"/"}>
                  Quên mật khẩu?
                </Link>
              </div>

              <button
                className="account__form--btn main-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                Đăng nhập
              </button>
            </form>

            <div className="account__boundary">Hoặc</div>

            {!phoneMode ? (
              <button
                className="transparent-btn account__change--btn"
                onClick={() => setPhoneMode(true)}
              >
                <i className=" fa-solid fa-square-phone account__change--phone"></i>
                <span>Đăng nhập với số điện thoại</span>
              </button>
            ) : (
              <button
                className="transparent-btn account__change--btn"
                onClick={() => setPhoneMode(false)}
              >
                <i className="account__change--email fa-solid fa-envelope"></i>
                <span>Đăng nhập với Email</span>
              </button>
            )}

            <button
              className="transparent-btn account__change--btn"
              onClick={() => handleGoogleLogin()}
            >
              <div className="account__change--img">
                <Image
                  src={googleLogo}
                  alt="google logo"
                  width={18}
                  height={18}
                />
              </div>
              <span>Đăng nhập với Google</span>
            </button>

            {/* <button
              className="transparent-btn account__change--btn"
              onClick={() => handleFaceBookLogin(false)}
            >
              <i className="account__change--facebook fa-brands fa-facebook"></i>
              <span>Đăng nhập với Facebook</span>
            </button> */}

            <div className="register__login">
              Bạn chưa có tài khoản?{" "}
              <Link
                href={"/tai-khoan/dang-ky"}
                className="register__login--link"
              >
                &nbsp;Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default LoginPage;
