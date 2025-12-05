"use client";

import { useCheckupStore } from "@/features/checkup/store";

import { Skeleton } from "@/components/ui/skeleton";

interface CheckupResultListProps {
  showChart: boolean;
}

export const CheckupResultList = ({ showChart }: CheckupResultListProps) => {
  const { checkupData } = useCheckupStore();

  if (!checkupData || !checkupData.resultList?.length) return null;

  return (
    <div className="border rounded-lg">
      <div className="border-b bg-muted/50 px-6 py-3">
        <h2 className="text-lg font-semibold">검진 결과</h2>
      </div>
      {showChart ? (
        <div className="divide-y">
          {checkupData.resultList.map((result, index) => (
            <div
              key={index}
              className="px-6 py-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-base">
                    검진일: {result.checkupDate}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    기관명: {result.organizationName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="divide-y">
          {Array.from({ length: checkupData.resultList.length }).map(
            (_, index) => (
              <div key={index} className="px-6 py-4 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
