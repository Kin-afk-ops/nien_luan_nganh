"use client";
import ProductListContainer from "@/components/HomeProducts/ProductListContainer";
import "./page.css";
import "./responsive.css";
import Loading from "@/components/loading/Loading";
import axiosInstance from "@/helpers/api/config";
import { RootState } from "@/hooks/useAppDispatch";
import { InfoUserInterface } from "@/interfaces/infoUser";
import { ProductInterface } from "@/interfaces/product";
import { ProductModel } from "@/models/ProductModel";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ShopPage = () => {
  const [phone, setPhone] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const params = useParams<{ id: string }>();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [infoUser, setInfoUser] = useState<InfoUserInterface | null>(null);
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    const getInfoUser = async (): Promise<void> => {
      setLoading(true);

      try {
        if (params.id) {
          const resInfo = await axiosInstance(`/infoUser/${params?.id}`);
          const resUser = await axiosInstance(`/user/${params?.id}`);
          setEmail(resUser.data.email);
          setPhone(resUser.data.phone);
          setInfoUser(resInfo.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getProduct = async (): Promise<void> => {
      try {
        if (params.id) {
          const res = await axiosInstance(
            `/product/seller/${params.id}?approve=true`
          );
          setProducts(res.data);

          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    getInfoUser();
    getProduct();
  }, [params]);

  return (
    <>
      {loading && <Loading />}
      <div className="grid wide shop">
        <div className="main-container">
          <h1>
            <i className="fa-solid fa-shop"></i>

            {infoUser?.name}
          </h1>
          {infoUser && (
            <div className="shop__top row no-gutters">
              <div className="l-4 m-5 s-12 shop__top--left">
                <Image
                  className="shop__top--avatar"
                  src={
                    infoUser.avatar?.path ||
                    "/assets/account/avatar_default.png"
                  }
                  alt="avatar"
                  width={255}
                  height={255}
                />
              </div>
              <div className="l-1 m-1 s-0"></div>
              <div className="l-7 m-6 s-12 shop__top--right">
                <div className="shop__top--info">
                  <i className="shop__top--icon fa-solid fa-user"></i>
                  {infoUser.name}
                </div>

                <div className="shop__top--info">
                  <i className="shop__top--icon fa-solid fa-phone"></i>
                  {phone}
                  {phone && (
                    <i
                      className="fa-solid fa-copy shop__top--copy"
                      onClick={() => {
                        navigator.clipboard.writeText(phone);

                        toast.success("Sao chép " + phone);
                      }}
                    ></i>
                  )}
                </div>

                <div className="shop__top--info">
                  <i className="shop__top--icon fa-solid fa-envelope"></i>
                  {email}
                  {email && (
                    <i
                      className="fa-solid fa-copy shop__top--copy"
                      onClick={() => {
                        navigator.clipboard.writeText(email);

                        toast.success("Sao chép " + email);
                      }}
                    ></i>
                  )}
                </div>

                <div className="shop__top--info shop__top--introduce">
                  <b>Giới thiệu</b>
                  <p> {infoUser?.introduce}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="main-container">
          {products.length !== 0 && (
            <ProductListContainer productList={products} />
          )}
        </div>
      </div>
    </>
  );
};

export default ShopPage;
