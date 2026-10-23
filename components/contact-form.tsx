"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/lib/content";
import { subscribeSchema, type SubscribeInput } from "@/lib/subscribe";
import type { Locale } from "@/lib/site";

export function ContactForm({
  locale,
  copy,
}: {
  locale: Locale;
  copy: Dictionary["contact"];
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const schema = subscribeSchema(copy);
  const resolver: Resolver<SubscribeInput> = async (values) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !errors[key]) {
        errors[key] = { type: issue.code, message: issue.message };
      }
    }

    return { values: {}, errors };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscribeInput>({
    defaultValues: { email: "", name: "", message: "" },
    resolver,
  });

  const pending = status === "loading";

  async function onSubmit(values: SubscribeInput) {
    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Alert>
        <AlertTitle>{copy.successTitle}</AlertTitle>
        <AlertDescription>{copy.successBody}</AlertDescription>
      </Alert>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Field data-invalid={errors.email ? true : undefined} data-disabled={pending || undefined}>
          <FieldLabel htmlFor="subscribe-email">{copy.email}</FieldLabel>
          <Input
            id="subscribe-email"
            type="email"
            dir="ltr"
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            aria-invalid={errors.email ? true : undefined}
            disabled={pending}
            {...register("email")}
          />
          <FieldError errors={errors.email ? [errors.email] : undefined} />
        </Field>
        <Field data-invalid={errors.name ? true : undefined} data-disabled={pending || undefined}>
          <FieldLabel htmlFor="subscribe-name">{copy.name}</FieldLabel>
          <Input
            id="subscribe-name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            disabled={pending}
            {...register("name")}
          />
          <FieldError errors={errors.name ? [errors.name] : undefined} />
        </Field>
        <Field
          data-invalid={errors.message ? true : undefined}
          data-disabled={pending || undefined}
        >
          <FieldLabel htmlFor="subscribe-message">{copy.message}</FieldLabel>
          <Textarea
            id="subscribe-message"
            rows={4}
            className="min-h-28"
            aria-invalid={errors.message ? true : undefined}
            disabled={pending}
            {...register("message")}
          />
          <FieldError errors={errors.message ? [errors.message] : undefined} />
        </Field>
      </FieldGroup>

      {status === "error" ? (
        <Alert variant="destructive">
          <AlertTitle>{copy.errorTitle}</AlertTitle>
          <AlertDescription>{copy.errorBody}</AlertDescription>
        </Alert>
      ) : null}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? <Spinner data-icon="inline-start" aria-label={copy.sending} /> : null}
        {pending ? copy.sending : copy.submit}
      </Button>
    </form>
  );
}
