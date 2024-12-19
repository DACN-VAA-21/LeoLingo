import { NextResponse } from "next/server";
import { getSentencesByPhonemeId } from "@/db/queies";

// Xử lý GET request
export async function GET(
  request: Request,
  { params }: { params: { word: string } }
) {
  const { word } = params;

  try {
    // Truy vấn `phoneme_id` dựa trên từ
    const phonemeId = parseInt(word, 10); // Chuyển đổi `word` sang số (ID của phoneme)

    if (isNaN(phonemeId)) {
      return NextResponse.json(
        { error: "Invalid phoneme ID provided" },
        { status: 400 }
      );
    }

    // Gọi hàm `getSentencesByPhonemeId` để lấy dữ liệu từ database
    const sentences = await getSentencesByPhonemeId(phonemeId);

    if (sentences.length === 0) {
      return NextResponse.json(
        { error: "No sentences found for this phoneme ID" },
        { status: 404 }
      );
    }

    return NextResponse.json({ sentences });
  } catch (error) {
    console.error("Error fetching sentences:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching sentences" },
      { status: 500 }
    );
  }
}
