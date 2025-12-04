"use client";

import { useActionState } from "react";

import { login, type LoginState } from "@/features/auth/actions";

import { LoginInput } from "@/features/auth/components/login-input";
import { LoginButton } from "@/features/auth/components/login-button";

export const LoginForm = () => {
  const [state, formAction] = useActionState<LoginState, FormData>(login, null);

  const errors = state && !state.success ? state.error : undefined;

  return (
    <div className="m-auto max-w-md h-screen flex items-center">
      <form action={formAction} className="space-y-5 w-full">
        <LoginInput
          name="name"
          type="text"
          placeholder="Name"
          error={errors?.name}
        />

        <LoginInput
          name="email"
          type="email"
          placeholder="Email"
          error={errors?.email}
        />

        <LoginInput
          name="password"
          type="password"
          placeholder="Password"
          error={errors?.password}
        />
        <LoginButton state={state} />
      </form>
    </div>
  );
};
