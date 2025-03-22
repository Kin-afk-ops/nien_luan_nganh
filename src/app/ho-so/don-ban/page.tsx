"use client";
import OrderFilter from "@/components/orderFilter/OrderFilter";
import OrderProductTable from "@/components/orderProductTable/OrderProductTable";
import { RootState } from "@/hooks/useAppDispatch";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SaleOrderPage = () => {
  const user =
    useSelector((state: RootState) => state.user.currentUser) || null;
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);
  return (
    <div>
      <h3 className="profile__header">Đơn bán</h3>
      <OrderFilter />
      <OrderProductTable />
    </div>
  );
};

export default SaleOrderPage;
