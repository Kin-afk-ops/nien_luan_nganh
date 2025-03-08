import { PasswordInterface } from "@/interfaces/PasswordInterface";

const validationPassword = (password: string): PasswordInterface => {
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
  const PasswordInterface: PasswordInterface = {
    pass: true,
    content: "",
  };
  if (!passwordRegex.test(password)) {
    PasswordInterface.pass = false;
    PasswordInterface.content =
      "Mật khẩu phải bao gồm chữ cái, số, ký tự đặc và ít nhất 6 ký tự";
  }

  return PasswordInterface;
};

export default validationPassword;
