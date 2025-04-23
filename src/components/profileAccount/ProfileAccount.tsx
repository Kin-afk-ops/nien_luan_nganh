"use client";
import { useEffect, useState } from "react";
import "./profileAccount.css";
import "./responsive.css";
import OtpInput from "../otpInput/OtpInput";
import axiosInstance from "@/helpers/api/config";
import validationEmail from "@/helpers/validation/email";
import validationPhone from "@/helpers/validation/phone";
import isMongoId from "@/helpers/validation/isMongoId";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/features/user/userSlice";

interface ChildProps {
  phone: string;
  email: string;
  userId: string | null;
  firebaseIsAccount: boolean;
}

const ProfileAccount: React.FC<ChildProps> = ({
  email,
  phone,
  userId,
  firebaseIsAccount,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [changeModel, setChangeModel] = useState<boolean>(false);
  const [emailMode, setEmailMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [otpMode, setOtpMode] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string[]>(new Array(6).fill(""));
  const [emailValue, setEmailValue] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorValue, setEmailErrorValue] = useState<string>("");
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [phoneErrorValue, setPhoneErrorValue] = useState<string>("");
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
        setEmailErrorValue("Không được nhập lại email cũ");
        return false;
      }

      setEmailError(false);

      return true;
    } else {
      setEmailError(true);
      setEmailErrorValue("Hãy nhập một email hợp lệ");

      return false;
    }
  };

  const validationPhoneValue = (): boolean => {
    if (validationPhone(phoneValue).pass) {
      if (phoneValue === phone) {
        setPhoneError(true);
        setPhoneErrorValue("Không được nhập lại sô điện thoại cũ");
        return false;
      }

      setPhoneError(false);

      return true;
    } else {
      setPhoneError(true);
      setPhoneErrorValue("Hãy nhập một số điện thoại hợp lệ");

      return false;
    }
  };

  const handleEmailSubmit = async (): Promise<void> => {
    validationEmailValue();
    if (userId && validationEmailValue()) {
      await axiosInstance
        .post("/auth/register/find/email", {
          email: emailValue,
          firebaseMode: false,
        })
        .then((res) => {
          setEmailError(true);
          setEmailErrorValue(res.data.message);
        })
        .catch(async (error) => {
          console.log(error);
          await axiosInstance
            .put(`/auth/update/email/${userId}`, {
              email: emailValue,
            })
            .then((res) => {
              console.log(res.data);
              setOtpMode(true);
            })
            .catch((error) => console.log(error));
          setOtpMode(true);
        });
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
          alert("Thay đổi thành công! Vui lòng đăng nhập lại");
          console.log(res.data);

          dispatch(logout());
          router.push("/tai-khoan/dang-nhap");
          setOtpMode(false);
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
      await axiosInstance
        .post("/auth/register/find/phone", {
          phone: phoneValue,
        })
        .then((res) => {
          setPhoneError(true);
          setPhoneErrorValue(res.data.message);
        })
        .catch(async (error) => {
          console.log(error);
          if (firebaseIsAccount) {
            let res;
            try {
              if (phone === "") {
                res = await axiosInstance.put(`/auth/update/phone/${userId}`, {
                  phone: phoneValue,
                  firebaseIsAccount: firebaseIsAccount,
                  createMode: true,
                });
                alert("Thay đổi thành công! Vui lòng đăng nhập lại");
                dispatch(logout());
                router.push("/tai-khoan/dang-nhap");
              } else {
                res = await axiosInstance.put(`/auth/update/phone/${userId}`, {
                  phone: phoneValue,
                  firebaseIsAccount: firebaseIsAccount,
                  createMode: false,
                });
                alert("Thay đổi thành công! Vui lòng đăng nhập lại");
                dispatch(logout());
                router.push("/tai-khoan/dang-nhap");
              }

              setOtpMode(true);

              console.log(res.data);
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              const res = await axiosInstance.put(
                `/auth/update/phone/${userId}`,
                {
                  phone: phoneValue,
                  firebaseIsAccount: firebaseIsAccount,
                }
              );

              setOtpMode(true);

              alert("Thay đổi thành công! Vui lòng đăng nhập lại");
              console.log(res.data);
              dispatch(logout());
              router.push("/tai-khoan/dang-nhap");
            } catch (error) {
              console.log(error);
            }
          }
        });
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

          {firebaseIsAccount ? (
            <div className="profile__account--change active">Đã xác minh</div>
          ) : (
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
                        onFocus={() => {
                          setEmailError(false);
                        }}
                        className={emailError ? "error" : ""}
                      />
                    </div>
                    {emailError && (
                      <p className="profile__error--message">
                        {emailErrorValue}
                      </p>
                    )}

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
                        onFocus={() => {
                          setPhoneError(false);
                        }}
                        className={phoneError ? "error" : ""}
                      />
                    </div>

                    {phoneError && (
                      <p className="profile__error--message">
                        {phoneErrorValue}
                      </p>
                    )}

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
