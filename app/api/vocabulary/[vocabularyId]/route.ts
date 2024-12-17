import db from "@/db/drizzle";
import { vocabulary } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { vocabularyId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const data = await db.query.vocabulary.findFirst({
    where: eq(vocabulary.id, params.vocabularyId),
  });
  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { vocabularyId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const body = await req.json();
  const data = await db
    .update(vocabulary)
    .set({
      ...body,
    })
    .where(eq(vocabulary.id, params.vocabularyId))
    .returning();
  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { vocabularyId: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const data = await db
    .delete(vocabulary)
    .where(eq(vocabulary.id, params.vocabularyId))
    .returning();

  return NextResponse.json(data[0]);
};
