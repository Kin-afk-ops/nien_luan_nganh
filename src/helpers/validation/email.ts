import { emailTestInterface } from "@/interfaces/emailTest";

const validationEmail = (email: string): emailTestInterface => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const emailTest: emailTestInterface = {
    pass: true,
    content: "",
  };

  if (!emailRegex.test(email)) {
    emailTest.pass = false;
    emailTest.content = "Email không hợp lệ. Hãy kiểm tra!";
  }
  return emailTest;
};

export default validationEmail;
