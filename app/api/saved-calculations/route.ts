import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import type { PersistedCalculationPayload } from "@/types/persistence";

function isValidPayload(payload: unknown): payload is PersistedCalculationPayload {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  return (
    typeof candidate.calculatorSlug === "string" &&
    typeof candidate.inputs === "object" &&
    candidate.inputs !== null &&
    typeof candidate.result === "object" &&
    candidate.result !== null
  );
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!isValidPayload(payload)) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { error } = await supabase.from("saved_calculations").insert({
    calculator_slug: payload.calculatorSlug,
    inputs: payload.inputs,
    result: payload.result,
    user_id: user.id,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/dashboard");
  revalidatePath("/saved");

  return NextResponse.json({ ok: true });
}
