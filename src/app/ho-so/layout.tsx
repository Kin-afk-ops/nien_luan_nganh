import React from "react";
import "./layout.css";
import CustomerNav from "@/components/customerNav/CustomerNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="auth container">
      <div className="grid wide">
        <div className="row">
          <div className=" col l-3 m-3 s-0">
            <CustomerNav />
          </div>
          <div className="col l-9 m-9 s-12">{children}</div>

          <div className="l-0 m-0 s-12">
            <CustomerNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
