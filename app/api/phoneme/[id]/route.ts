import { NextResponse } from "next/server";
import { getPhonemeWithWordById } from "@/db/queies";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const phonemeId = Number(params.id);

  if (isNaN(phonemeId)) {
    return NextResponse.json({ error: "Invalid phoneme ID" }, { status: 400 });
  }

  const phoneme = await getPhonemeWithWordById(phonemeId);

  if (!phoneme) {
    return NextResponse.json({ error: "Phoneme not found" }, { status: 404 });
  }

  return NextResponse.json(phoneme);
}
