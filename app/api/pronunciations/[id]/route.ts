import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Danh sách phoneme
  const pronunciations = [
    { id: 1, symbol: "eɪ", example: "say", audioUrl: "/audio/say.mp3" },
    { id: 2, symbol: "i", example: "sheep", audioUrl: "/audio/sheep.mp3" },
    { id: 3, symbol: "u", example: "food", audioUrl: "/audio/food.mp3" },
    { id: 4, symbol: "b", example: "book", audioUrl: "/audio/book.mp3" },
    { id: 5, symbol: "d", example: "day", audioUrl: "/audio/day.mp3" },
    { id: 6, symbol: "f", example: "fish", audioUrl: "/audio/fish.mp3" },
    { id: 7, symbol: "g", example: "go", audioUrl: "/audio/go.mp3" },
    { id: 8, symbol: "h", example: "home", audioUrl: "/audio/home.mp3" },
    { id: 9, symbol: "k", example: "key", audioUrl: "/audio/key.mp3" },
    { id: 10, symbol: "l", example: "lion", audioUrl: "/audio/lion.mp3" },
    { id: 11, symbol: "m", example: "moon", audioUrl: "/audio/moon.mp3" },
    { id: 12, symbol: "n", example: "nose", audioUrl: "/audio/nose.mp3" },
    { id: 13, symbol: "p", example: "pen", audioUrl: "/audio/pen.mp3" },
    { id: 14, symbol: "t", example: "top", audioUrl: "/audio/top.mp3" },
    { id: 15, symbol: "v", example: "voice", audioUrl: "/audio/voice.mp3" },
    { id: 16, symbol: "w", example: "win", audioUrl: "/audio/win.mp3" },
    { id: 17, symbol: "j", example: "yellow", audioUrl: "/audio/yellow.mp3" },
    { id: 18, symbol: "z", example: "zebra", audioUrl: "/audio/zebra.mp3" },
    { id: 19, symbol: "r", example: "red", audioUrl: "/audio/red.mp3" },
    { id: 20, symbol: "s", example: "snake", audioUrl: "/audio/snake.mp3" },
    { id: 21, symbol: "^", example: "hot", audioUrl: "/audio/hot.mp3" },
    { id: 22, symbol: "æ", example: "cat", audioUrl: "/audio/cat.mp3" },
    { id: 23, symbol: "ɛ", example: "bed", audioUrl: "/audio/bed.mp3" },
    { id: 24, symbol: "ɪ", example: "ship", audioUrl: "/audio/ship.mp3" },
    { id: 25, symbol: "ɪə", example: "fear", audioUrl: "/audio/fear.mp3" },
  ];

  // Lấy ID từ params
  const id = parseInt(params.id, 10);

  // Tìm phoneme dựa trên ID
  const phoneme = pronunciations.find((p) => p.id === id);

  // Nếu không tìm thấy, trả về lỗi 404
  if (!phoneme) {
    return NextResponse.json({ error: "Phoneme not found" }, { status: 404 });
  }

  // Trả về dữ liệu phoneme
  return NextResponse.json(phoneme);
}
