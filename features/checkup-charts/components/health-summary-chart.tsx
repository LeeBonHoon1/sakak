"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell } from "recharts";

import { useCheckupStore } from "@/features/checkup/store";
import { getItemStatuses } from "@/features/checkup-charts/utils/checkup-analysis";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

interface HealthSummaryChartProps {
  showChart: boolean;
}

export const HealthSummaryChart = ({ showChart }: HealthSummaryChartProps) => {
  const { checkupData } = useCheckupStore();

  const chartData = useMemo(() => {
    if (
      !checkupData ||
      !checkupData.overviewList.length ||
      !checkupData.referenceList.length
    ) {
      return null;
    }

    const overview = checkupData.overviewList[0];
    const allItems = getItemStatuses(overview, checkupData.referenceList);

    const normalItems = allItems
      .filter((item) => item.status === "normal")
      .map((item) => item.name);
    const cautionItems = allItems
      .filter((item) => item.status === "caution")
      .map((item) => item.name);
    const riskItems = allItems
      .filter((item) => item.status === "risk")
      .map((item) => item.name);

    return [
      {
        name: "정상",
        value: normalItems.length,
        fill: "#22c55e",
        items: normalItems,
      },
      {
        name: "주의",
        value: cautionItems.length,
        fill: "#f97316",
        items: cautionItems,
      },
      {
        name: "위험",
        value: riskItems.length,
        fill: "#ef4444",
        items: riskItems,
      },
    ];
  }, [checkupData]);

  if (!chartData) return null;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">건강 상태 요약</h2>
      {showChart ? (
        <ChartContainer
          config={{
            정상: {
              label: "정상",
              color: "hsl(var(--chart-1))",
            },
            주의: {
              label: "주의",
              color: "hsl(var(--chart-2))",
            },
            위험: {
              label: "위험",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[400px] w-full"
        >
          <PieChart>
            <ChartTooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload[0]) return null;

                const data = payload[0].payload;
                const items = data.items || [];

                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: data.fill }}
                        />
                        <span className="font-semibold">
                          {data.name}: {data.value}개
                        </span>
                      </div>
                      {items.length > 0 && (
                        <div className="ml-4 space-y-1">
                          {items.map((item: string, index: number) => (
                            <div
                              key={index}
                              className="text-xs text-muted-foreground"
                            >
                              • {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, value }) => `${name}: ${value}개`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              verticalAlign="bottom"
            />
          </PieChart>
        </ChartContainer>
      ) : (
        <div className="h-[400px] w-full flex items-center justify-center">
          <div className="w-full space-y-4">
            <Skeleton className="h-[300px] w-full rounded-lg" />
            <div className="flex gap-4 justify-center">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
