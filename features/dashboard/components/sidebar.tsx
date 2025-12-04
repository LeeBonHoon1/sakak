"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { DASHBOARD_MENU_ITEMS } from "@/features/dashboard/constants";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full w-64 bg-gray-50 border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="font-bold">Sakak</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {DASHBOARD_MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
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
    </div>
  );
};
