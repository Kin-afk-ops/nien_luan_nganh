"use client";

import { RootState } from "@/hooks/useAppDispatch";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./customerNav.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CustomerNav = () => {
  const pathname = usePathname();
  const user =
    useSelector((state: RootState) => state.user.currentUser) || null;
  const slug = pathname.split("/")[2];
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserEmail(user.email ?? "Đang tải...");
    }

    // Lấy slug từ URL khi client tải xong
  }, [user]);

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
        {userEmail && (
          <p className="customer__nav--name">{userEmail ?? "Đang tải..."}</p>
        )}
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
            href={"/ho-so/tin-nhan"}
            className={
              slug === "tin-nhan"
                ? "customer__nav--link active"
                : "customer__nav--link"
            }
          >
            <i className="customer__nav--icon fa-regular fa-comments"></i>
            <p>Tin nhắn</p>
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

      <h3>Bán hàng</h3>

      <ul className="customer__nav--list">
        <li>
          <Link
            href={"/ho-so/them-san-pham"}
            className={
              slug === "them-san-pham"
                ? "customer__nav--link active"
                : "customer__nav--link"
            }
          >
            <i className="customer__nav--icon fa-regular fa-square-plus"></i>

            <p>Thêm sản phẩm</p>
          </Link>
        </li>

        <li>
          <Link
            href={"/ho-so/tat-ca-san-pham"}
            className={
              slug === "tat-ca-san-pham"
                ? "customer__nav--link active"
                : "customer__nav--link"
            }
          >
            <i className="customer__nav--icon fa-regular fa-rectangle-list"></i>
            <p>Tất cả sản phẩm</p>
          </Link>
        </li>

        <li>
          <Link
            href={"/ho-so/don-ban"}
            className={
              slug === "don-ban"
                ? "customer__nav--link active"
                : "customer__nav--link"
            }
          >
            <i className="customer__nav--icon  fa-solid fa-chart-line"></i>
            <p>Đơn bán</p>
          </Link>
        </li>

        <li>
          <Link
            href={"/ho-so/ho-so-shop"}
            className={
              slug === "ho-so-shop"
                ? "customer__nav--link active"
                : "customer__nav--link"
            }
          >
            <i className="customer__nav--icon fa-solid fa-shop"></i>
            <p>Hồ sơ shop</p>
          </Link>
        </li>

        <li>
          <Link
            href={"/ho-so/xac-minh-danh-tinh"}
            className={
              slug === "xac-minh-danh-tinh"
                ? "customer__nav--link active"
                : "customer__nav--link"
            }
          >
            <i className="customer__nav--icon fa-solid fa-user-tag"></i>
            <p>Xác minh danh tính</p>
          </Link>
        </li>
      </ul>

      <h3>Mua hàng</h3>
      <ul className="customer__nav--list">
        <li>
          <Link
            href={"/ho-so/yeu-thich"}
            className={
              slug === "yeu-thich"
                ? "customer__nav--link active"
                : "customer__nav--link"
            }
          >
            <i className="customer__nav--icon fa-regular fa-heart"></i>
            <p>Yêu thích</p>
          </Link>
        </li>

        <li>
          <Link
            href={"/ho-so/don-mua"}
            className={
              slug === "don-mua"
                ? "customer__nav--link active"
                : "customer__nav--link"
            }
          >
            <i className="customer__nav--icon  fa-solid fa-cart-shopping"></i>
            <p>Đơn mua</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerNav;
