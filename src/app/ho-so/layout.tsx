"use client";
import { useState } from "react";
import "./layout.css";
import "./responsive.css";
import CustomerNav from "@/components/customerNav/CustomerNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [menuToggle, setMenuToggle] = useState<boolean>(false);

  return (
    <>
      {menuToggle && (
        <div
          className="overlay-menu"
          onClick={() => setMenuToggle(false)}
        ></div>
      )}
      <div className="container">
        <div className="grid wide profile__grid">
          <div className="row no-gutters">
            <div className="col l-2 m-3 s-0">
              <CustomerNav setMenuToggle={setMenuToggle} />
            </div>
            <div className="col l-1 m-0"></div>
            <div className="profile col l-9 m-9 s-12">{children}</div>
          </div>

          <div
            className="profile__grid--label"
            onClick={() => setMenuToggle(true)}
          >
            <i className="fa-solid fa-bars"></i>
          </div>

          <div
            className={
              menuToggle
                ? "l-0 m-0 customer__nav--mobile on"
                : "l-0 m-0 customer__nav--mobile"
            }
          >
            <CustomerNav setMenuToggle={setMenuToggle} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
