"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/lib/content";
import { localizeDigits } from "@/lib/digits";
import { subscribeSchema, type SubscribeInput } from "@/lib/subscribe";
import type { Locale } from "@/lib/site";

const fieldClass =
  "h-12 rounded-none border-0 border-b border-black/25 bg-transparent px-0 shadow-none focus-visible:border-black focus-visible:ring-0";

export function ContactForm({
  locale,
  copy,
}: {
  locale: Locale;
  copy: Dictionary["contact"];
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
      <Alert className="rounded-none border-black/20 bg-white px-4 py-5">
        <AlertTitle className="text-lg">{copy.successTitle}</AlertTitle>
        <AlertDescription>{copy.successBody}</AlertDescription>
      </Alert>
    );
  }

  const rows: {
    index: string;
    name: keyof SubscribeInput;
    label: string;
    error?: { message?: string };
    control: React.ReactNode;
  }[] = [
    {
      index: "01",
      name: "email",
      label: copy.email,
      error: errors.email,
      control: (
        <Input
          id="subscribe-email"
          type="email"
          dir="ltr"
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          aria-invalid={errors.email ? true : undefined}
          disabled={pending}
          className={fieldClass}
          {...register("email")}
        />
      ),
    },
    {
      index: "02",
      name: "name",
      label: copy.name,
      error: errors.name,
      control: (
        <Input
          id="subscribe-name"
          type="text"
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          disabled={pending}
          className={fieldClass}
          {...register("name")}
        />
      ),
    },
    {
      index: "03",
      name: "message",
      label: copy.message,
      error: errors.message,
      control: (
        <Textarea
          id="subscribe-message"
          rows={4}
          aria-invalid={errors.message ? true : undefined}
          disabled={pending}
          className={`${fieldClass} min-h-28 py-3 md:text-base`}
          {...register("message")}
        />
      ),
    },
  ];

  return (
    <form className="border-t border-black/15" onSubmit={handleSubmit(onSubmit)} noValidate>
      {rows.map((row) => (
        <Field
          key={row.name}
          className="gap-2 border-b border-black/15 py-4"
          data-invalid={row.error ? true : undefined}
          data-disabled={pending || undefined}
        >
          <div className="flex items-baseline justify-between gap-3">
            <FieldLabel htmlFor={`subscribe-${row.name}`} className="meta-label text-black/55">
              {row.label}
            </FieldLabel>
            <span className="text-xs tabular-nums text-black/35">
              {localizeDigits(row.index, locale)}
            </span>
          </div>
          {row.control}
          <FieldError errors={row.error ? [row.error] : undefined} />
        </Field>
      ))}

      {status === "error" ? (
        <Alert variant="destructive" className="mt-4 rounded-none border-destructive/30 bg-white">
          <AlertTitle>{copy.errorTitle}</AlertTitle>
          <AlertDescription>{copy.errorBody}</AlertDescription>
        </Alert>
      ) : null}

      <Button type="submit" size="lg" className="mt-6 h-12 w-full rounded-none" disabled={pending}>
        {pending ? <Spinner data-icon="inline-start" aria-label={copy.sending} /> : null}
        {pending ? copy.sending : copy.submit}
      </Button>
    </form>
  );
}
