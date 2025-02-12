"use client";
import React, { useState } from "react";
import Image from "next/image";
import "../layout.css";
import "./register.css";
import Link from "next/link";

const RegisterPage = () => {
  const [phoneMode, setPhoneMode] = useState<boolean>(false);

  const [passwordMode, setPasswordMode] = useState<boolean>(false);
  const [displayPassword, setDisplayPassword] = useState<boolean>(false);
  const [displayPasswordIcon, setDisplayPasswordIcon] =
    useState<boolean>(false);
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
                  <div className="account__input account__password--block">
                    <input
                      type="password"
                      className="account__password"
                      placeholder="Nhập mật khẩu của bạn"
                    />
                    <div className="account__password--icon">
                      <i className="fa-regular fa-eye"></i>
                    </div>
                  </div>
                  <input
                    type="password"
                    className="account__input"
                    placeholder="Nhập lại mật khẩu của bạn"
                  />

                  <i className="fa-solid fa-arrow-left"></i>
                </>
              ) : (
                <>
                  <div className="account__head">Đăng ký</div>
                  {phoneMode ? (
                    <div className="account__phone">
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
                      <input type="text" placeholder="Nhập số điện thoại" />
                    </div>
                  ) : (
                    <input
                      className="account__input"
                      type="email"
                      placeholder="Nhập email của bạn"
                    />
                  )}

                  <div className="register__clause">
                    <input
                      type="checkbox"
                      name=""
                      id="register__clause--check"
                    />
                    <label htmlFor="register__clause--check">
                      Tôi đồng ý với{" "}
                      <span className="register__clause--link">
                        điều khoản & điều kiện
                      </span>{" "}
                      của ...
                    </label>
                  </div>
                  <button
                    className="main-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setPasswordMode(true);
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
