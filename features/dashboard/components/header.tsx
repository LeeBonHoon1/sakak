"use client";

import Link from "next/link";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user, clearUser } = useAuthStore();
  return (
    <div className="flex items-center justify-between h-12">
      <Link href="/dashboard" className="font-bold text-lg">
        Dashboard
      </Link>
      <div className="flex gap-2 items-center">
        <p>환영합니다, {user?.name}님!</p>
        <Button size="sm" onClick={clearUser} className="px-4 py-2  rounded">
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default Header;
