import type {
  CheckupOverview,
  CheckupReference,
} from "@/features/checkup/types";

type HealthStatus = "normal" | "caution" | "risk";

interface HealthStatusCount {
  normal: number;
  caution: number;
  risk: number;
}

const checkValueInRange = (
  value: number,
  refNormal: string,
  refCaution: string,
  refRisk: string
): HealthStatus => {
  if (refNormal && checkInNormalRange(value, refNormal)) {
    return "normal";
  }

  if (refCaution && checkInCautionRange(value, refCaution)) {
    return "caution";
  }

  if (refRisk && checkInRiskRange(value, refRisk)) {
    return "risk";
  }

  return "normal";
};

const checkInNormalRange = (value: number, range: string): boolean => {
  if (!range || range === "") return false;

  if (range.includes("-")) {
    const [min, max] = range.split("-").map(parseFloat);
    return value >= min && value <= max;
  }

  if (range.includes("미만")) {
    const num = parseFloat(range.replace("미만", ""));
    return value < num;
  }

  if (range.includes("이상")) {
    const num = parseFloat(range.replace("이상", ""));
    return value >= num;
  }

  if (range.includes("/")) {
    const parts = range.split("/");
    if (parts[0].includes("미만")) {
      const num = parseFloat(parts[0].replace("미만", "").trim());
      return value < num;
    }
  }

  return false;
};

const checkInCautionRange = (value: number, range: string): boolean => {
  if (!range || range === "") return false;

  if (range.includes("~")) {
    const parts = range.split("~");
    if (parts.length === 2) {
      const min = parseFloat(parts[0].replace(/[^0-9.]/g, ""));
      const max = parseFloat(parts[1]);
      return value >= min && value <= max;
    }
  }

  if (range.includes("-") && !range.includes("~")) {
    const [min, max] = range.split("-").map(parseFloat);
    return value >= min && value <= max;
  }

  if (range.includes("/")) {
    const parts = range.split("/");
    if (parts[0].includes("-")) {
      const [min, max] = parts[0]
        .replace("또는", "")
        .trim()
        .split("-")
        .map(parseFloat);
      return value >= min && value <= max;
    }
  }

  return false;
};

const checkInRiskRange = (value: number, range: string): boolean => {
  if (!range || range === "") return false;

  if (range.includes("이상")) {
    const num = parseFloat(range.replace("이상", ""));
    return value >= num;
  }

  if (range.includes("/")) {
    const parts = range.split("/");
    if (parts[0].includes("이상")) {
      const num = parseFloat(
        parts[0].replace("이상", "").replace("또는", "").trim()
      );
      return value >= num;
    }
  }

  if (range.includes("미만")) {
    const num = parseFloat(range.replace("미만", ""));
    return value < num;
  }

  return false;
};

const parseNumericValue = (value: string): number | null => {
  if (!value || value === "") return null;

  const numStr = value.replace(/[^0-9.]/g, "");
  const num = parseFloat(numStr);

  return isNaN(num) ? null : num;
};

export const analyzeCheckupData = (
  overview: CheckupOverview,
  referenceList: CheckupReference[]
): HealthStatusCount => {
  const normalRef = referenceList.find((ref) => ref.refType === "정상(A)");
  const cautionRef = referenceList.find((ref) => ref.refType === "정상(B)");
  const riskRef = referenceList.find((ref) => ref.refType === "질환의심");

  if (!normalRef || !cautionRef || !riskRef) {
    return { normal: 0, caution: 0, risk: 0 };
  }

  const statusCount: HealthStatusCount = { normal: 0, caution: 0, risk: 0 };

  const itemsToCheck: (keyof CheckupOverview)[] = [
    "BMI",
    "bloodPressure",
    "fastingBloodGlucose",
    "totalCholesterol",
    "HDLCholesterol",
    "triglyceride",
    "LDLCholesterol",
    "serumCreatinine",
    "GFR",
    "AST",
    "ALT",
    "yGPT",
    "hemoglobin",
  ];

  itemsToCheck.forEach((item) => {
    const value = parseNumericValue(overview[item]);
    if (value === null) return;

    const refNormal =
      (normalRef[item as keyof CheckupReference] as string) || "";
    const refCaution =
      (cautionRef[item as keyof CheckupReference] as string) || "";
    const refRisk = (riskRef[item as keyof CheckupReference] as string) || "";

    const status = checkValueInRange(value, refNormal, refCaution, refRisk);

    if (status === "normal") {
      statusCount.normal++;
    } else if (status === "caution") {
      statusCount.caution++;
    } else if (status === "risk") {
      statusCount.risk++;
    }
  });

  return statusCount;
};

export interface ItemStatus {
  name: string;
  value: number | null;
  status: HealthStatus;
  unit: string;
}

export const getItemStatuses = (
  overview: CheckupOverview,
  referenceList: CheckupReference[]
): ItemStatus[] => {
  const normalRef = referenceList.find((ref) => ref.refType === "정상(A)");
  const cautionRef = referenceList.find((ref) => ref.refType === "정상(B)");
  const riskRef = referenceList.find((ref) => ref.refType === "질환의심");
  const unitRef = referenceList.find((ref) => ref.refType === "단위");

  if (!normalRef || !cautionRef || !riskRef || !unitRef) {
    return [];
  }

  const itemLabels: Record<keyof CheckupOverview, string> = {
    checkupDate: "검진일",
    height: "신장",
    weight: "체중",
    waists: "허리둘레",
    BMI: "BMI",
    vision: "시력",
    hearing: "청력",
    bloodPressure: "혈압",
    proteinuria: "단백뇨",
    hemoglobin: "혈색소",
    fastingBloodGlucose: "공복혈당",
    totalCholesterol: "총콜레스테롤",
    HDLCholesterol: "HDL콜레스테롤",
    triglyceride: "중성지방",
    LDLCholesterol: "LDL콜레스테롤",
    serumCreatinine: "혈청크레아티닌",
    GFR: "GFR",
    AST: "AST",
    ALT: "ALT",
    yGPT: "yGPT",
    chestXrayResult: "흉부X선",
    osteoporosis: "골다공증",
    evaluation: "평가",
  };

  const itemsToCheck: (keyof CheckupOverview)[] = [
    "BMI",
    "bloodPressure",
    "fastingBloodGlucose",
    "totalCholesterol",
    "HDLCholesterol",
    "triglyceride",
    "LDLCholesterol",
    "serumCreatinine",
    "GFR",
    "AST",
    "ALT",
    "yGPT",
    "hemoglobin",
  ];

  return itemsToCheck.map((item) => {
    const value = parseNumericValue(overview[item]);
    const refNormal =
      (normalRef[item as keyof CheckupReference] as string) || "";
    const refCaution =
      (cautionRef[item as keyof CheckupReference] as string) || "";
    const refRisk = (riskRef[item as keyof CheckupReference] as string) || "";
    const unit = (unitRef[item as keyof CheckupReference] as string) || "";

    const status =
      value !== null
        ? checkValueInRange(value, refNormal, refCaution, refRisk)
        : "normal";

    return {
      name: itemLabels[item] || item,
      value,
      status,
      unit,
    };
  });
};
