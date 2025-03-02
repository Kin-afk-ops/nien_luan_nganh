"use client";

import { RootState } from "@/hooks/useAppDispatch";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import "./customerNav.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

const CustomerNav = () => {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const slug = pathname.split("/")[2];

  return (
    <div className="customer__nav">
      <div className="customer__nav--info">
        <Image
          className="customer__nav--image"
          src="/assets/account/avatar_default.png"
          alt="avatar"
          width={60}
          height={60}
        />
        <p className="customer__nav--name">{user?.email}</p>
      </div>

      <ul className="customer__nav--list">
        <li>
          <Link
            href={"/ho-so/thong-tin"}
            className={
              slug === "thong-tin"
                ? "customer__nav--link active"
                : "customer__nav--link"
            }
          >
            <i className="customer__nav--icon fa-regular fa-user"></i>
            <p>Hỗ sơ của tôi</p>
          </Link>
        </li>

        <li>
          <Link
            href={"/ho-so/thong-bao"}
            className={
              slug === "thong-bao"
                ? "customer__nav--link active"
                : "customer__nav--link"
            }
          >
            <i className="customer__nav--icon fa-regular fa-bell"></i>
            <p>Thông báo</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerNav;
