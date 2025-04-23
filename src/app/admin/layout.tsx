"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin-layout.css";
import AdminLogin from "@/components/adminLogin/AdminLogin";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/useAppDispatch";
import Loading from "@/components/loading/Loading";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const user =
    useSelector((state: RootState) => state.user.currentUser) || null;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [userAdmin, setUserAdmin] = useState<{
    _id: string;
    accessToken: string;
    phone: string;
    email: string;
    firebase: boolean;
  } | null>(null);
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      if (user.phone === "admin") {
        setIsUserAdmin(true);
      } else {
        setIsUserAdmin(false);
      }
    } else {
      setIsUserAdmin(false);
    }
  }, [user]);

  return (
    <>
      {!isUserAdmin ? (
        <AdminLogin />
      ) : (
        <div className="admin-layout">
          <Sidebar
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <div
            className={`admin-main ${
              isSidebarOpen ? "with-sidebar" : "full-width"
            }`}
          >
            <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className="admin-content">{children}</main>
          </div>
        </div>
      )}
    </>
  );
}
