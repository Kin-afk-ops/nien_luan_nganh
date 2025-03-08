import { PhoneInterface } from "@/interfaces/phoneTest";

const validationPhone = (phone: string): PhoneInterface => {
  const phoneRegex = /^0\d{9}$/;

  const phoneTest: PhoneInterface = {
    pass: true,
    content: "",
  };

  if (!phoneRegex.test(phone)) {
    phoneTest.pass = false;
    phoneTest.content = "Số điện thoại không hợp lệ. Hãy kiểm tra!";
  }

  return phoneTest;
};

export default validationPhone;
