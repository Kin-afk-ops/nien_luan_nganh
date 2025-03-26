"use client";
import { useEffect, useState } from "react";
import "./profileAccount.css";
import "./responsive.css";
import OtpInput from "../otpInput/OtpInput";
import axiosInstance from "@/helpers/api/config";
import validationEmail from "@/helpers/validation/email";
import validationPhone from "@/helpers/validation/phone";
import isMongoId from "@/helpers/validation/isMongoId";

interface ChildProps {
  phone: string;
  email: string;
  userId: string | null;
}

const ProfileAccount: React.FC<ChildProps> = ({ email, phone, userId }) => {
  const [changeModel, setChangeModel] = useState<boolean>(false);
  const [emailMode, setEmailMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [otpMode, setOtpMode] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string[]>(new Array(6).fill(""));
  const [emailValue, setEmailValue] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<boolean>(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState<string>("");

  // Khóa cuộn trang khi mở modal
  useEffect(() => {
    if (changeModel) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Xóa khi component bị unmount để tránh lỗi
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [changeModel]);

  const validationEmailValue = (): boolean => {
    if (validationEmail(emailValue).pass) {
      if (emailValue === email) {
        setEmailError(true);
        return false;
      }

      setEmailError(false);

      return true;
    } else {
      setEmailError(true);
      return false;
    }
  };

  const validationPhoneValue = (): boolean => {
    if (validationPhone(phoneValue).pass) {
      if (phoneValue === phone) {
        setPhoneError(true);
        return false;
      }

      setPhoneError(false);

      return true;
    } else {
      setPhoneError(true);
      return false;
    }
  };

  const handleEmailSubmit = async (): Promise<void> => {
    validationEmailValue();
    if (userId && validationEmailValue()) {
      await axiosInstance
        .post(`/auth/update/email/${userId}`, {
          email: emailValue,
        })
        .then((res) => {
          console.log(res.data);
          setOtpMode(true);
        })
        .catch((error) => console.log(error));
      setOtpMode(true);
    }
  };

  const handleVerifyOtpEmail = async (): Promise<void> => {
    if (userId) {
      let otpLength: number = 0;

      while (otpLength <= 6) {
        if (otpValue[otpLength] === "") {
          console.log("Hãy nhập đầy đủ mã OTP");
          return;
        } else {
          otpLength++;
        }
      }

      await axiosInstance
        .put(`/auth/verify-otp-email/${userId}/${otpValue.join("")}`, {
          email: emailValue,
        })
        .then((res) => {
          console.log(res.data);
          alert("da chinh sua");
        })
        .catch((error) => {
          console.log(error);
          setOtpError(true);
          setOtpErrorMessage(error.message);
        });
    }
  };

  const handlePhoneSubmit = async (): Promise<void> => {
    validationPhoneValue();
    if (userId && validationPhoneValue()) {
      // await axiosInstance
      //   .post(`/auth/update/email/${userId}`, {
      //     email: emailValue,
      //   })
      //   .then((res) => {
      //     console.log(res.data);
      //     setOtpMode(true);
      //   })
      //   .catch((error) => console.log(error));
      setOtpMode(true);
    }
  };

  return (
    <div className="main-container profile__account">
      {changeModel && <div className="profile__account--overlay"></div>}
      <h4>Cập nhật đầy đủ thông tin để có thể bán hàng</h4>
      <div className="profile__account--content">
        <div className="profile__account--block">
          <p className="profile__account--label">Email</p>
          {email !== "" ? (
            <p className="profile__account--text">{email}</p>
          ) : (
            <button
              className="profile__account--add"
              onClick={() => {
                setChangeModel(true);
                setEmailMode(true);
                setTitle("Cập nhật");
              }}
            >
              <i className="fa-solid fa-plus"></i>
              Thêm mới
            </button>
          )}

          {isMongoId(userId) ? (
            <>
              {email !== "" && (
                <button
                  className=" profile__account--change"
                  onClick={() => {
                    setChangeModel(true);
                    setEmailMode(true);
                    setTitle("Thay đổi");
                  }}
                >
                  Thay đổi Email
                </button>
              )}
            </>
          ) : (
            <div className="profile__account--change active">Đã xác minh</div>
          )}
        </div>
        <div className="profile__account--block">
          <p className="profile__account--label">Số điện thoại</p>
          {phone !== "" ? (
            <p className="profile__account--text">{phone}</p>
          ) : (
            <button
              className="profile__account--add"
              onClick={() => {
                setChangeModel(true);
                setEmailMode(false);
                setTitle("Cập nhật");
              }}
            >
              <i className="fa-solid fa-plus"></i>
              Thêm mới
            </button>
          )}

          {phone !== "" && (
            <button
              className=" profile__account--change"
              onClick={() => {
                setChangeModel(true);
                setEmailMode(false);
                setTitle("Thay đổi");
              }}
            >
              Thay đổi số điện thoại
            </button>
          )}
        </div>
      </div>

      {changeModel && (
        <>
          {otpMode ? (
            <>
              {emailMode ? (
                <div className="main-container profile__account--modal">
                  <i
                    className="profile__account--close fa-solid fa-xmark"
                    onClick={() => {
                      setChangeModel(false);
                      setOtpMode(false);
                    }}
                  ></i>
                  <h5>Xác thực tài khoản</h5>
                  <span>Hãy kiểm tra hộp thư của bạn</span>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleVerifyOtpEmail();
                    }}
                  >
                    <OtpInput otp={otpValue} setOtp={setOtpValue} />
                    {otpError && (
                      <p className="profile__opt--error">{otpErrorMessage}</p>
                    )}
                    <button type="submit" className="secondary-btn ">
                      Xác thực
                    </button>
                    <button
                      className="main-btn"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Gửi lại mã
                    </button>
                  </form>

                  {/* <div className="account__error--message">
                        {otpErrorMessage}
                      </div> */}
                </div>
              ) : (
                <div className="main-container profile__account--modal">
                  <i
                    className="profile__account--close fa-solid fa-xmark"
                    onClick={() => {
                      setChangeModel(false);
                      setOtpMode(false);
                    }}
                  ></i>
                  <h5>Xác thực tài khoản</h5>
                  <span>Hãy kiểm tra hộp thư của bạn</span>
                  <form action="">
                    <p>
                      Đây là một dự án miễn phí. Nhưng việc yêu cầu gửi xác thực
                      SMS của các nhà cung cấp hiện nay đều tính phí nên việc
                      xác thực số điện thoại ở dự án này sẽ luôn luôn thành
                      công! Cảm ơn.
                    </p>
                    <button
                      className="secondary-btn "
                      onClick={(e) => {
                        e.preventDefault();
                        setChangeModel(false);
                        setOtpMode(false);
                      }}
                    >
                      Trở lại
                    </button>
                  </form>

                  {/* <div className="account__error--message">
                      {otpErrorMessage}
                    </div> */}
                </div>
              )}
            </>
          ) : (
            <>
              {emailMode ? (
                <div className="main-container profile__account--modal">
                  <i
                    className="profile__account--close fa-solid fa-xmark"
                    onClick={() => setChangeModel(false)}
                  ></i>
                  <h5>{title + " Email"}</h5>
                  <span>
                    Vui lòng nhập một địa chỉ email mới. Một thư xác nhận sẽ
                    được gửi đến hộp thư đến của bạn.
                  </span>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEmailSubmit();
                    }}
                  >
                    {title === "Thay đổi" && (
                      <div className="profile__account--modal-block">
                        <p>Địa chỉ email hiện tại:</p>
                        <p>{email}</p>
                      </div>
                    )}

                    <div className="profile__account--modal-block">
                      <label htmlFor="profile__account--email">
                        Địa chỉ email mới:
                      </label>
                      <input
                        id="profile__account--email"
                        type="text"
                        placeholder="Nhập email của bạn"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        className={emailError ? "error" : ""}
                      />
                    </div>

                    <button type="submit" className="secondary-btn">
                      Gửi mã đến email
                    </button>
                  </form>
                </div>
              ) : (
                <div className="main-container profile__account--modal">
                  <i
                    className="profile__account--close fa-solid fa-xmark"
                    onClick={() => setChangeModel(false)}
                  ></i>
                  <h5>{title + " số điện thoại"}</h5>
                  <span>
                    Vui lòng nhập một số điện thoại mới. Một thư xác nhận sẽ
                    được gửi đến hộp thư đến của bạn.
                  </span>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handlePhoneSubmit();
                    }}
                  >
                    {title === "Thay đổi" && (
                      <div className="profile__account--modal-block">
                        <p>Số điện thoại hiện tại:</p>
                        <p>{phone}</p>
                      </div>
                    )}

                    <div className="profile__account--modal-block">
                      <label htmlFor="profile__account--phone">
                        Số điện thoại mới:
                      </label>
                      <input
                        id="profile__account--phone"
                        type="text"
                        placeholder="Nhập số điện thoại của bạn"
                        value={phoneValue}
                        onChange={(e) => setPhoneValue(e.target.value)}
                        className={phoneError ? "error" : ""}
                      />
                    </div>

                    <button type="submit" className="secondary-btn">
                      Gửi mã đến số điện thoại
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileAccount;
