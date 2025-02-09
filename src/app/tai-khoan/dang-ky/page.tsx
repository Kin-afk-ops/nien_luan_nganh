import React from "react";
import Image from "next/image";
import "./register.css";

const RegisterPage = () => {
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
          <div className="c-4">
            <form>
              <div className="register__head">Đăng ký</div>
              <input type="email" />
              <input type="number" />
              <div className="register__clause">
                <input type="checkbox" name="" id="" />
                <span>Tôi đồng ý với điều khoản & điều kiện của ...</span>
              </div>
              <button>Đăng ký</button>
            </form>
            <div></div>
            <div>Hoặc</div>
            <div></div>

            <div className="register__change">
              <i className="fa-solid fa-square-phone"></i>
              <span>Đăng ký với sô điện thoại</span>
            </div>

            <div className="register__login">
              Bạn đã có sẵn tài khoản? Đăng nhập
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
