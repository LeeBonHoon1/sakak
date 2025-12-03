"use client";

import { Input } from "@/components/ui/input";

export const LoginInput = ({
  name,
  type,
  placeholder,
  error,
}: {
  name: string;
  type: string;
  placeholder: string;
  error?: string[];
}) => {
  return (
    <div className="space-y-1">
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={error ? "border-destructive" : ""}
      />
      {error && error.length > 0 && (
        <p className="text-sm text-destructive">{error[0]}</p>
      )}
    </div>
  );
};
