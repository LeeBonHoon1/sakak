"use client";

import { CheckCircle2 } from "lucide-react";

import { useCheckupForm } from "@/features/checkup/components/checkup-form-context";

import { Button } from "@/components/ui/button";

export const CheckupStep8 = () => {
  const { onClose } = useCheckupForm();

  const handleClose = () => onClose?.();

  return (
    <div className="space-y-4 flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8 text-green-600" />
      </div>
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold">건강검진 조회가 완료되었습니다</p>
      </div>
      <div className="flex gap-2 mt-4">
        <Button onClick={handleClose}>확인</Button>
      </div>
    </div>
  );
};
