"use client";

import { useCheckupStore } from "@/features/checkup/store";

const CheckupPage = () => {
  const { checkupData } = useCheckupStore();

  console.log(checkupData);
  return (
    <div className="p-5 space-y-6">
      <h1 className="text-2xl font-bold">건강검진 조회 결과</h1>
    </div>
  );
};

export default CheckupPage;
