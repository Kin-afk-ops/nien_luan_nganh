"use client";
import { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/useAppDispatch";
import HeaderLogged from "./HeaderLogged";

export default function HeaderWrapper() {
  const user =
    useSelector((state: RootState) => state.user.currentUser) || null;
  const [userLogin, setUserLogin] = useState<{
    _id: string;
    accessToken: string;
    phone: string;
    email: string;
    firebase: boolean;
  } | null>(null);

  useEffect(() => {
    if (user) setUserLogin(user);
  }, [user]);

  console.log(user);

  return <>{userLogin ? <HeaderLogged user={userLogin} /> : <Header />}</>;
}
