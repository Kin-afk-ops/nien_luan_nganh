'use client';

import { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin-layout.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <div className="admin-layout">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`admin-main ${isSidebarOpen ? 'with-sidebar' : 'full-width'}`}>
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> 
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
} 