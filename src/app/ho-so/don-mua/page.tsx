"use client";
import Loading from "@/components/loading/Loading";
import OrderFilter from "@/components/orderFilter/OrderFilter";
import OrderProduct from "@/components/orderProduct/OrderProduct";
import OrderProductPaginate from "@/components/paginate/OrderProductPaginate";
import OrderProductContainer from "@/components/payProduct/OrderProductContainer";

import axiosInstance from "@/helpers/api/config";
import { RootState } from "@/hooks/useAppDispatch";
import { OrderProductInterface } from "@/interfaces/orderProduct";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PurchaseOrder = () => {
  const user =
    useSelector((state: RootState) => state.user.currentUser) || null;
  const [orderProduct, setOrderProduct] = useState<
    OrderProductInterface[] | null
  >(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<string>("Tất cả");
  const [filterModeLoading, setFilterModeLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setUserId(user?._id);
    }

    setLoading(true);
    const getOrderProduct = async (): Promise<void> => {
      if (userId) {
        try {
          const res = await axiosInstance.get(
            `/order/product/${userId}?page=${currentPage}&limit=10&status=${filterMode}`
          );
          setTotalPages(res.data.totalPages);

          setOrderProduct(res.data.data);
          setTotalItems(res.data.totalItems);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
      setLoading(false);
    };

    getOrderProduct();
  }, [user, userId, filterMode, filterModeLoading, currentPage]);

  console.log(orderProduct);

  return (
    <>
      {loading && <Loading />}
      {userId && (
        <div>
          <h3 className="profile__header">Đơn mua</h3>
          <OrderFilter
            filterMode={filterMode}
            setFilterMode={setFilterMode}
            setFilterModeLoading={setFilterModeLoading}
            filterModeLoading={filterModeLoading}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            userId={userId}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            setTotalItems={setTotalItems}
            setTotalPages={setTotalPages}
            setOrderProduct={setOrderProduct}
            setLoading={setLoading}
          />

          {totalItems !== 0 ? (
            <OrderProductContainer
              orderProduct={orderProduct}
              userId={userId}
              setFilterModeLoading={setFilterModeLoading}
              filterModeLoading={filterModeLoading}
              setLoading={setLoading}
            />
          ) : (
            <div className="display-flex-center">Không có sản phẩm</div>
          )}
          {totalItems !== 0 && (
            <OrderProductPaginate
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      )}
    </>
  );
};

export default PurchaseOrder;
