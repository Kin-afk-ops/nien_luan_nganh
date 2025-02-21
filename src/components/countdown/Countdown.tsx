import React, { useEffect, useState } from "react";
import "./countdown.css";

type ChildProps = {
  time: number;
};

const Countdown: React.FC<ChildProps> = ({ time }) => {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const savedTime = window.localStorage.getItem("countdown");
    return savedTime ? Math.max(Number(savedTime), 0) : time;
  });
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return alert("Hết hạn mã OTP");

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          window.localStorage.removeItem("countdown");
          return 0;
        }

        const newTime = prev - 1;

        if (window.localStorage.getItem("restart") === "ok") {
          setTimeLeft(time);

          window.localStorage.setItem("countdown", "300");
          window.localStorage.removeItem("restart");
          return 300;
        } else {
          window.localStorage.setItem("countdown", newTime.toString());
        }
        // window.localStorage.setItem("countdown", newTime.toString());

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="countdown">
      <p>{formatTime(timeLeft)}</p>
    </div>
  );
};

export default Countdown;
