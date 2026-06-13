import { NextResponse } from "next/server"

export async function GET() {
  const res = await fetch("https://api.wallex.ir/v1/markets", {
    next: { revalidate: 60 }, // cache 60s on the server
  })

  if (!res.ok) {
    return NextResponse.json({ error: "upstream failed" }, { status: 502 })
  }

  const json = await res.json()
  return NextResponse.json(json)
}
