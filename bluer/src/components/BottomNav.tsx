"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()

  const tabs = [
    { href: "/", label: "Portfolio", icon: LayoutDashboard },
    { href: "/search", label: "Social", icon: Users },
  ]

  return (
    <nav className="flex">
      {tabs.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== "/" && pathname.startsWith(href))
        return (
          <Link
            key={href}
            href={href}
            data-tour={label === "Social" ? "social" : undefined}
            className={`relative flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
              active ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className={`w-5 h-5 transition-transform ${active ? "scale-110" : ""}`} />
            <span className="text-[10px] font-medium">{label}</span>
            {active && (
              <span className="absolute bottom-0 w-8 h-0.5 rounded-full bg-primary" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
