import { PasswordInterface } from "@/interfaces/passwordTest";

const validationConfirmPassword = (
  password: string,
  confirmPassword: string
): PasswordInterface => {
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
  const passwordTest: PasswordInterface = {
    pass: true,
    content: "",
  };
  if (!passwordRegex.test(password)) {
    passwordTest.pass = false;
    passwordTest.content =
      "Mật khẩu phải bao gồm chữ cái, số, ký tự đặc và ít nhất 6 ký tự";
  } else {
    if (password !== confirmPassword) {
      passwordTest.pass = false;
      passwordTest.content = "Mật khẩu không khớp";
    }
  }

  return passwordTest;
};

export default validationConfirmPassword;
