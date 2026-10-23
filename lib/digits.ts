import type { Locale } from "@/lib/site";

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function localizeDigits(value: string, locale: Locale) {
  if (locale !== "fa") return value;
  return value.replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit);
}
