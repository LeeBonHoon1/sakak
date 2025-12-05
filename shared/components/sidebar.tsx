"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { DASHBOARD_MENU_ITEMS } from "@/shared/constants";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useCheckupStore } from "@/features/checkup/store";

import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { clearUser } = useAuthStore();
  const { clearCheckupData } = useCheckupStore();

  const handleLogout = () => {
    clearUser();
    clearCheckupData();
    if (onClose) onClose();
    router.push("/login");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 flex flex-col h-full w-64 bg-gray-50 border-r border-gray-200 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h1
            className="font-bold cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            Sakak
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {DASHBOARD_MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (onClose) onClose();
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">로그아웃</span>
          </Button>
        </div>
      </div>
    </>
  );
};
