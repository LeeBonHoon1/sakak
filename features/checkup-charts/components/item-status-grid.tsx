"use client";

import { useMemo } from "react";

import { useCheckupStore } from "@/features/checkup/store";
import { getItemStatuses } from "@/features/checkup-charts/utils/checkup-analysis";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ItemStatusGridProps {
  showChart: boolean;
}

export const ItemStatusGrid = ({ showChart }: ItemStatusGridProps) => {
  const { checkupData } = useCheckupStore();

  const itemStatuses = useMemo(() => {
    if (
      !checkupData ||
      !checkupData.overviewList.length ||
      !checkupData.referenceList.length
    ) {
      return [];
    }

    const overview = checkupData.overviewList[0];
    const allItems = getItemStatuses(overview, checkupData.referenceList);

    const mainItems = [
      "BMI",
      "혈압",
      "공복혈당",
      "총콜레스테롤",
      "HDL콜레스테롤",
      "중성지방",
      "LDL콜레스테롤",
      "혈색소",
    ];

    return allItems.filter((item) => mainItems.includes(item.name));
  }, [checkupData]);

  if (!checkupData || checkupData.overviewList.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">검사 항목별 상태</h2>
        {showChart && (
          <p className="text-sm text-muted-foreground mt-1">
            검진일: {checkupData.overviewList[0].checkupDate}
          </p>
        )}
      </div>
      {showChart && itemStatuses.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {itemStatuses.map((item) => {
            const statusLabel =
              item.status === "normal"
                ? "정상"
                : item.status === "caution"
                ? "주의"
                : "위험";

            const barColor =
              item.status === "normal"
                ? "bg-green-500"
                : item.status === "caution"
                ? "bg-orange-500"
                : "bg-red-500";

            return (
              <div
                key={item.name}
                className="bg-card border rounded-lg p-4 shadow-sm relative overflow-hidden"
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${barColor}`}
                />
                <div className="font-medium text-sm mb-1">{item.name}</div>
                {item.value !== null && (
                  <div className="text-xs text-muted-foreground">
                    {item.value} {item.unit}
                  </div>
                )}
                <div className="text-xs mt-2 font-semibold">{statusLabel}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      )}
    </Card>
  );
};
