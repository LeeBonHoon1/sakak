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

export const CheckupStep3 = () => {
  const { form } = useCheckupForm();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>조회 시작 연도</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="YYYY (예: 2023)"
                maxLength={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="endDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>조회 종료 연도</FormLabel>
            <FormControl>
              <Input {...field} placeholder="YYYY (예: 2024)" maxLength={4} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

