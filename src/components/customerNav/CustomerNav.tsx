"use client";

import { RootState } from "@/hooks/useAppDispatch";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./customerNav.css";
import "./responsive.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axiosInstance from "@/helpers/api/config";

interface ChildProps {
  setMenuToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomerNav: React.FC<ChildProps> = ({ setMenuToggle }) => {
  const pathname = usePathname();
  const user =
    useSelector((state: RootState) => state.user.currentUser) || null;

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const [slug, setSlug] = useState<string | null>(null);
  const [firebaseIsAccount, setFIrebaseIsAccount] = useState<boolean>(false);

  useEffect(() => {
    setSlug(pathname.split("/")[2]);
  }, [pathname]);

  useEffect(() => {
    if (user) {
      setUserEmail(user.email !== "none" ? user.email : "Không có thông tin");

      setFIrebaseIsAccount(user?.firebase);
    }

    const getInfoUser = async (): Promise<void> => {
      await axiosInstance
        .get(`/infoUser/${user?._id}`)
        .then((res) => {
          setName(res.data.name);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getInfoUser();
  }, [user]);

  return (
    <div className="customer__nav">
      <i
        className="fa-solid fa-xmark customer__nav--close-mobile"
        onClick={() => setMenuToggle(false)}
      ></i>
      <div className="customer__nav--info">
        <Image
          className="customer__nav--image"
          src="/assets/account/avatar_default.png"
          alt="avatar"
          width={60}
          height={60}
        />
        {userEmail && (
          <p className="customer__nav--name">{name ? name : userEmail}</p>
        )}
      </div>

      <ul className="customer__nav--list">
        <li onClick={() => setMenuToggle(false)}>
          <Link
            href={"/ho-so/thong-tin"}
            className={
              slug === "thong-tin"
                ? "link customer__nav--link active"
                : "link customer__nav--link"
            }
          >
            <i className="customer__nav--icon fa-regular fa-user"></i>
            <p>Hỗ sơ của tôi</p>
          </Link>
        </li>

        <li onClick={() => setMenuToggle(false)}>
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

        <li onClick={() => setMenuToggle(false)}>
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

        {!firebaseIsAccount && (
          <li onClick={() => setMenuToggle(false)}>
            <Link
              href={"/ho-so/thay-doi-mat-khau"}
              className={
                slug === "thay-doi-mat-khau"
                  ? "customer__nav--link active"
                  : "customer__nav--link"
              }
            >
              <i className="customer__nav--icon fa-regular fa-edit"></i>
              <p>Thay đổi mật khẩu</p>
            </Link>
          </li>
        )}
      </ul>

      <h3>Bán hàng</h3>

      <ul className="customer__nav--list">
        <li onClick={() => setMenuToggle(false)}>
          <Link
            href={"/sellform"}
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

        <li onClick={() => setMenuToggle(false)}>
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

        <li onClick={() => setMenuToggle(false)}>
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
      </ul>

      <h3>Mua hàng</h3>
      <ul className="customer__nav--list">
        <li onClick={() => setMenuToggle(false)}>
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
