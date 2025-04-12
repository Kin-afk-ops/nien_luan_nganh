"use client";
import axiosInstance from "@/helpers/api/config";
import "./phoneModal.css";
import "./responsive.css";
import { useRouter } from "next/navigation";
import { newUserPhone } from "@/interfaces/user";

interface ChildProps {
  setPhoneModal: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  phoneValue: string;
  passwordValue: string;
}

const PhoneModal: React.FC<ChildProps> = ({
  setPhoneModal,
  phoneValue,
  passwordValue,
  setLoading,
}) => {
  const router = useRouter();

  const handleConfirmRegister = async (): Promise<void> => {
    setLoading(true);

    const newUser: newUserPhone = {
      phone: phoneValue,
      password: passwordValue,
    };
    try {
      const res = await axiosInstance.post("/auth/register/phone", newUser);
      router.push("/tai-khoan/dang-nhap");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={() => {
        setPhoneModal(false);
      }}
    >
      <div
        className="phone__modal"
        onClick={(e) => {
          e.stopPropagation(); // Ngăn chặn sự kiện nổi bọt
        }}
      >
        <h5>Thông báo</h5>

        <p>
          Đây là một dự án miễn phí. Nhưng việc yêu cầu gửi xác thực SMS của các
          nhà cung cấp hiện nay đều tính phí nên việc xác thực số điện thoại ở
          dự án này sẽ luôn luôn thành công! Cảm ơn.
        </p>
        <button
          className="secondary-btn "
          onClick={() => {
            handleConfirmRegister();
          }}
        >
          Xác nhận đăng ký
        </button>
        <i
          className="fa-solid fa-xmark"
          onClick={() => setPhoneModal(false)}
        ></i>
      </div>
    </div>
  );
};

export default PhoneModal;
