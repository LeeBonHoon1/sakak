"use client";

import { useState } from "react";
import { Sidebar } from "@/shared/components/sidebar";
import { Header } from "@/shared/components/header";

interface DashboardClientLayoutProps {
  children: React.ReactNode;
}

export const DashboardClientLayout = ({
  children,
}: DashboardClientLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-5">{children}</main>
      </div>
    </div>
  );
};
