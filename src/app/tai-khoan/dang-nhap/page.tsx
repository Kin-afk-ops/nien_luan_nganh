"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { auth, googleProvider } from "../../../../firebase";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPopup,
} from "firebase/auth";

import googleLogo from "../../../../public/assets/google_logo.png";

import { EmailTestInterface } from "@/interfaces/emailTest";
import { PhoneInterface } from "@/interfaces/phoneTest";
import { PasswordInterface } from "@/interfaces/passwordTest";

import validationEmail from "@/helpers/validation/email";
import validationPhone from "@/helpers/validation/phone";
import validationPassword from "@/helpers/validation/password";

import axiosInstance from "@/helpers/api/config";
import { login } from "@/lib/apiCall";
import { LoginUser } from "@/interfaces/loginUser";
import { useAppDispatch } from "@/lib/store";

import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "@/lib/features/user/userSlice";

import "../layout.css";
import "./login.css";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [noAccount, setNoAccount] = useState(false);
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const [phoneMode, setPhoneMode] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [displayPassword, setDisplayPassword] = useState(false);

  useEffect(() => {
    const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });
    setRecaptchaVerifier(verifier);

    return () => verifier.clear();
  }, []);

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
        .post(`/auth/register/find/email`, {
          firebaseMode: true,
          email: user?.email,
        })
        .then((res) => {
          alert(res.data.message);
          // setCheckGoogleUser(res.data.check);
        })
        .catch(async (error) => {
          console.log(error);

          let googlePhoneValue: string = "none";

          await axiosInstance
            .get(`/auth/firebase/phone/${user.uid}`)
            .then((res) => {
              googlePhoneValue = res.data.phone;
              console.log(googlePhoneValue);
            })
            .catch((error) => console.log(error));

          const userLogin: {
            _id: string;
            accessToken: string;
            email: string;
            phone: string;
            firebase: boolean;
          } = {
            _id: user.uid,
            accessToken: await user.getIdToken(),
            email: user?.email ? user?.email : "Lỗi dữ liệu",
            phone: googlePhoneValue,
            firebase: true,
          };

          dispatch(loginSuccess(userLogin));

          alert("Đăng nhập Google thành công!");
          window.location.replace(`/`);
        });
    } catch (error) {
      console.error("Google Login Error:", error);
      dispatch(loginFailure());
    }
  };

  const handleValidationEmail = (value: string) => {
    const v: EmailTestInterface = validationEmail(value);
    setEmailError(!v.pass);
    setEmailErrorMessage(v.content);
  };

  const handleValidationPhone = (value: string) => {
    const v: PhoneInterface = validationPhone(value);
    setPhoneError(!v.pass);
    setPhoneErrorMessage(v.content);
  };

  const handleValidationPassword = (value: string) => {
    const v: PasswordInterface = validationPassword(value);
    setPasswordError(!v.pass);
    setPasswordErrorMessage(v.content);
  };

  const handleLogin = async () => {
    const validEmail = !emailError && !phoneMode;
    const validPhone = !phoneError && phoneMode;
    const validPassword = !passwordError;

    if ((validEmail || validPhone) && validPassword) {
      const loginUser: LoginUser = {
        phone: phoneValue,
        password: passwordValue,
        email: emailValue,
      };

      await login(dispatch, loginUser, setNoAccount, phoneMode);
      router.replace("/");
    }
  };

  return (
    <div className="register">
      <div className="grid wide">
        <div className="row no-gutters">
          <div className="l-8 m-0 s-0 register__image">
            <Image
              src="/assets/account/banner_login.png"
              width={587}
              height={475}
              alt="Login Banner"
            />
          </div>

          <div className="l-4 m-8 s-12 account__container">
            <form
              className="account__form"
              onSubmit={(e) => e.preventDefault()}
            >
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
                        alt="VN flag"
                      />
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
                          : "account__input"
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
                  <i
                    className={`fa-regular ${
                      displayPassword ? "fa-eye-slash" : "fa-eye"
                    } ${passwordError ? "account__error--icon" : ""}`}
                  ></i>
                </div>
              </div>

              <div className="account__error--message">
                {passwordErrorMessage}
              </div>

              <div className="account__forgot--password">
                <Link className="link" href={"/"}>
                  Quên mật khẩu?
                </Link>
              </div>

              <button
                className="account__form--btn main-btn"
                onClick={handleLogin}
              >
                Đăng nhập
              </button>
            </form>

            <div className="account__boundary">Hoặc</div>

            <button
              className="transparent-btn account__change--btn"
              onClick={() => setPhoneMode(!phoneMode)}
            >
              <i
                className={`fa-solid ${
                  phoneMode ? "fa-envelope" : "fa-square-phone"
                }`}
              ></i>
              <span>Đăng nhập với {phoneMode ? "Email" : "số điện thoại"}</span>
            </button>

            <button
              className="transparent-btn account__change--btn"
              onClick={handleGoogleLogin}
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

            <div className="register__login">
              Bạn chưa có tài khoản?
              <Link href="/tai-khoan/dang-ky" className="register__login--link">
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
