"use client";

export const CheckupStep5 = () => {
  return (
    <div className="space-y-4 flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold">건강검진 조회 중...</p>
        <p className="text-sm text-muted-foreground">
          잠시만 기다려주세요. 조회가 완료되면 결과를 표시합니다.
        </p>
      </div>
    </div>
  );
};
