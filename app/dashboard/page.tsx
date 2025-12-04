"use client";

import Link from "next/link";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { useCheckupStore } from "@/features/checkup/store";

import { Button } from "@/components/ui/button";
import CheckupFormModal from "@/features/checkup/components/checkup-form-modal";

const Dashboard = () => {
  const { user } = useAuthStore();
  const { hasCheckupData } = useCheckupStore();

  return (
    <div className="p-5 space-y-6">
      <h1 className="text-2xl font-bold">{user?.name}님의 대시보드</h1>

      {!hasCheckupData ? (
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">
                건강검진 조회가 필요합니다
              </h2>
              <p className="text-sm">
                건강검진 결과를 조회하여 건강 상태를 확인하세요.
              </p>
            </div>
            <CheckupFormModal />
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">건강검진 조회 결과</h2>
              <p className="text-sm text-muted-foreground">
                조회된 건강검진 결과를 확인하세요.
              </p>
            </div>
            <Link href="/dashboard/checkup">
              <Button>상세 보기</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
