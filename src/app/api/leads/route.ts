import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { addLead, getLeads, type LeadType } from "@/lib/leads-store";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";

const VALID_TYPES: LeadType[] = ["quote", "contact"];

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const type = body.type;
  const name = typeof body.name === "string" ? body.name.trim() : "";

  if (typeof type !== "string" || !VALID_TYPES.includes(type as LeadType)) {
    return NextResponse.json({ error: "Invalid lead type" }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 2000) : undefined);

  const lead = await addLead({
    type: type as LeadType,
    name: name.slice(0, 200),
    phone: str(body.phone),
    email: str(body.email),
    kw: str(body.kw),
    address: str(body.address),
    subject: str(body.subject),
    message: str(body.message),
  });

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!verifySessionToken(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = await getLeads();
  return NextResponse.json({ leads });
}
