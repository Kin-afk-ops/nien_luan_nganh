import { EmailTestInterface } from "@/interfaces/emailTest";

const validationEmail = (email: string): EmailTestInterface => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const emailTest: EmailTestInterface = {
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
