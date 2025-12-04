"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { Button } from "@/components/ui/button";

const Header = () => {
  const router = useRouter();
  const { user, clearUser } = useAuthStore();

  const handleLogout = () => {
    clearUser();
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-end h-12">
      <div className="flex gap-3 items-center">
        <p className="text-sm text-gray-600">환영합니다, {user?.name}님!</p>
        <Button size="sm" onClick={handleLogout} variant="outline">
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default Header;
