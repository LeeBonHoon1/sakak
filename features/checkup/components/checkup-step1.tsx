"use client";

import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useCheckupForm } from "@/features/checkup/components/checkup-form-context";
import { useAuthStore } from "@/features/auth/store/auth-store";

export const CheckupStep1 = () => {
  const { form } = useCheckupForm();
  const { user } = useAuthStore();
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="legalName"
        defaultValue={user?.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>이름</FormLabel>
            <FormControl>
              <Input {...field} placeholder="이름을 입력해주세요." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="birthdate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>생년월일</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="YYYYMMDD (예: 19900101)"
                maxLength={8}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phoneNo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>전화번호</FormLabel>
            <FormControl>
              <Input {...field} placeholder="01012345678" type="tel" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
