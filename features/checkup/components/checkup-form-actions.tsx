"use client";

import { Button } from "@/components/ui/button";
import { useCheckupForm } from "@/features/checkup/components/checkup-form-context";

type CheckupFormActionsProps = {
  formRef?: React.RefObject<HTMLFormElement | null>;
};

export const CheckupFormActions = ({ formRef }: CheckupFormActionsProps) => {
  const { currentStep, totalSteps, onPrevious, isSubmitting } =
    useCheckupForm();

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;
  const isStep5 = currentStep === totalSteps + 1;
  const isStep6 = currentStep === totalSteps + 2;
  const isStep7 = currentStep === totalSteps + 3;
  const isStep8 = currentStep === totalSteps + 4;

  const handleSubmit = () => {
    formRef?.current?.requestSubmit();
  };

  if (isStep5 || isStep6 || isStep7 || isStep8) return null;

  return (
    <div className="flex justify-between">
      {!isFirstStep && (
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={isSubmitting}
        >
          이전
        </Button>
      )}
      {isFirstStep && <div />}
      <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
        {isLastStep ? "조회하기" : "다음"}
      </Button>
    </div>
  );
};
