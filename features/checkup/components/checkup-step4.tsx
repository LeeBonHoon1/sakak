"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useCheckupForm } from "@/features/checkup/components/checkup-form-context";
import {
  INQUIRY_TYPE_OPTIONS,
  LOGIN_TYPE_OPTIONS,
} from "@/features/checkup/constants";

export const CheckupStep4 = () => {
  const { form } = useCheckupForm();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="inquiryType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>조회 구분</FormLabel>
            <FormControl>
              <div className="space-y-2">
                {INQUIRY_TYPE_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Checkbox
                      checked={field.value === option.value}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange(option.value);
                        }
                      }}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="loginTypeLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>간편인증 로그인 구분</FormLabel>
            <FormControl>
              <div className="space-y-2">
                {LOGIN_TYPE_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Checkbox
                      checked={field.value === option.value}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange(option.value);
                        }
                      }}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
