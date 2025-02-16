"use client";
import React, { useState } from "react";
import Image from "next/image";
import "../layout.css";
import "./login.css";
import Link from "next/link";

const LoginPage = () => {
  const [phoneMode, setPhoneMode] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<boolean>(true);
  const [phoneError, setPhoneError] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<boolean>(true);
  const [displayPassword, setDisplayPassword] = useState<boolean>(false);

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
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div
                    className={
                      passwordError
                        ? "account__input account__password--block account__error"
                        : "account__input account__password--block"
                    }
                  >
                    <input
                      className="account__password"
                      type={displayPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu của bạn"
                    />
                    <div
                      className="account__password--icon"
                      onClick={() => setDisplayPassword(!displayPassword)}
                    >
                      <i className="account__password--icon-check fa-solid fa-check"></i>

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

                  <div className="account__error--message"></div>
                </>
              ) : (
                <>
                  <input
                    className={
                      emailError
                        ? "account__input account__error--input"
                        : "account__input"
                    }
                    type="email"
                    placeholder="Nhập email của bạn"
                  />
                  <div className="account__error--message"></div>

                  <div
                    className={
                      passwordError
                        ? "account__input account__password--block account__error"
                        : "account__input account__password--block"
                    }
                  >
                    <input
                      className="account__password"
                      type={displayPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu của bạn"
                    />
                    <div
                      className="account__password--icon"
                      onClick={() => setDisplayPassword(!displayPassword)}
                    >
                      <i className="account__password--icon-check fa-solid fa-check"></i>

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

                  <div className="account__error--message"></div>
                </>
              )}

              <button className="account__form--btn main-btn">Đăng nhập</button>
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
    </div>
  );
};

export default LoginPage;
