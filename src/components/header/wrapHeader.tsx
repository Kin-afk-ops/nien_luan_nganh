'use client';
import { useEffect, useState } from 'react';
import Header from "@/components/header/Header";
import Headerlogged from "@/components/header/Headerlogged";

export default function HeaderWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const persistRoot = localStorage.getItem('persist:root');
        if (persistRoot) {
          const parsedData = JSON.parse(persistRoot);
          const userData = JSON.parse(parsedData.user);
          setIsLoggedIn(!!userData.currentUser);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
    // Lắng nghe sự kiện storage để cập nhật khi có thay đổi
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  if (isLoggedIn) {
    return <Headerlogged />;
  }

  return <Header />;
}