import { NextResponse } from "next/server";

const sentencesData = [
  {
    word: "say",
    sentences: ["Can you say that again?"]
  },
  {
    word: "sheep",
    sentences: ["The sheep are grazing in the field."]
  },
  {
    word: "food",
    sentences: ["We should buy some food for the picnic."]
  },
  {
    word: "book",
    sentences: ["I borrowed a book from the library."]
  },
  {
    word: "day",
    sentences: ["It was a beautiful day at the beach."]
  },
  {
    word: "fish",
    sentences: ["The fisherman caught a big fish."]
  },
  {
    word: "go",
    sentences: ["Let's go to the park this afternoon."]
  },
  {
    word: "home",
    sentences: ["He went home after the meeting."]
  },
  {
    word: "key",
    sentences: ["Don't forget to bring the house key."]
  },
  {
    word: "lion",
    sentences: ["The lion is the king of the jungle."]
  },
  {
    word: "moon",
    sentences: ["The full moon lit up the night sky."]
  },
  {
    word: "nose",
    sentences: ["He touched his nose to signal a secret."]
  },
  {
    word: "pen",
    sentences: ["I need a pen to sign this document."]
  },
  {
    word: "top",
    sentences: ["She climbed to the top of the mountain."]
  },
  {
    word: "voice",
    sentences: ["Her voice was soft and soothing."]
  },
  {
    word: "win",
    sentences: ["They hope to win the championship."]
  },
  {
    word: "yellow",
    sentences: ["The yellow flowers are blooming beautifully."]
  },
  {
    word: "zebra",
    sentences: ["A zebra has black and white stripes."]
  },
  {
    word: "red",
    sentences: ["The apple is red."]
  },
  {
    word: "snake",
    sentences: ["The snake slithered across the path."]
  },
  {
    word: "hot",
    sentences: ["The water is hot."]
  },
  {
    word: "cat",
    sentences: ["The cat is sleeping."]
  },
  {
    word: "bed",
    sentences: ["He lay down on the soft bed."]
  },
  {
    word: "ship",
    sentences: ["The ship sailed across the ocean."]
  },
  {
    word: "fear",
    sentences: ["She overcame her fear of heights."]
  }
];

// Xử lý GET request
export async function GET(
  request: Request,
  { params }: { params: { word: string } } // Lấy tham số động [word]
) {
  const { word } = params;

  // Tìm câu chứa từ vựng
  const entry = sentencesData.find((item) => item.word.toLowerCase() === word.toLowerCase());

  if (!entry) {
    return NextResponse.json({ error: "Sentences not found for this word" }, { status: 404 });
  }

  // Trả về danh sách câu liên quan
  return NextResponse.json({ sentences: entry.sentences });
}
