"use client";

import axios from "axios";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  checkupFormDefaultValues,
  checkupFormSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  type CheckupFormSchema,
} from "@/features/checkup/schema";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { useCheckupMutationOptions } from "@/features/checkup/query-options";
import { Form } from "@/components/ui/form";
import { useCheckupStore } from "@/features/checkup/store";
import type {
  CheckupSubmitResponse,
  CheckupMultiFactorResponse,
  CheckupData,
} from "@/features/checkup/types";

import { CheckupFormContext } from "@/features/checkup/components/checkup-form-context";

const STEP_SCHEMAS = [step1Schema, step2Schema, step3Schema, step4Schema];

const validateStep = (
  form: ReturnType<typeof useForm<CheckupFormSchema>>,
  schema: z.ZodObject<Record<string, z.ZodTypeAny>>
) => {
  const formValues = form.getValues();
  const stepFields = Object.keys(schema.shape);
  const stepData = Object.fromEntries(
    stepFields.map((field) => [
      field,
      formValues[field as keyof CheckupFormSchema],
    ])
  );

  const result = schema.safeParse(stepData);

  if (!result.success) {
    result.error.issues.forEach((issue: z.ZodIssue) => {
      const field = issue.path[0] as keyof CheckupFormSchema;
      form.setError(field, { message: issue.message });
    });
    return false;
  }

  return true;
};

type CheckupFormProviderProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

export const CheckupFormProvider = ({
  children,
  onClose,
}: CheckupFormProviderProps) => {
  const { user } = useAuthStore();
  const { setCheckupData } = useCheckupStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [prevStep, setPrevStep] = useState(1);
  const [firstResponse, setFirstResponse] =
    useState<CheckupMultiFactorResponse | null>(null);

  const updateStep = (nextStep: number) => {
    setCurrentStep((prev) => {
      setPrevStep(prev);
      return nextStep;
    });
  };

  const mutationOptions = useCheckupMutationOptions();
  const mutation = useMutation({
    ...mutationOptions,
    onMutate: () => {
      updateStep(STEP_SCHEMAS.length + 1);
    },
    onSuccess: (data) => {
      if (data?.status === "success") {
        const responseData = data.data as
          | {
              transactionId?: string;
              jobIndex?: number;
              threadIndex?: number;
              multiFactorTimestamp?: number;
            }
          | CheckupData
          | undefined;

        const isFirstResponse =
          responseData &&
          "transactionId" in responseData &&
          responseData.transactionId;
        const isSecondResponse = responseData && "patientName" in responseData;

        if (isFirstResponse && !firstResponse) {
          setFirstResponse(data as CheckupMultiFactorResponse);
          updateStep(6);
        } else if (isSecondResponse) {
          setCheckupData(responseData as CheckupData);
          updateStep(8);
        } else {
          updateStep(6);
        }
      } else {
        updateStep(7);
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
      updateStep(7);
    },
  });

  const form = useForm<CheckupFormSchema>({
    resolver: zodResolver(checkupFormSchema),
    defaultValues: checkupFormDefaultValues,
    mode: "onChange",
  });

  const handleSubmit = async () => {
    if (currentStep < 1 || currentStep > STEP_SCHEMAS.length) return;

    const currentSchema = STEP_SCHEMAS[currentStep - 1];
    if (!currentSchema) return;

    if (!validateStep(form, currentSchema)) return;

    if (currentStep === STEP_SCHEMAS.length) {
      const formValues = form.getValues();
      const uuid = crypto.randomUUID();
      const params = {
        id: `${user?.email}_${uuid}`,
        loginTypeLevel: String(formValues.loginTypeLevel),
        legalName: formValues.legalName,
        birthdate: formValues.birthdate,
        phoneNo: formValues.phoneNo,
        telecom: String(formValues.telecom),
        startDate: formValues.startDate,
        endDate: formValues.endDate,
        inquiryType: String(formValues.inquiryType),
      };

      mutation.mutate(params);
      return;
    }

    updateStep(currentStep + 1);
  };

  const handlePrevious = () => {
    updateStep(currentStep - 1);
  };

  const handleContinue = () => {
    if (!firstResponse?.data) {
      console.error("이전 응답 데이터가 없습니다.");
      return;
    }

    const responseData = firstResponse.data;
    if (
      !responseData.transactionId ||
      responseData.jobIndex === undefined ||
      responseData.threadIndex === undefined ||
      responseData.multiFactorTimestamp === undefined
    ) {
      console.error("필수 multiFactorInfo 데이터가 없습니다:", responseData);
      return;
    }

    const formValues = form.getValues();
    const uuid = crypto.randomUUID();
    const params = {
      id: `${user?.email}_${uuid}`,
      loginTypeLevel: String(formValues.loginTypeLevel),
      legalName: formValues.legalName,
      birthdate: formValues.birthdate,
      phoneNo: formValues.phoneNo,
      telecom: String(formValues.telecom),
      startDate: formValues.startDate,
      endDate: formValues.endDate,
      inquiryType: String(formValues.inquiryType),
      isContinue: "1",
      multiFactorInfo: {
        jobIndex: responseData.jobIndex,
        threadIndex: responseData.threadIndex,
        transactionId: responseData.transactionId,
        multiFactorTimestamp: responseData.multiFactorTimestamp,
      },
    };

    mutation.mutate(params);
  };

  const handleReset = () => {
    form.reset();
    updateStep(1);
    mutation.reset();
    setFirstResponse(null);
  };

  return (
    <Form {...form}>
      <CheckupFormContext.Provider
        value={{
          form,
          onSubmit: handleSubmit,
          onPrevious: handlePrevious,
          currentStep,
          prevStep,
          totalSteps: STEP_SCHEMAS.length,
          isSubmitting: mutation.isPending,
          response:
            mutation.data ||
            (mutation.error
              ? ({
                  status: "fail" as const,
                  data: {} as CheckupData,
                  error: axios.isAxiosError(mutation.error)
                    ? (mutation.error.response?.data as { message?: string })
                        ?.message ||
                      mutation.error.message ||
                      "알 수 없는 오류가 발생했습니다."
                    : mutation.error instanceof Error
                    ? mutation.error.message
                    : "알 수 없는 오류가 발생했습니다.",
                } as CheckupSubmitResponse)
              : null),
          onClose,
          onContinue: handleContinue,
          onReset: handleReset,
        }}
      >
        {children}
      </CheckupFormContext.Provider>
    </Form>
  );
};
