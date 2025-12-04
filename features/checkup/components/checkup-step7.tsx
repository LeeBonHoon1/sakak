"use client";

import { useCheckupForm } from "@/features/checkup/components/checkup-form-context";
import { Button } from "@/components/ui/button";
import { MessageCircleWarning } from "lucide-react";

export const CheckupStep7 = () => {
  const { onReset } = useCheckupForm();

  return (
    <div className="space-y-4 flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
        <MessageCircleWarning className="w-8 h-8 text-red-600" />
      </div>
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold">건강검진 조회에 실패했습니다</p>
      </div>
      <div className="flex gap-2 mt-4">
        <Button onClick={onReset}>다시 시도</Button>
      </div>
    </div>
  );
};
