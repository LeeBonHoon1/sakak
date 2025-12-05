"use server";

import { formSchema } from "@/features/auth/schema";

export type LoginState =
  | { success: false; error: Record<string, string[] | undefined> }
  | { success: true; data: { name: string; email: string; password: string } }
  | null;

export const login = async (
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> => {
  const validatedFields = formSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  return { success: true, data: validatedFields.data };
};
