import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "성함을 입력해주세요" }),
  email: z.string().email({ message: "이메일 형식에 맞지 않습니다." }),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
});

export type FormSchema = z.infer<typeof formSchema>;
