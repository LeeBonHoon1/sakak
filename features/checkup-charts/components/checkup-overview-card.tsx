"use client";

import { useCheckupStore } from "@/features/checkup/store";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CheckupOverviewCardProps {
  showChart: boolean;
}

export const CheckupOverviewCard = ({
  showChart,
}: CheckupOverviewCardProps) => {
  const { checkupData } = useCheckupStore();

  if (!checkupData || !checkupData.overviewList?.length) return null;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">건강검진 개요</h2>
      {showChart ? (
        <div className="space-y-4">
          {checkupData.overviewList.map((overview, index) => (
            <div key={index} className="border-b pb-4 last:border-0">
              <p className="font-medium mb-2">검진일: {overview.checkupDate}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">신장:</span>
                  {overview.height}
                </div>
                <div>
                  <span className="text-muted-foreground">체중:</span>
                  {overview.weight}
                </div>
                <div>
                  <span className="text-muted-foreground">BMI:</span>
                  {overview.BMI}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {Array.from({ length: checkupData.overviewList.length }).map(
            (_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-5 w-32" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            )
          )}
        </div>
      )}
    </Card>
  );
};
