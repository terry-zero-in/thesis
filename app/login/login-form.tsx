"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signInWithMagicLink, type LoginState } from "./actions";

const INITIAL_STATE: LoginState = { status: "idle" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    signInWithMagicLink,
    INITIAL_STATE,
  );

  if (state.status === "success") {
    return (
      <div className="text-center">
        <h2 className="text-[15px] font-medium text-[var(--color-text-1)]">
          Check your email
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-text-2)]">
          We sent a magic link to{" "}
          <span className="text-[var(--color-text-1)]">{state.email}</span>.
          Click it to sign in.
        </p>
      </div>
    );
  }

  const errorMessage = state.status === "error" ? state.message : null;

  return (
    <>
      <div className="space-y-1.5">
        <h2 className="text-[15px] font-medium text-[var(--color-text-1)]">
          Sign in
        </h2>
        <p className="text-[13px] leading-relaxed text-[var(--color-text-2)]">
          Enter your email and we&apos;ll send a magic link.
        </p>
      </div>

      <form action={formAction} className="mt-5 space-y-3">
        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-[12px] text-[var(--color-text-2)]"
          >
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            disabled={pending}
            placeholder="you@example.com"
            aria-invalid={errorMessage ? true : undefined}
            aria-describedby={errorMessage ? "login-error" : undefined}
          />
          {errorMessage ? (
            <p
              id="login-error"
              role="alert"
              className="text-[12px] text-[var(--color-danger)]"
            >
              {errorMessage}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="h-9 w-full text-[13px]"
        >
          {pending ? "Sending..." : "Send magic link"}
        </Button>
      </form>
    </>
  );
}
