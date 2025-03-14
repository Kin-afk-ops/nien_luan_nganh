"use client";

import { useState } from "react";
import "./page.css";
import validationPassword from "@/helpers/validation/password";
import validationConfirmPassword from "@/helpers/validation/confirmPassword";
import { PasswordInterface } from "@/interfaces/passwordTest";

const ChangePasswordPage = () => {
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

  const validationPasswordValue = (): boolean => {
    const vPassword: PasswordInterface = validationPassword(passwordValue);
    setPasswordError(!vPassword.pass);
    setPasswordErrorMessage(vPassword.content);
    return vPassword.pass;
  };

  const validationConfirmPasswordValue = (): boolean => {
    const vConfirmPassword: PasswordInterface = validationConfirmPassword(
      passwordValue,
      confirmPasswordValue
    );
    setConfirmPasswordError(!vConfirmPassword.pass);
    setConfirmPasswordErrorMessage(vConfirmPassword.content);
    return vConfirmPassword.pass;
  };

  const handleSubmit = async (): Promise<void> => {
    validationPasswordValue();
    validationConfirmPasswordValue();

    if (validationPasswordValue() && validationConfirmPasswordValue()) {
      const newPassword: {
        password: string;
      } = {
        password: passwordValue,
      };

      console.log(newPassword);
    }
  };

  return (
    <>
      <h3 className="profile__header">Thay đổi mật khẩu</h3>

      <div className="main-container profile__changePassword">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="profile__changePassword--block">
            <label htmlFor="profile__changePassword--password">
              Mật khẩu mới
            </label>
            <input
              id="profile__changePassword--password"
              type={displayPassword ? "text" : "password"}
              onChange={(e) => setPasswordValue(e.target.value)}
              className={passwordError ? "error" : "success"}
              value={passwordValue}
            />
            {passwordError && <p>{passwordErrorMessage}</p>}

            {displayPassword ? (
              <i
                className="fa-regular fa-eye-slash"
                onClick={() => setDisplayPassword(false)}
              ></i>
            ) : (
              <i
                className=" fa-regular fa-eye"
                onClick={() => setDisplayPassword(true)}
              ></i>
            )}
          </div>
          <div className="profile__changePassword--block">
            <label htmlFor="profile__changePassword--confirmPassword">
              Nhập lại mật khẩu
            </label>
            <input
              id="profile__changePassword--confirmPassword"
              type={displayConfirmPassword ? "text" : "password"}
              onChange={(e) => setConfirmPasswordValue(e.target.value)}
              className={passwordError ? "error" : "success"}
              value={confirmPasswordValue}
            />
            {confirmPasswordError && <p>{confirmPasswordErrorMessage}</p>}

            {displayConfirmPassword ? (
              <i
                className="fa-regular fa-eye-slash"
                onClick={() => setDisplayConfirmPassword(false)}
              ></i>
            ) : (
              <i
                className=" fa-regular fa-eye"
                onClick={() => setDisplayConfirmPassword(true)}
              ></i>
            )}
          </div>
          <button className="secondary-btn" type="submit">
            Xác nhận
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordPage;
