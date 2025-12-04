"use client";

import { Info } from "lucide-react";

import { useCheckupForm } from "@/features/checkup/components/checkup-form-context";

import { Button } from "@/components/ui/button";

export const CheckupStep6 = () => {
  const { onClose, onContinue } = useCheckupForm();

  const handleContinueClick = () => {
    onContinue?.();
  };

  const handleCancel = () => onClose?.();

  return (
    <div className="space-y-4 flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
        <Info className="w-8 h-8 text-gray-600" />
      </div>
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold">본인인증이 필요합니다</p>
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg max-w-md">
          <p className="text-sm text-gray-800 font-medium mb-2">
            본인인증을 완료해주세요
          </p>
          <p className="text-xs text-gray-700">
            <span>
              건강검진 조회 내용을 확인하시려면 먼저 본인인증을 완료해주세요.
            </span>
            <span>본인인증 완료 후 다음 버튼을 클릭해주세요.</span>
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button variant="outline" onClick={handleCancel}>
          중단
        </Button>
        <Button onClick={handleContinueClick}>다음</Button>
      </div>
    </div>
  );
};
