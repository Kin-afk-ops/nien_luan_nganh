"use client";

import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Link from 'next/link'; // For routing in Next.js
import 'bootstrap/dist/css/bootstrap.min.css';

interface Stats {
  usersCount: number;
  thuonghieusCount: number;
  loaigiaysCount: number;
  giaysCount: number;
  khuyenmaisCount: number;
  donhangsCount: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    // Here you'd normally fetch the data from an API
    setStats({
      usersCount: 120,
      thuonghieusCount: 25,
      loaigiaysCount: 15,
      giaysCount: 200,
      khuyenmaisCount: 10,
      donhangsCount: 50,
    });
  }, []);

  if (!stats) {
    return <div>Loading...</div>; // Show a loading state while the data is being fetched
  }

  return (
    <div>
      Đây là trang chủ trang admin
    </div>
  );
};

export default AdminDashboard;
