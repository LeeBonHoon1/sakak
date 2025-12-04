"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

import { type LoginState } from "@/features/auth/actions";
import { useAuthStore } from "@/features/auth/store/auth-store";

import { Button } from "@/components/ui/button";

export const LoginButton = ({ state }: { state: LoginState }) => {
  const { pending } = useFormStatus();
  const router = useRouter();
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (state?.success && !pending) {
      setUser({ name: state.data.name, email: state.data.email });
      router.push("/dashboard");
    }
  }, [state, pending, router, setUser]);

  return (
    <Button type="submit" disabled={pending} className="w-full">
      Login
    </Button>
  );
};
