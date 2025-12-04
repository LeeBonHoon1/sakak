export interface CheckupOverview {
  checkupDate: string;
  height: string;
  weight: string;
  waists: string;
  BMI: string;
  vision: string;
  hearing: string;
  bloodPressure: string;
  proteinuria: string;
  hemoglobin: string;
  fastingBloodGlucose: string;
  totalCholesterol: string;
  HDLCholesterol: string;
  triglyceride: string;
  LDLCholesterol: string;
  serumCreatinine: string;
  GFR: string;
  AST: string;
  ALT: string;
  yGPT: string;
  chestXrayResult: string;
  osteoporosis: string;
  evaluation: string;
}

export interface CheckupReference {
  refType: string;
  height: string;
  weight: string;
  waist: string;
  BMI: string;
  vision: string;
  hearing: string;
  bloodPressure: string;
  proteinuria: string;
  hemoglobin: string;
  fastingBloodGlucose: string;
  totalCholesterol: string;
  HDLCholesterol: string;
  triglyceride: string;
  LDLCholesterol: string;
  serumCreatinine: string;
  GFR: string;
  AST: string;
  ALT: string;
  yGPT: string;
  chestXrayResult: string;
  osteoporosis: string;
}

export interface CheckupResult {
  caseType: string;
  checkupType: string;
  checkupDate: string;
  organizationName: string;
  pdfData: string;
  questionnaire: unknown[];
}

export interface CheckupData {
  patientName: string;
  overviewList: CheckupOverview[];
  referenceList: CheckupReference[];
  resultList: CheckupResult[];
}

export interface CheckupMultiFactorResponse {
  status: "success" | "fail" | string;
  data: {
    jobIndex: number;
    threadIndex: number;
    transactionId: string;
    multiFactorTimestamp: number;
  };
  error?: string;
}

export interface CheckupResultResponse {
  status: "success" | "fail" | string;
  data: CheckupData;
  error?: string;
}

export type CheckupSubmitResponse =
  | CheckupMultiFactorResponse
  | CheckupResultResponse;

export interface CheckupResponse {
  status: string;
  data: CheckupData;
}
