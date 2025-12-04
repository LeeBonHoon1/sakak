"use client";

import { TELECOM_OPTIONS } from "@/features/checkup/constants";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useCheckupForm } from "@/features/checkup/components/checkup-form-context";

export const CheckupStep2 = () => {
  const { form } = useCheckupForm();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="telecom"
        render={({ field }) => (
          <FormItem>
            <FormLabel>통신사 선택</FormLabel>
            <FormControl>
              <div className="space-y-2">
                {TELECOM_OPTIONS.map((option) => (
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
