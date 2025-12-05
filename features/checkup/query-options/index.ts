import { mutationOptions } from "@tanstack/react-query";
import { postCheckupApi } from "@/features/checkup/apis";
import type { CheckupSubmitResponse } from "@/features/checkup/types";

export interface MultiFactorInfo {
  jobIndex: number;
  threadIndex: number;
  transactionId: string;
  multiFactorTimestamp: number;
}

export interface CheckupParams {
  id: string;
  loginTypeLevel: string;
  legalName: string;
  birthdate: string;
  phoneNo: string;
  telecom: string;
  startDate: string;
  endDate: string;
  inquiryType: string;
  isContinue?: string;
  multiFactorInfo?: MultiFactorInfo;
}

export const useCheckupMutationOptions = () => {
  return mutationOptions<CheckupSubmitResponse, Error, CheckupParams>({
    mutationKey: ["checkup"],
    mutationFn: postCheckupApi,
  });
};
