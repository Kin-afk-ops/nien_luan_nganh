"use client";
import React, { useRef } from "react";
import "./otpInput.css";
interface OTPInputProps {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}

const OtpInput: React.FC<OTPInputProps> = ({ otp, setOtp }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Chỉ nhận số (0-9)

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 6 - 1) {
      inputRefs.current[index + 1]?.focus(); // Chuyển sang ô tiếp theo
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Quay lại ô trước
    }
  };
  return (
    <div className="otp-container">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          className="otp-input"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
