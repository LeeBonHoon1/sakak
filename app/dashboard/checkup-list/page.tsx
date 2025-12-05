"use client";

import { useState, useEffect } from "react";

import { useCheckupStore } from "@/features/checkup/store";

import { CheckupResultList } from "@/features/checkup-list/components/checkup-result-list";

const CheckupListPage = () => {
  const { checkupData } = useCheckupStore();
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (checkupData) {
      const timer = setTimeout(() => {
        setShowChart(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [checkupData]);

  if (!checkupData) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">검진 결과 리스트</h1>
        <p className="text-muted-foreground">조회된 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {checkupData.patientName}님의 검진결과 리스트
        </h1>
      </div>

      <div className="space-y-6">
        <CheckupResultList showChart={showChart} />
      </div>
    </div>
  );
};

export default CheckupListPage;
