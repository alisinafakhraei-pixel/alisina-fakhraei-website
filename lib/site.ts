export const SITE_URL = "https://www.alisinafakhraei.site";

export const EMAIL = "alisina.fakhraei@gmail.com";
export const MAILTO = `mailto:${EMAIL}`;
export const LINKEDIN = "https://www.linkedin.com/in/alisina-fakhraei";

export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "fa";
}

export function localeHome(locale: Locale) {
  return locale === "en" ? "/" : "/fa";
}

export function localeHash(locale: Locale, id: string) {
  return `${localeHome(locale)}#${id}`;
}

export const companyLinks = {
  formaloo: "https://www.formaloo.com/",
  vadostan: "https://vadoostan.ir/",
  diginext: "https://diginext.ir/",
  tedx: "https://tedxtehran.com/fa/",
  tasks: "https://alisinafakhraei.site/tasks/",
  priceOfThat: "https://alisinafakhraei.site/price-of-that.html",
  lapse: "https://alisinafakhraei.site/lapse.html",
} as const;
