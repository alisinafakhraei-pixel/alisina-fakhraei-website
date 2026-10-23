import { companyLinks, type Locale } from "@/lib/site";

type Segment = { text: string; strong?: boolean };

export type Dictionary = {
  meta: { title: string; description: string; ogTagline: string };
  skip: string;
  nav: {
    home: string;
    experience: string;
    impact: string;
    projects: string;
    education: string;
    contact: string;
    email: string;
    linkedin: string;
    menu: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    hello: string;
    name: string;
    nameLines: [string, string];
    before: string;
    highlight: string;
    after: string;
    bio: Segment[];
    yearsValue: string;
    yearsLabel: string;
    since: string;
    sinceLabel: string;
    statValue: string;
    statLabel: string;
    role: string;
    next: string;
  };
  experience: {
    kicker: string;
    title: string;
    count: string;
    roles: {
      role: string;
      org: string;
      meta: string;
      href: string;
      logo: string;
      mark: string;
    }[];
  };
  impact: {
    kicker: string;
    title: string;
    count: string;
    items: { mark: string; figure: string; caption: string; detail: string }[];
    stats: { value: string; label: string }[];
  };
  projects: {
    kicker: string;
    title: string;
    count: string;
    intro: Segment[];
    swipe: string;
    items: {
      day: string;
      name: string;
      description: string;
      href: string;
      preview: string;
      tags: string[];
    }[];
  };
  education: {
    kicker: string;
    title: string;
    count: string;
    items: { name: string; detail: string; year: string }[];
  };
  contact: {
    kicker: string;
    line1: string;
    before: string;
    highlight: string;
    intro: string;
    formTitle: string;
    formHint: string;
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
  footer: { role: string; rights: string; backToTop: string };
  notFound: { title: string; body: string; home: string };
};

const en: Dictionary = {
  meta: {
    title: "Alisina Fakhraei — Product Manager",
    description:
      "Alisina Fakhraei is a product manager at Formaloo, a top-5 global form builder trusted by 30,000+ businesses. He also leads product at VaDostan and partners with TEDxTehran.",
    ogTagline: "I build products people actually love to use.",
  },
  skip: "Skip to content",
  nav: {
    home: "Home",
    experience: "Experience",
    impact: "Impact",
    projects: "AI Projects",
    education: "Education",
    contact: "Contact",
    email: "Email me",
    linkedin: "LinkedIn",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    hello: "Hello! I'm",
    name: "Alisina Fakhraei",
    nameLines: ["Alisina", "Fakhraei"],
    before: "I build products people actually ",
    highlight: "love",
    after: " to use.",
    bio: [
      { text: "Product Manager at " },
      { text: "Formaloo", strong: true },
      {
        text: ", a top-5 global form builder trusted by 30,000+ businesses. I also lead product at ",
      },
      { text: "VaDostan", strong: true },
      {
        text: ", a social commerce platform with 500K+ followers, and contribute to ",
      },
      { text: "TEDxTehran", strong: true },
      { text: " as a Partnership Manager and event co-organizer." },
    ],
    yearsValue: "2+",
    yearsLabel: "years building products",
    since: "May 2024",
    sinceLabel: "Formaloo",
    statValue: "30K+",
    statLabel: "businesses on Formaloo",
    role: "Product Manager",
    next: "Next",
  },
  experience: {
    kicker: "Track record",
    title: "Experience & impact",
    count: "05",
    roles: [
      {
        role: "Product Manager & QA",
        org: "Formaloo",
        meta: "May 2024 – Present · Canada / England / Estonia",
        href: companyLinks.formaloo,
        logo: "/images/formaloo.png",
        mark: "F",
      },
      {
        role: "Product & Design Lead",
        org: "VaDostan",
        meta: "Jan 2025 – Present · Iran",
        href: companyLinks.vadostan,
        logo: "/images/vadostan.jpeg",
        mark: "V",
      },
      {
        role: "Teaching Assistant, PM Bootcamp",
        org: "Diginext (Digikala)",
        meta: "Jul 2026 – Present · Weekend · Iran",
        href: companyLinks.diginext,
        logo: "/images/diginext.png",
        mark: "D",
      },
      {
        role: "Partnership Manager",
        org: "TEDxTehran",
        meta: "Apr 2022 – Present · Volunteer",
        href: companyLinks.tedx,
        logo: "/images/tedxtehran.png",
        mark: "T",
      },
      {
        role: "Co-organizer",
        org: "TEDxTehran",
        meta: "Dec 2024 – May 2025 · Volunteer",
        href: companyLinks.tedx,
        logo: "/images/tedxtehran.png",
        mark: "T",
      },
    ],
  },
  impact: {
    kicker: "Outcomes",
    title: "Impact highlights",
    count: "04",
    items: [
      {
        mark: "↓",
        figure: "68%",
        caption: "fewer weekly production bugs",
        detail: "Formaloo · QA & release tightening",
      },
      {
        mark: "↓",
        figure: "46%",
        caption: "less first-week drop-off",
        detail: "Formaloo · Onboarding redesign",
      },
      {
        mark: "→",
        figure: "7 → 3 min",
        caption: "time-to-purchase",
        detail: "VaDostan · UX journey redesign",
      },
      {
        mark: "$",
        figure: "$10,000+",
        caption: "sponsorship secured",
        detail: "TEDxTehran · Partner outreach",
      },
    ],
    stats: [
      { value: "30K+", label: "Businesses using Formaloo" },
      { value: "500K+", label: "VaDostan social followers" },
      { value: "1M+", label: "TEDxTehran social views" },
      { value: "87%", label: "Customer satisfaction lift" },
    ],
  },
  projects: {
    kicker: "Daily builds",
    title: "One AI app. Every day.",
    count: "∞",
    intro: [
      { text: "I build and ship a new AI app daily using " },
      { text: "Claude Code", strong: true },
      { text: ". See them all below." },
    ],
    swipe: "Swipe to explore the daily builds",
    items: [
      {
        day: "Day 01",
        name: "Tasks",
        description:
          "Keep track of your tasks, share lists, and collaborate with others. Built using Claude Code and Supabase.",
        href: companyLinks.tasks,
        preview: "3 of 7 done",
        tags: ["Claude Code", "Supabase"],
      },
      {
        day: "Day 02",
        name: "Price of That",
        description:
          "Stop thinking in dollars. Price of That turns any price into hours of your life based on your salary, so you can decide if something is truly worth it.",
        href: companyLinks.priceOfThat,
        preview: "12.4 hrs",
        tags: ["Claude Code"],
      },
      {
        day: "Day 03",
        name: "Lapse",
        description:
          "Tracks every subscription, contract, and license your business runs on — so nothing quietly auto-renews at a higher rate or disappears when you weren't looking.",
        href: companyLinks.lapse,
        preview: "$1,240 / mo",
        tags: ["Claude Code"],
      },
    ],
  },
  education: {
    kicker: "Learning",
    title: "Education & certifications",
    count: "06",
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
    kicker: "Let's talk",
    line1: "Have an idea?",
    before: "Let's make it ",
    highlight: "real.",
    intro:
      "Leave your email, and a name or note if you want. Or write directly.",
    formTitle: "Leave your email",
    formHint: "Name and message are optional.",
    name: "Name (optional)",
    email: "Email",
    message: "Message (optional)",
    submit: "Send",
    sending: "Sending",
    successTitle: "Got it.",
    successBody: "Thanks for leaving your email.",
    errorTitle: "That didn’t send.",
    errorBody: "Try again, or email directly.",
    emailRequired: "Enter your email.",
    emailInvalid: "Enter a valid email.",
    nameLong: "That name is too long.",
    messageLong: "That message is too long.",
  },
  footer: {
    role: "Product Manager & QA",
    rights: "© 2026",
    backToTop: "Back to top",
  },
  notFound: {
    title: "Page not found",
    body: "That page isn’t here.",
    home: "Back home",
  },
};

const fa: Dictionary = {
  meta: {
    title: "علیسینا فخرایی — مدیر محصول",
    description:
      "علیسینا فخرایی مدیر محصول در فرمالو است؛ یکی از پنج فرم‌ساز برتر جهان که بیش از ۳۰٬۰۰۰ کسب‌وکار به آن اعتماد دارند. او رهبری محصول وادوستان را هم بر عهده دارد و با تدکس تهران همکاری می‌کند.",
    ogTagline: "محصولاتی می‌سازم که مردم واقعاً عاشق استفاده از آن‌ها هستند.",
  },
  skip: "رفتن به محتوا",
  nav: {
    home: "خانه",
    experience: "تجربه",
    impact: "اثرگذاری",
    projects: "پروژه‌های هوش مصنوعی",
    education: "تحصیلات",
    contact: "تماس",
    email: "ایمیل بزنید",
    linkedin: "لینکدین",
    menu: "منو",
    openMenu: "باز کردن منو",
    closeMenu: "بستن منو",
  },
  hero: {
    hello: "سلام، من",
    name: "علیسینا فخرایی",
    nameLines: ["علیسینا", "فخرایی"],
    before: "محصولاتی می‌سازم که مردم واقعاً ",
    highlight: "عاشق",
    after: " استفاده از آن‌ها هستند.",
    bio: [
      { text: "مدیر محصول در " },
      { text: "فرمالو", strong: true },
      {
        text: " هستم؛ یکی از پنج فرم‌ساز برتر جهان که بیش از ۳۰٬۰۰۰ کسب‌وکار به آن اعتماد دارند. رهبری محصول ",
      },
      { text: "وادوستان", strong: true },
      {
        text: " را هم بر عهده دارم، پلتفرم تجارت اجتماعی با بیش از ۵۰۰ هزار دنبال‌کننده، و در ",
      },
      { text: "تدکس تهران", strong: true },
      {
        text: " به‌عنوان مدیر مشارکت و هم‌برگزارکنندهٔ رویداد همکاری می‌کنم.",
      },
    ],
    yearsValue: "۲+",
    yearsLabel: "سال ساخت محصول",
    since: "مه ۲۰۲۴",
    sinceLabel: "فرمالو",
    statValue: "۳۰هزار+",
    statLabel: "کسب‌وکار در فرمالو",
    role: "مدیر محصول",
    next: "بعدی",
  },
  experience: {
    kicker: "کارنامه",
    title: "تجربه و اثرگذاری",
    count: "۰۵",
    roles: [
      {
        role: "مدیر محصول و تضمین کیفیت",
        org: "فرمالو",
        meta: "مه ۲۰۲۴ – اکنون · کانادا / انگلستان / استونی",
        href: companyLinks.formaloo,
        logo: "/images/formaloo.png",
        mark: "ف",
      },
      {
        role: "لید محصول و طراحی",
        org: "وادوستان",
        meta: "ژانویه ۲۰۲۵ – اکنون · ایران",
        href: companyLinks.vadostan,
        logo: "/images/vadostan.jpeg",
        mark: "و",
      },
      {
        role: "دستیار آموزشی، بوت‌کمپ مدیریت محصول",
        org: "دیجی‌نکست (دیجی‌کالا)",
        meta: "ژوئیه ۲۰۲۶ – اکنون · آخر هفته · ایران",
        href: companyLinks.diginext,
        logo: "/images/diginext.png",
        mark: "د",
      },
      {
        role: "مدیر مشارکت",
        org: "تدکس تهران",
        meta: "آوریل ۲۰۲۲ – اکنون · داوطلبانه",
        href: companyLinks.tedx,
        logo: "/images/tedxtehran.png",
        mark: "ت",
      },
      {
        role: "هم‌برگزارکننده",
        org: "تدکس تهران",
        meta: "دسامبر ۲۰۲۴ – مه ۲۰۲۵ · داوطلبانه",
        href: companyLinks.tedx,
        logo: "/images/tedxtehran.png",
        mark: "ت",
      },
    ],
  },
  impact: {
    kicker: "نتیجه‌ها",
    title: "شاخص‌های اثرگذاری",
    count: "۰۴",
    items: [
      {
        mark: "↓",
        figure: "۶۸٪",
        caption: "باگ کمتر در پروداکشن، هر هفته",
        detail: "فرمالو · سخت‌گیری روی کیفیت و انتشار",
      },
      {
        mark: "↓",
        figure: "۴۶٪",
        caption: "ریزش کمتر در هفتهٔ اول",
        detail: "فرمالو · بازطراحی آنبوردینگ",
      },
      {
        mark: "→",
        figure: "۷ به ۳ دقیقه",
        caption: "زمان تا خرید",
        detail: "وادوستان · بازطراحی مسیر تجربهٔ کاربری",
      },
      {
        mark: "$",
        figure: "+۱۰٬۰۰۰ دلار",
        caption: "اسپانسر جذب‌شده",
        detail: "تدکس تهران · ارتباط با شرکا",
      },
    ],
    stats: [
      { value: "+۳۰هزار", label: "کسب‌وکار کاربر فرمالو" },
      { value: "+۵۰۰هزار", label: "دنبال‌کنندهٔ وادوستان" },
      { value: "+۱میلیون", label: "بازدید تدکس تهران" },
      { value: "۸۷٪", label: "افزایش رضایت مشتری" },
    ],
  },
  projects: {
    kicker: "ساخته‌های روزانه",
    title: "هر روز، یک اپ هوش مصنوعی.",
    count: "∞",
    intro: [
      { text: "هر روز با " },
      { text: "Claude Code", strong: true },
      {
        text: " یک اپ هوش مصنوعی تازه می‌سازم و منتشر می‌کنم. پایین می‌توانید ببینیدشان.",
      },
    ],
    swipe: "برای دیدن ساخته‌های روزانه به کنار بکشید",
    items: [
      {
        day: "روز ۰۱",
        name: "Tasks",
        description:
          "کارها را پیگیری کنید، فهرست‌ها را به اشتراک بگذارید و با دیگران همکاری کنید. ساخته‌شده با Claude Code و Supabase.",
        href: companyLinks.tasks,
        preview: "۳ از ۷ انجام‌شده",
        tags: ["Claude Code", "Supabase"],
      },
      {
        day: "روز ۰۲",
        name: "Price of That",
        description:
          "دیگر به دلار فکر نکنید. Price of That هر قیمتی را، بر اساس حقوق شما، به ساعت‌هایی از زندگی‌تان تبدیل می‌کند تا معلوم شود واقعاً ارزشش را دارد یا نه.",
        href: companyLinks.priceOfThat,
        preview: "۱۲٫۴ ساعت",
        tags: ["Claude Code"],
      },
      {
        day: "روز ۰۳",
        name: "Lapse",
        description:
          "هر اشتراک، قرارداد و مجوزی را که کسب‌وکارتان روی آن سوار است دنبال می‌کند، تا چیزی بی‌سروصدا با نرخ بالاتر تمدید نشود یا وقتی حواس‌تان نیست ناپدید شود.",
        href: companyLinks.lapse,
        preview: "۱٬۲۴۰ دلار در ماه",
        tags: ["Claude Code"],
      },
    ],
  },
  education: {
    kicker: "یادگیری",
    title: "تحصیلات و گواهینامه‌ها",
    count: "۰۶",
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
    kicker: "حرف بزنیم",
    line1: "ایده‌ای دارید؟",
    before: "بیایید ",
    highlight: "واقعی‌اش کنیم.",
    intro: "ایمیل‌تان را بگذارید. اگر خواستید نام یا یادداشت هم بنویسید. یا مستقیم ایمیل بزنید.",
    formTitle: "ایمیل‌تان را بگذارید",
    formHint: "نام و پیام اختیاری است.",
    name: "نام (اختیاری)",
    email: "ایمیل",
    message: "پیام (اختیاری)",
    submit: "بفرست",
    sending: "در حال ارسال",
    successTitle: "رسید.",
    successBody: "ممنون که ایمیل‌تان را گذاشتید.",
    errorTitle: "ارسال نشد.",
    errorBody: "یک بار دیگر تلاش کنید، یا مستقیم ایمیل بزنید.",
    emailRequired: "ایمیل را وارد کنید.",
    emailInvalid: "یک ایمیل معتبر وارد کنید.",
    nameLong: "نام خیلی طولانی است.",
    messageLong: "پیام خیلی طولانی است.",
  },
  footer: {
    role: "مدیر محصول و تضمین کیفیت",
    rights: "© ۲۰۲۶",
    backToTop: "بالای صفحه",
  },
  notFound: {
    title: "صفحه پیدا نشد",
    body: "این صفحه این‌جا نیست.",
    home: "بازگشت به خانه",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, fa };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
