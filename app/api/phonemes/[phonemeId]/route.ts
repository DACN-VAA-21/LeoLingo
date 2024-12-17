import db from "@/db/drizzle";
import { phonemes } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { phonemeId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const data = await db.query.phonemes.findFirst({
    where: eq(phonemes.id, params.phonemeId),
  });
  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { phonemeId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const body = await req.json();
  const data = await db
    .update(phonemes)
    .set({
      ...body,
    })
    .where(eq(phonemes.id, params.phonemeId))
    .returning();
  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { phonemeId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const data = await db
    .delete(phonemes)
    .where(eq(phonemes.id, params.phonemeId))
    .returning();

  return NextResponse.json(data[0]);
};
