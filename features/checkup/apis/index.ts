import axios from "axios";
import type { CheckupSubmitResponse } from "@/features/checkup/types";
import type { CheckupParams } from "@/features/checkup/query-options";

export const postCheckupApi = async (
  params: CheckupParams
): Promise<CheckupSubmitResponse> => {
  const response = await axios.post<CheckupSubmitResponse>(
    "/api/checkup",
    params
  );
  return response.data;
};
