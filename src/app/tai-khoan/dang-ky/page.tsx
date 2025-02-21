"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../layout.css";
import "./register.css";
import Link from "next/link";
import validationEmail from "@/helpers/validation/email";
import validationPhone from "@/helpers/validation/phone";
import validationPassword from "@/helpers/validation/password";
import validationConfirmPassword from "@/helpers/validation/confirmPassword";
import { EmailTestInterface } from "@/interfaces/emailTest";
import { PhoneInterface } from "@/interfaces/phoneTest";
import { PasswordInterface } from "@/interfaces/passwordTest";
import axiosInstance from "@/helpers/api/config";
import { newUserEmail, newUserPhone } from "@/interfaces/user";
import OtpInput from "@/components/otpInput/OtpInput";

import Countdown from "@/components/countdown/Countdown";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [phoneMode, setPhoneMode] = useState<boolean>(false);

  const [passwordMode, setPasswordMode] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailCheckIcon, setEmailCheckIcon] = useState<boolean>(false);

  const [phoneValue, setPhoneValue] = useState<string>("");
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState<string>("");
  const [phoneIconCheck, setPhoneIconCheck] = useState<boolean>(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");

  const [passwordValue, setPasswordValue] = useState<string>("");
  const [passwordCheckIcon, setPasswordCheckIcon] = useState<boolean>(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");

  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

  const [displayPassword, setDisplayPassword] = useState<boolean>(false);
  const [displayConfirmPassword, setDisplayConfirmPassword] =
    useState<boolean>(false);

  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState<string>("");
  const [confirmPasswordCheckIcon, setConfirmPasswordCheckIcon] =
    useState<boolean>(false);

  const [clausCheck, setClausCheck] = useState<boolean>(false);
  const [clausCheckError, setClausCheckError] = useState<boolean>(false);

  const [emailValue, setEmailValue] = useState<string>("");
  const [otpMode, setOptMode] = useState<boolean>(false);
  const [otpCheck, setOtpCheck] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string[]>(new Array(6).fill(""));
  const [otpError, setOtpError] = useState<boolean>(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState<string>("");

  const handleValidationEmail = (value: string): void => {
    const vEmail: EmailTestInterface = validationEmail(value);
    setEmailError(!vEmail.pass);
    setEmailErrorMessage(vEmail.content);
    if (vEmail.pass) {
      setEmailCheckIcon(true);
    } else {
      setEmailCheckIcon(false);
    }
  };

  const handleValidationPhone = (value: string): void => {
    const vPhone: PhoneInterface = validationPhone(value);
    setPhoneError(!vPhone.pass);
    setPhoneErrorMessage(vPhone.content);

    if (vPhone.pass) {
      setPhoneIconCheck(true);
    } else {
      setPhoneIconCheck(false);
    }
  };

  const handleValidationPassword = (value: string): void => {
    const vPassword: PasswordInterface = validationPassword(value);

    setPasswordError(!vPassword.pass);
    setPasswordErrorMessage(vPassword.content);

    if (vPassword.pass) {
      setPasswordCheckIcon(true);
    } else {
      setPasswordCheckIcon(false);
    }
  };

  const handleValidationConfirmPasswordValue = (value: string): void => {
    const vConfirmPassword = validationConfirmPassword(passwordValue, value);
    setConfirmPasswordError(!vConfirmPassword.pass);
    setConfirmPasswordErrorMessage(vConfirmPassword.content);

    if (vConfirmPassword.pass) {
      setConfirmPasswordCheckIcon(true);
    } else {
      setConfirmPasswordCheckIcon(false);
    }
  };

  const handleChangeContent = async (): Promise<void> => {
    if (phoneMode) {
      const vPhone = validationPhone(phoneValue);
      setPhoneError(!vPhone.pass);
      setPhoneErrorMessage(vPhone.content);

      if (vPhone.pass) {
        setPhoneIconCheck(true);
      } else {
        setPhoneIconCheck(false);
      }

      if (vPhone.pass && clausCheck) {
        try {
          const res = await axiosInstance.post("/auth/register/find/phone", {
            phone: phoneValue,
          });
          setPhoneError(true);
          setPhoneErrorMessage(res.data.message);
        } catch (error) {
          console.log(error);

          setClausCheckError(false);
          setPasswordMode(true);
        }
      }
    } else {
      const vEmail = validationEmail(emailValue);
      setEmailError(!vEmail.pass);
      setEmailErrorMessage(vEmail.content);

      if (vEmail.pass) {
        setEmailCheckIcon(true);
      } else {
        setEmailCheckIcon(false);
      }

      if (vEmail.pass && clausCheck) {
        try {
          const res = await axiosInstance.post("/auth/register/find/email", {
            email: emailValue,
          });
          setEmailError(true);
          setEmailErrorMessage(res.data.message);
        } catch (error) {
          console.log(error);
          setClausCheckError(false);
          setPasswordMode(true);
        }
      }
    }

    if (!clausCheck) {
      setClausCheckError(true);
    } else {
      setClausCheckError(false);
    }
  };

  const handleRegister = async (): Promise<void> => {
    handleValidationPassword(passwordValue);

    if (phoneMode) {
      if (!phoneError && !passwordError && !confirmPasswordError) {
        const newUser: newUserPhone = {
          phone: phoneValue,
          password: passwordValue,
        };
        try {
          const res = await axiosInstance.post("/auth/register/phone", newUser);
          console.log(res.data);

          // alert("đăng ký thành công");
          // setTimeout(() => {
          //   router.push("/tai-khoan/dang-nhap");
          // }, 3000);
          setOptMode(true);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      if (!emailError && !passwordError && !confirmPasswordError) {
        const newUser: newUserEmail = {
          email: emailValue,
          password: passwordValue,
        };
        try {
          const res = await axiosInstance.post("/auth/register/email", newUser);
          console.log(res.data);

          // alert("đăng ký thành công");
          // setTimeout(() => {
          //   router.push("/tai-khoan/dang-nhap");
          // }, 3000);
          setOptMode(true);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleVerifyOtp = async (): Promise<void> => {
    console.log(otpValue);

    let otpLength: number = 0;

    while (otpLength <= 6) {
      if (otpValue[otpLength] === "") {
        setOtpErrorMessage("Hãy nhập đầy đủ mã OTP");
        return;
      } else {
        otpLength++;
        console.log("hiii");
      }
      console.log(otpValue[otpLength]);
    }

    await axiosInstance
      .post(`/auth/verify-otp`, {
        email: emailValue,
        otp: otpValue.join(""),
      })
      .then((res) => {
        console.log(res.data);

        setOtpValue(new Array(6).fill(""));
        setOtpErrorMessage("");
        setOptMode(false);
        setPasswordMode(false);
        alert("xac thuc thanh cong");
        window.localStorage.removeItem("countdown");
      })
      .catch((error) => {
        console.log(error);
        setOtpErrorMessage(error.response.data.message);
      });
    // try {
    //   if (res.status === 200 || res.status === 201) {
    //     // localStorage.setItem("userToken", res.data.user.token);
    //     console.log(res.data);
    //     alert("xac thuc thanh cong");
    //   }
    // } catch (error) {
    //   // setOtpErrorMessage(error.message);
    //   console.log(error);
    //   if (axios.isAxiosError(error)) {
    //     console.error(
    //       "📢 Lỗi từ server:",
    //       error.response?.data?.message || "Lỗi không xác định"
    //     );
    //   }
    // }
  };

  const handleSendBack = async (): Promise<void> => {
    setOtpValue(new Array(6).fill(""));
    setOtpErrorMessage("");
    handleValidationPassword(passwordValue);

    if (phoneMode) {
      if (!phoneError && !passwordError && !confirmPasswordError) {
        const newUser: newUserPhone = {
          phone: phoneValue,
          password: passwordValue,
        };
        try {
          const res = await axiosInstance.post("/auth/register/phone", newUser);
          console.log(res.data);

          // alert("đăng ký thành công");
          // setTimeout(() => {
          //   router.push("/tai-khoan/dang-nhap");
          // }, 3000);
          alert("Đã gửi lại mã");

          window.localStorage.setItem("restart", "ok");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      if (!emailError && !passwordError && !confirmPasswordError) {
        const newUser: newUserEmail = {
          email: emailValue,
          password: passwordValue,
        };
        try {
          const res = await axiosInstance.post("/auth/register/email", newUser);
          console.log(res.data);

          // alert("đăng ký thành công");
          // setTimeout(() => {
          //   router.push("/tai-khoan/dang-nhap");
          // }, 3000);
          alert("Đã gửi lại mã");
          window.localStorage.setItem("restart", "ok");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="register">
      <div className="grid wide">
        <div className="row no-gutters">
          <div className="c-8 register__image">
            <Image
              src="/assets/account/banner_login.png"
              width={587}
              height={475}
              alt="Picture of the author"
            />
          </div>
          <div className="c-4 account__container">
            <form className="account__form">
              {passwordMode ? (
                <>
                  {otpMode ? (
                    <>
                      <div className="account__head">Xác thực tài khoản</div>
                      <Countdown time={5 * 60} />

                      <OtpInput otp={otpValue} setOtp={setOtpValue} />
                      <div className="account__error--message">
                        {otpErrorMessage}
                      </div>
                      <i
                        className="account__back--icon fa-solid fa-arrow-left"
                        onClick={() => setOptMode(false)}
                      ></i>
                      <button
                        className="transparent-btn register__btn "
                        onClick={(e) => {
                          e.preventDefault();
                          handleVerifyOtp();
                        }}
                      >
                        Xác thực
                      </button>

                      <button
                        className="main-btn register__replay--btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setOtpValue([]);
                          setOtpErrorMessage("");

                          handleSendBack();
                        }}
                      >
                        Gửi lại mã
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="account__head">Đặt mật khẩu</div>
                      <div
                        className={
                          passwordError
                            ? "account__input--block account__error"
                            : "account__input--block"
                        }
                      >
                        <input
                          value={passwordValue}
                          type={displayPassword ? "text" : "password"}
                          className={
                            passwordError
                              ? "account__input account__error--input"
                              : "account__input"
                          }
                          placeholder="Nhập mật khẩu của bạn"
                          onChange={(e) => setPasswordValue(e.target.value)}
                          onFocus={() => {
                            setPasswordError(false);
                            setPasswordErrorMessage("");
                          }}
                          onBlur={() => {
                            if (validationPassword(passwordValue).pass) {
                              setPasswordCheckIcon(true);
                            } else {
                              setPasswordCheckIcon(false);
                            }
                          }}
                        />
                        <div
                          className="account__password--icon"
                          onClick={() => {
                            setDisplayPassword(!displayPassword);
                            setPasswordError(false);
                            setPasswordErrorMessage("");
                          }}
                        >
                          {passwordCheckIcon && (
                            <i className="account__icon--check fa-solid fa-check"></i>
                          )}

                          {!displayPassword ? (
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

                      <div
                        className={
                          confirmPasswordError
                            ? "account__input--block account__error"
                            : "account__input--block"
                        }
                      >
                        <input
                          type={displayConfirmPassword ? "text" : "password"}
                          className={
                            confirmPasswordError
                              ? "account__input account__error--input"
                              : "account__input"
                          }
                          placeholder="Nhập lại mật khẩu của bạn"
                          value={confirmPasswordValue}
                          onChange={(e) => {
                            setConfirmPasswordValue(e.target.value);
                            handleValidationConfirmPasswordValue(
                              e.target.value
                            );
                          }}
                        />
                        <div
                          className="account__password--icon"
                          onClick={() =>
                            setDisplayConfirmPassword(!displayConfirmPassword)
                          }
                        >
                          {confirmPasswordCheckIcon && (
                            <i className="account__icon--check fa-solid fa-check"></i>
                          )}

                          {!displayConfirmPassword ? (
                            <i
                              className={
                                confirmPasswordError
                                  ? "fa-regular fa-eye-slash account__error--icon"
                                  : "fa-regular fa-eye-slash"
                              }
                            ></i>
                          ) : (
                            <i
                              className={
                                confirmPasswordError
                                  ? "fa-regular fa-eye account__error--icon"
                                  : "fa-regular fa-eye"
                              }
                            ></i>
                          )}
                        </div>
                      </div>

                      <div className="account__error--message">
                        {confirmPasswordErrorMessage}
                      </div>

                      <i
                        className="account__back--icon fa-solid fa-arrow-left"
                        onClick={() => setPasswordMode(false)}
                      ></i>
                      <button
                        className="transparent-btn register__btn "
                        onClick={(e) => {
                          e.preventDefault();
                          handleRegister();
                        }}
                      >
                        Hoàn thành
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="account__head">Đăng ký</div>
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
                        {phoneIconCheck && (
                          <i className="account__icon--check fa-solid fa-check"></i>
                        )}
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
                        {emailCheckIcon && (
                          <i className="account__icon--check fa-solid fa-check"></i>
                        )}
                      </div>

                      <div className="account__error--message">
                        {emailErrorMessage}
                      </div>
                    </>
                  )}

                  <div className="register__clause">
                    <input
                      type="checkbox"
                      name=""
                      id="register__clause--check"
                      checked={clausCheck}
                      onChange={() => {
                        setClausCheck(!clausCheck);
                        if (!emailError) {
                          setEmailCheckIcon(true);
                        } else {
                          setEmailCheckIcon(false);
                        }
                      }}
                    />
                    <label htmlFor="register__clause--check">
                      Tôi đồng ý với{" "}
                      <span className="register__clause--link">
                        điều khoản & điều kiện
                      </span>{" "}
                      của ...
                    </label>
                  </div>

                  {clausCheckError && (
                    <div className="account__error--message">
                      Bạn cần đọc và đồng ý với điều khoản & điều kiện và hợp
                      đồng của ...
                    </div>
                  )}
                  <button
                    className="main-btn account__form--btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleChangeContent();
                    }}
                  >
                    Đăng ký
                  </button>
                </>
              )}
            </form>

            {!passwordMode && <div className="account__boundary">Hoặc</div>}

            {!passwordMode && (
              <>
                {!phoneMode ? (
                  <button
                    className="transparent-btn account__change--btn"
                    onClick={() => setPhoneMode(true)}
                  >
                    <i className=" fa-solid fa-square-phone account__change--phone"></i>
                    <span>Đăng ký với số điện thoại</span>
                  </button>
                ) : (
                  <button
                    className="transparent-btn account__change--btn"
                    onClick={() => setPhoneMode(false)}
                  >
                    <i className="account__change--email fa-solid fa-envelope"></i>
                    <span>Đăng ký với Email</span>
                  </button>
                )}
              </>
            )}

            {!passwordMode && (
              <div className="register__login">
                Bạn đã có sẵn tài khoản?{" "}
                <Link
                  href={"/tai-khoan/dang-nhap"}
                  className="register__login--link"
                >
                  &nbsp;Đăng nhập
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
