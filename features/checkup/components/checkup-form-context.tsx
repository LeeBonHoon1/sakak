"use client";

import { createContext, useContext } from "react";
import { type UseFormReturn } from "react-hook-form";
import type { CheckupFormSchema } from "@/features/checkup/schemas";
import type { CheckupSubmitResponse } from "@/features/checkup/types";

type CheckupFormContextType = {
  form: UseFormReturn<CheckupFormSchema>;
  onSubmit: () => void;
  onPrevious: () => void;
  currentStep: number;
  prevStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  response: CheckupSubmitResponse | null;
  onClose?: () => void;
  onContinue?: () => void;
  onReset?: () => void;
};

export const CheckupFormContext = createContext<CheckupFormContextType | null>(
  null
);

export const useCheckupForm = () => {
  const context = useContext(CheckupFormContext);
  if (!context) {
    throw new Error("useCheckupForm must be used within CheckupFormProvider");
  }
  return context;
};
