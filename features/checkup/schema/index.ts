import { z } from "zod";

export const checkupFormSchema = z.object({
  legalName: z.string().min(1, { message: "성함을 입력해주세요" }),
  birthdate: z
    .string()
    .regex(/^\d{8}$/, { message: "생년월일을 YYYYMMDD 형식으로 입력해주세요" }),
  phoneNo: z
    .string()
    .regex(/^\d{10,11}$/, { message: "전화번호를 숫자만 입력해주세요" }),
  telecom: z.number(),
  startDate: z
    .string()
    .regex(/^\d{4}$/, { message: "연도를 YYYY 형식으로 입력해주세요" }),
  endDate: z
    .string()
    .regex(/^\d{4}$/, { message: "연도를 YYYY 형식으로 입력해주세요" }),
  inquiryType: z.number(),
  loginTypeLevel: z.number(),
});

export const step1Schema = checkupFormSchema.pick({
  legalName: true,
  birthdate: true,
  phoneNo: true,
});

export const step2Schema = checkupFormSchema.pick({
  telecom: true,
});

export const step3Schema = checkupFormSchema.pick({
  startDate: true,
  endDate: true,
});

export const step4Schema = checkupFormSchema.pick({
  inquiryType: true,
  loginTypeLevel: true,
});

export type Step1Schema = z.infer<typeof step1Schema>;
export type Step2Schema = z.infer<typeof step2Schema>;
export type Step3Schema = z.infer<typeof step3Schema>;
export type Step4Schema = z.infer<typeof step4Schema>;
export type CheckupFormSchema = z.infer<typeof checkupFormSchema>;

export const checkupFormDefaultValues = {
  legalName: "",
  birthdate: "",
  phoneNo: "",
  telecom: undefined,
  startDate: "",
  endDate: "",
  inquiryType: undefined,
  loginTypeLevel: undefined,
};
