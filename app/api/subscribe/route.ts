import { serverSubscribeSchema } from "@/lib/subscribe";

export async function POST(request: Request) {
  let raw = "";
  try {
    raw = await request.text();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (raw.length > 10_000) {
    return Response.json({ ok: false, error: "invalid" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = serverSubscribeSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // TODO: Connect this stub to the real backend (email list, database, or
  // notification). Validated payloads are accepted and nothing is stored yet.
  void parsed.data;

  return Response.json({ ok: true });
}
