import OrderFilter from "@/components/orderFilter/OrderFilter";
import OrderProductTable from "@/components/orderProductTable/OrderProductTable";
import React from "react";

const PurchaseOrder = () => {
  return (
    <div>
      <h3 className="profile__header">Đơn mua</h3>
      <OrderFilter />
      <OrderProductTable />
    </div>
  );
};

export default PurchaseOrder;
