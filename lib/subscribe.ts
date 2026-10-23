import { z } from "zod";

export const subscribeLimits = {
  name: 80,
  message: 2000,
} as const;

export function subscribeSchema(messages: {
  emailRequired: string;
  emailInvalid: string;
  nameLong: string;
  messageLong: string;
}) {
  return z.object({
    email: z
      .string()
      .trim()
      .min(1, messages.emailRequired)
      .pipe(z.email(messages.emailInvalid)),
    name: z.string().trim().max(subscribeLimits.name, messages.nameLong),
    message: z
      .string()
      .trim()
      .max(subscribeLimits.message, messages.messageLong),
  });
}

export type SubscribeInput = z.infer<ReturnType<typeof subscribeSchema>>;

export const serverSubscribeSchema = subscribeSchema({
  emailRequired: "Email is required.",
  emailInvalid: "Enter a valid email.",
  nameLong: "Name is too long.",
  messageLong: "Message is too long.",
});
