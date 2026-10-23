import { companyLinks, type Locale } from "@/lib/site";

export type Segment = { text: string; strong?: boolean; latin?: boolean };

export type SpecEntry = {
  id: string;
  live: boolean;
  status: string;
  role: string;
  org: string;
  meta: string;
  note: string;
  href: string;
  logo: string;
};

export type Dictionary = {
  meta: { title: string; description: string; ogTagline: string };
  skip: string;
  chrome: {
    docId: string;
    revLabel: string;
    rev: string;
    tehran: string;
    index: string;
    openIndex: string;
    closeIndex: string;
    search: string;
    searchLabel: string;
    empty: string;
    language: string;
  };
  sections: { id: string; index: string; label: string; rail: string }[];
  links: { email: string; linkedin: string };
  cover: {
    role: string;
    name: string;
    nameLines: [string, string];
    before: string;
    highlight: string;
    after: string;
    bio: Segment[];
    facts: { label: string; value: string }[];
  };
  changelog: {
    title: string;
    lede: string;
    entries: SpecEntry[];
  };
  metrics: {
    title: string;
    lede: string;
    outcomeLabel: string;
    sourceLabel: string;
    outcomes: { figure: string; caption: string; source: string }[];
    scaleLabel: string;
    stats: { value: string; label: string }[];
  };
  builds: {
    title: string;
    intro: Segment[];
    open: string;
    specimen: string;
    items: {
      day: string;
      name: string;
      description: string;
      href: string;
      preview: string;
      tags: string[];
    }[];
  };
  appendix: {
    title: string;
    lede: string;
    items: { name: string; detail: string; year: string }[];
  };
  contact: {
    title: string;
    lede: string;
    direct: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    sending: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
    emailRequired: string;
    emailInvalid: string;
    nameLong: string;
    messageLong: string;
  };
  footer: { role: string; rights: string; top: string };
  notFound: { title: string; body: string; home: string };
};

const en: Dictionary = {
  meta: {
    title: "Alisina Fakhraei — Product Manager",
    description:
      "Alisina Fakhraei is Product Manager & QA at Formaloo, a top-5 global form builder trusted by 30,000+ businesses, and Product & Design Lead at VaDostan. Partnership Manager at TEDxTehran. Public outcomes include 68% fewer weekly production bugs, 46% less first-week drop-off, and time-to-purchase from 7 to 3 minutes.",
    ogTagline: "Until the number moves, the work isn't done.",
  },
  skip: "Skip to content",
  chrome: {
    docId: "AF–SPEC",
    revLabel: "Rev",
    rev: "2026.10",
    tehran: "Tehran",
    index: "Index",
    openIndex: "Open the index",
    closeIndex: "Close the index",
    search: "Jump to a section",
    searchLabel: "Search the spec",
    empty: "Nothing in the spec matches.",
    language: "فارسی",
  },
  sections: [
    { id: "cover", index: "01", label: "Cover", rail: "Read me first" },
    { id: "changelog", index: "02", label: "Changelog", rail: "05 releases" },
    { id: "metrics", index: "03", label: "Metrics", rail: "08 figures" },
    { id: "builds", index: "04", label: "Builds", rail: "03 public" },
    { id: "appendix", index: "05", label: "Appendix", rail: "06 records" },
    { id: "contact", index: "06", label: "Contact", rail: "Write in" },
  ],
  links: { email: "Email", linkedin: "LinkedIn" },
  cover: {
    role: "Product Manager",
    name: "Alisina Fakhraei",
    nameLines: ["Alisina", "Fakhraei"],
    before: "Until the ",
    highlight: "number",
    after: " moves, the work isn't done.",
    bio: [
      { text: "Product Manager & QA at " },
      { text: "Formaloo", strong: true },
      {
        text: ", a top-5 global form builder trusted by 30,000+ businesses. Product & Design Lead at ",
      },
      { text: "VaDostan", strong: true },
      {
        text: ", a social commerce platform with 500K+ followers. Partnership Manager at ",
      },
      { text: "TEDxTehran", strong: true },
      {
        text: ", and co-organizer of the event from December 2024 to May 2025.",
      },
    ],
    facts: [
      { label: "Practice", value: "2+ years" },
      { label: "Formaloo", value: "Since May 2024" },
      { label: "VaDostan", value: "Since Jan 2025" },
    ],
  },
  changelog: {
    title: "Changelog",
    lede: "Five roles, written as releases. Four are live. One closed in May 2025.",
    entries: [
      {
        id: "2026.07",
        live: true,
        status: "Live",
        role: "Teaching Assistant, PM Bootcamp",
        org: "Diginext (Digikala)",
        meta: "Jul 2026 – Present · Weekend · Iran",
        note: "Teaching assistant for the product management bootcamp.",
        href: companyLinks.diginext,
        logo: "/images/diginext.png",
      },
      {
        id: "2025.01",
        live: true,
        status: "Live",
        role: "Product & Design Lead",
        org: "VaDostan",
        meta: "Jan 2025 – Present · Iran",
        note: "UX journey redesign.",
        href: companyLinks.vadostan,
        logo: "/images/vadostan.jpeg",
      },
      {
        id: "2024.12",
        live: false,
        status: "Closed",
        role: "Co-organizer",
        org: "TEDxTehran",
        meta: "Dec 2024 – May 2025 · Volunteer",
        note: "Co-organized the event. Closed May 2025.",
        href: companyLinks.tedx,
        logo: "/images/tedxtehran.png",
      },
      {
        id: "2024.05",
        live: true,
        status: "Live",
        role: "Product Manager & QA",
        org: "Formaloo",
        meta: "May 2024 – Present · Canada / England / Estonia",
        note: "QA and release tightening. Onboarding redesign.",
        href: companyLinks.formaloo,
        logo: "/images/formaloo.png",
      },
      {
        id: "2022.04",
        live: true,
        status: "Live",
        role: "Partnership Manager",
        org: "TEDxTehran",
        meta: "Apr 2022 – Present · Volunteer",
        note: "Partner outreach.",
        href: companyLinks.tedx,
        logo: "/images/tedxtehran.png",
      },
    ],
  },
  metrics: {
    title: "Metrics",
    lede: "Four outcomes with a source. Four figures for scale. That is the whole dashboard.",
    outcomeLabel: "Outcome",
    sourceLabel: "Source",
    outcomes: [
      {
        figure: "68%",
        caption: "Fewer weekly production bugs",
        source: "Formaloo · QA & release tightening",
      },
      {
        figure: "46%",
        caption: "Less first-week drop-off",
        source: "Formaloo · Onboarding redesign",
      },
      {
        figure: "7 → 3 min",
        caption: "Time to purchase",
        source: "VaDostan · UX journey redesign",
      },
      {
        figure: "$10,000+",
        caption: "Sponsorship secured",
        source: "TEDxTehran · Partner outreach",
      },
    ],
    scaleLabel: "Scale",
    stats: [
      { value: "30K+", label: "Businesses on Formaloo" },
      { value: "500K+", label: "VaDostan social followers" },
      { value: "1M+", label: "TEDxTehran social views" },
      { value: "87%", label: "Customer satisfaction lift" },
    ],
  },
  builds: {
    title: "Builds",
    intro: [
      { text: "I build and ship a new AI app every day with " },
      { text: "Claude Code", strong: true, latin: true },
      { text: ". Three of them are public here." },
    ],
    open: "Open",
    specimen: "Specimen",
    items: [
      {
        day: "Day 01",
        name: "Tasks",
        description:
          "A shared list for the work in front of you. Track tasks, hand the list to someone else, and finish it together. Built with Claude Code and Supabase.",
        href: companyLinks.tasks,
        preview: "3 of 7 done",
        tags: ["Claude Code", "Supabase"],
      },
      {
        day: "Day 02",
        name: "Price of That",
        description:
          "Stop pricing things in money alone. It turns a price into hours of your life, from your salary, so you can tell whether it is actually worth the time.",
        href: companyLinks.priceOfThat,
        preview: "12.4 hrs",
        tags: ["Claude Code"],
      },
      {
        day: "Day 03",
        name: "Lapse",
        description:
          "Every subscription, contract, and license the business runs on, in one place — so nothing quietly auto-renews at a higher rate, or disappears while you are looking elsewhere.",
        href: companyLinks.lapse,
        preview: "$1,240 / mo",
        tags: ["Claude Code"],
      },
    ],
  },
  appendix: {
    title: "Appendix",
    lede: "The training on record. Degrees, bootcamps, and the certificates behind the practice.",
    items: [
      {
        name: "Sharif University of Technology",
        detail: "BSc Industrial Engineering",
        year: "BSc",
      },
      {
        name: "Diginext (Digikala)",
        detail: "Product Management Bootcamp",
        year: "2026",
      },
      {
        name: "Amanj — UX Writing Bootcamp",
        detail: "By Aylar Razaghi, ex-Digikala",
        year: "2026",
      },
      {
        name: "IBM",
        detail: "Product Manager Professional Certificate",
        year: "2025",
      },
      {
        name: "Product School",
        detail: "PLG · PAC · PRC · PSC · PRLC",
        year: "2023–25",
      },
      {
        name: "Scrum Alliance",
        detail: "Scrum Foundations",
        year: "2022",
      },
    ],
  },
  contact: {
    title: "Send the problem.",
    lede: "If it is a product problem, send the specific version. An email is enough. A name and a note are optional — or write directly.",
    direct: "Or write directly",
    name: "Name, optional",
    email: "Email",
    message: "Note, optional",
    submit: "Send",
    sending: "Sending",
    successTitle: "Got it.",
    successBody: "Thanks. The address is what I needed.",
    errorTitle: "It didn’t send.",
    errorBody: "Try once more, or use the email address above.",
    emailRequired: "Enter your email.",
    emailInvalid: "Enter a valid email.",
    nameLong: "That name is too long.",
    messageLong: "That note is too long.",
  },
  footer: {
    role: "Product Manager & QA",
    rights: "© 2026",
    top: "Top",
  },
  notFound: {
    title: "This page is not in the spec.",
    body: "That address doesn’t match a section.",
    home: "Back to the spec",
  },
};

const fa: Dictionary = {
  meta: {
    title: "علیسینا فخرایی — مدیر محصول",
    description:
      "علیسینا فخرایی مدیر محصول و تضمین کیفیت در فرمالو است؛ یکی از پنج فرم‌ساز برتر جهان که بیش از ۳۰٬۰۰۰ کسب‌وکار به آن اعتماد دارند. لید محصول و طراحی وادوستان، و مدیر مشارکت تدکس تهران. نتیجه‌های عمومی: ۶۸٪ باگ کمتر در پروداکشن هر هفته، ۴۶٪ ریزش کمتر در هفتهٔ اول، و زمان خرید از ۷ به ۳ دقیقه.",
    ogTagline: "کار وقتی تمام است که عدد عوض شده باشد.",
  },
  skip: "رفتن به محتوا",
  chrome: {
    docId: "AF–SPEC",
    revLabel: "نسخه",
    rev: "۲۰۲۶٫۱۰",
    tehran: "تهران",
    index: "فهرست",
    openIndex: "باز کردن فهرست",
    closeIndex: "بستن فهرست",
    search: "برو به یک بخش",
    searchLabel: "جستجو در سند",
    empty: "در سند چیزی با این عبارت نیست.",
    language: "English",
  },
  sections: [
    { id: "cover", index: "۰۱", label: "جلد", rail: "اول این را بخوان" },
    { id: "changelog", index: "۰۲", label: "تغییرات", rail: "۰۵ انتشار" },
    { id: "metrics", index: "۰۳", label: "سنجه‌ها", rail: "۰۸ رقم" },
    { id: "builds", index: "۰۴", label: "ساخته‌ها", rail: "۰۳ عمومی" },
    { id: "appendix", index: "۰۵", label: "پیوست", rail: "۰۶ رکورد" },
    { id: "contact", index: "۰۶", label: "تماس", rail: "بنویس" },
  ],
  links: { email: "ایمیل", linkedin: "لینکدین" },
  cover: {
    role: "مدیر محصول",
    name: "علیسینا فخرایی",
    nameLines: ["علیسینا", "فخرایی"],
    before: "کار وقتی تمام است که ",
    highlight: "عدد",
    after: " عوض شده باشد.",
    bio: [
      { text: "مدیر محصول و تضمین کیفیت در " },
      { text: "فرمالو", strong: true },
      {
        text: "، یکی از پنج فرم‌ساز برتر جهان که بیش از ۳۰٬۰۰۰ کسب‌وکار به آن اعتماد دارند. لید محصول و طراحی در ",
      },
      { text: "وادوستان", strong: true },
      {
        text: "، پلتفرم تجارت اجتماعی با بیش از ۵۰۰ هزار دنبال‌کننده. مدیر مشارکت ",
      },
      { text: "تدکس تهران", strong: true },
      { text: "، و هم‌برگزارکنندهٔ رویداد از دسامبر ۲۰۲۴ تا مه ۲۰۲۵." },
    ],
    facts: [
      { label: "سابقه", value: "بیش از ۲ سال" },
      { label: "فرمالو", value: "از مه ۲۰۲۴" },
      { label: "وادوستان", value: "از ژانویه ۲۰۲۵" },
    ],
  },
  changelog: {
    title: "تغییرات",
    lede: "پنج نقش، به شکل انتشار. چهارتا جاری است. یکی در مه ۲۰۲۵ بسته شد.",
    entries: [
      {
        id: "۲۰۲۶٫۰۷",
        live: true,
        status: "جاری",
        role: "دستیار آموزشی، بوت‌کمپ مدیریت محصول",
        org: "دیجی‌نکست (دیجی‌کالا)",
        meta: "ژوئیه ۲۰۲۶ – اکنون · آخر هفته · ایران",
        note: "دستیار آموزشی بوت‌کمپ مدیریت محصول.",
        href: companyLinks.diginext,
        logo: "/images/diginext.png",
      },
      {
        id: "۲۰۲۵٫۰۱",
        live: true,
        status: "جاری",
        role: "لید محصول و طراحی",
        org: "وادوستان",
        meta: "ژانویه ۲۰۲۵ – اکنون · ایران",
        note: "بازطراحی مسیر تجربهٔ کاربری.",
        href: companyLinks.vadostan,
        logo: "/images/vadostan.jpeg",
      },
      {
        id: "۲۰۲۴٫۱۲",
        live: false,
        status: "بسته",
        role: "هم‌برگزارکننده",
        org: "تدکس تهران",
        meta: "دسامبر ۲۰۲۴ – مه ۲۰۲۵ · داوطلبانه",
        note: "هم‌برگزاری رویداد. در مه ۲۰۲۵ بسته شد.",
        href: companyLinks.tedx,
        logo: "/images/tedxtehran.png",
      },
      {
        id: "۲۰۲۴٫۰۵",
        live: true,
        status: "جاری",
        role: "مدیر محصول و تضمین کیفیت",
        org: "فرمالو",
        meta: "مه ۲۰۲۴ – اکنون · کانادا / انگلستان / استونی",
        note: "سخت‌گیری روی کیفیت و انتشار. بازطراحی آنبوردینگ.",
        href: companyLinks.formaloo,
        logo: "/images/formaloo.png",
      },
      {
        id: "۲۰۲۲٫۰۴",
        live: true,
        status: "جاری",
        role: "مدیر مشارکت",
        org: "تدکس تهران",
        meta: "آوریل ۲۰۲۲ – اکنون · داوطلبانه",
        note: "ارتباط با شرکا.",
        href: companyLinks.tedx,
        logo: "/images/tedxtehran.png",
      },
    ],
  },
  metrics: {
    title: "سنجه‌ها",
    lede: "چهار نتیجه که منبع دارند. چهار رقم برای مقیاس. تمام داشبورد همین است.",
    outcomeLabel: "نتیجه",
    sourceLabel: "منبع",
    outcomes: [
      {
        figure: "۶۸٪",
        caption: "باگ کمتر در پروداکشن، هر هفته",
        source: "فرمالو · سخت‌گیری روی کیفیت و انتشار",
      },
      {
        figure: "۴۶٪",
        caption: "ریزش کمتر در هفتهٔ اول",
        source: "فرمالو · بازطراحی آنبوردینگ",
      },
      {
        figure: "۷ به ۳ دقیقه",
        caption: "زمان تا خرید",
        source: "وادوستان · بازطراحی مسیر تجربهٔ کاربری",
      },
      {
        figure: "+۱۰٬۰۰۰ دلار",
        caption: "اسپانسر جذب‌شده",
        source: "تدکس تهران · ارتباط با شرکا",
      },
    ],
    scaleLabel: "مقیاس",
    stats: [
      { value: "+۳۰هزار", label: "کسب‌وکارِ فرمالو" },
      { value: "+۵۰۰هزار", label: "دنبال‌کنندهٔ وادوستان" },
      { value: "+۱میلیون", label: "بازدید تدکس تهران" },
      { value: "۸۷٪", label: "افزایش رضایت مشتری" },
    ],
  },
  builds: {
    title: "ساخته‌ها",
    intro: [
      { text: "هر روز با " },
      { text: "Claude Code", strong: true, latin: true },
      { text: " یک اپ هوش مصنوعی تازه می‌سازم و منتشر می‌کنم. سه تا از آن‌ها این‌جا عمومی است." },
    ],
    open: "باز کردن",
    specimen: "نمونهٔ صفحه",
    items: [
      {
        day: "روز ۰۱",
        name: "Tasks",
        description:
          "فهرستی مشترک برای کاری که جلوی دستت است. کارها را پیگیری کن، فهرست را به کس دیگری بسپار، و با هم تمامش کنید. ساخته‌شده با Claude Code و Supabase.",
        href: companyLinks.tasks,
        preview: "۳ از ۷ انجام‌شده",
        tags: ["Claude Code", "Supabase"],
      },
      {
        day: "روز ۰۲",
        name: "Price of That",
        description:
          "قیمت را فقط با پول نسنج. هر قیمتی را، بر اساس حقوق تو، به ساعتی از زندگی‌ات تبدیل می‌کند تا معلوم شود واقعاً آن وقت را می‌ارزد یا نه.",
        href: companyLinks.priceOfThat,
        preview: "۱۲٫۴ ساعت",
        tags: ["Claude Code"],
      },
      {
        day: "روز ۰۳",
        name: "Lapse",
        description:
          "هر اشتراک، قرارداد و مجوزی که کسب‌وکار روی آن می‌چرخد، یک‌جا. تا چیزی بی‌سروصدا با نرخ بالاتر تمدید نشود، یا وقتی جای دیگری را نگاه می‌کنی غیبش بزند.",
        href: companyLinks.lapse,
        preview: "۱٬۲۴۰ دلار در ماه",
        tags: ["Claude Code"],
      },
    ],
  },
  appendix: {
    title: "پیوست",
    lede: "آموزشی که ثبت شده. مدرک، بوت‌کمپ، و گواهینامه‌هایی که پشت این کارند.",
    items: [
      {
        name: "دانشگاه صنعتی شریف",
        detail: "کارشناسی مهندسی صنایع",
        year: "کارشناسی",
      },
      {
        name: "دیجی‌نکست (دیجی‌کالا)",
        detail: "بوت‌کمپ مدیریت محصول",
        year: "۲۰۲۶",
      },
      {
        name: "آمانج — بوت‌کمپ نویسندگی تجربهٔ کاربری",
        detail: "با آیلار رزاقی، سابق دیجی‌کالا",
        year: "۲۰۲۶",
      },
      {
        name: "آی‌بی‌ام",
        detail: "گواهینامهٔ حرفه‌ای مدیریت محصول",
        year: "۲۰۲۵",
      },
      {
        name: "پروداکت اسکول",
        detail: "PLG · PAC · PRC · PSC · PRLC",
        year: "۲۰۲۳–۲۵",
      },
      {
        name: "اسکرام الاینس",
        detail: "مبانی اسکرام",
        year: "۲۰۲۲",
      },
    ],
  },
  contact: {
    title: "مسئله را بفرست.",
    lede: "اگر مسئلهٔ محصول است، نسخهٔ دقیق‌اش را بفرست. ایمیل کافی است. نام و یادداشت اختیاری‌اند. یا مستقیم بنویس.",
    direct: "یا مستقیم بنویس",
    name: "نام، اختیاری",
    email: "ایمیل",
    message: "یادداشت، اختیاری",
    submit: "بفرست",
    sending: "در حال فرستادن",
    successTitle: "رسید.",
    successBody: "ممنون. آدرس همان چیزی بود که لازم داشتم.",
    errorTitle: "نرفت.",
    errorBody: "یک بار دیگر امتحان کن، یا از ایمیل بالا استفاده کن.",
    emailRequired: "ایمیل را وارد کن.",
    emailInvalid: "یک ایمیل معتبر وارد کن.",
    nameLong: "نام خیلی طولانی است.",
    messageLong: "یادداشت خیلی طولانی است.",
  },
  footer: {
    role: "مدیر محصول و تضمین کیفیت",
    rights: "© ۲۰۲۶",
    top: "بالا",
  },
  notFound: {
    title: "این صفحه در سند نیست.",
    body: "این نشانی به بخشی از سند نمی‌خورد.",
    home: "بازگشت به سند",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, fa };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
