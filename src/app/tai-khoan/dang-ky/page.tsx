"use client";
import React, { useState } from "react";
import Image from "next/image";
import "../layout.css";
import "./register.css";
import Link from "next/link";
import validationEmail from "@/helpers/validation/email";

const RegisterPage = () => {
  const [phoneMode, setPhoneMode] = useState<boolean>(false);

  const [passwordMode, setPasswordMode] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailCheckIcon, setEmailCheckIcon] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [displayPassword, setDisplayPassword] = useState<boolean>(false);
  const [displayConfirmPassword, setDisplayConfirmPassword] =
    useState<boolean>(false);

  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);

  const [clausCheck, setClausCheck] = useState<boolean>(false);
  const [clausCheckError, setClausCheckError] = useState<boolean>(false);

  const [emailValue, setEmailValue] = useState<string>("");

  const handleValidationEmail = (value: string): void => {
    const vEmail = validationEmail(value);
    setEmailError(!vEmail.pass);
    setEmailErrorMessage(vEmail.content);
    if (vEmail.pass) {
      setEmailCheckIcon(true);
    } else {
      setEmailCheckIcon(false);
    }
  };

  const handleChangeContent = (): void => {
    const vEmail = validationEmail(emailValue);
    setEmailError(!vEmail.pass);
    setEmailErrorMessage(vEmail.content);
    if (!clausCheck) {
      setClausCheckError(true);
    } else {
      setClausCheckError(false);
    }

    if (vEmail.pass) {
      setEmailCheckIcon(true);
    } else {
      setEmailCheckIcon(false);
    }

    if (vEmail.pass && clausCheck) {
      setClausCheckError(false);
      setPasswordMode(true);
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
                  <div className="account__head">Đặt mật khẩu</div>
                  <div
                    className={
                      passwordError
                        ? "account__input--block account__error"
                        : "account__input--block"
                    }
                  >
                    <input
                      type={displayPassword ? "text" : "password"}
                      className="account__input"
                      placeholder="Nhập mật khẩu của bạn"
                    />
                    <div
                      className="account__password--icon"
                      onClick={() => setDisplayPassword(!displayPassword)}
                    >
                      <i className="account__icon--check fa-solid fa-check"></i>

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

                  <div className="account__error--message"></div>

                  <div
                    className={
                      confirmPasswordError
                        ? "account__input--block account__error"
                        : "account__input--block"
                    }
                  >
                    <input
                      type={displayConfirmPassword ? "text" : "password"}
                      className="account__input"
                      placeholder="Nhập lại mật khẩu của bạn"
                    />
                    <div
                      className="account__password--icon"
                      onClick={() =>
                        setDisplayConfirmPassword(!displayConfirmPassword)
                      }
                    >
                      <i className="account__icon--check fa-solid fa-check"></i>

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

                  <div className="account__error--message"></div>

                  <i
                    className="account__back--icon fa-solid fa-arrow-left"
                    onClick={() => setPasswordMode(false)}
                  ></i>

                  <button className="transparent-btn register__btn ">
                    Hoàn thành
                  </button>
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
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                      <div className="account__error--message"></div>
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
