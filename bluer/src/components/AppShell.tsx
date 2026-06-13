"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

const NAV = [
  { href: "/", label: "Portfolio", icon: LayoutDashboard },
  { href: "/search", label: "Social", icon: Users },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-border bg-background z-20">
        <div className="px-6 py-5 border-b border-border">
          <span className="text-2xl font-bold tracking-tight text-primary">bluer</span>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                data-tour={label === "Social" ? "social" : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-150 ${active ? "scale-110" : ""}`} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border flex items-center gap-3">
          <ThemeToggle />
          <span className="text-xs text-muted-foreground">v0.1.0</span>
        </div>
      </aside>

      {/* Content offset for sidebar */}
      <div className="lg:pl-64">
        {children}
      </div>
    </div>
  )
}
