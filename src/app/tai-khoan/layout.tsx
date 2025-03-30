import React from "react";
import "./layout.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="auth container">{children}</div>;
};

export default Layout;
