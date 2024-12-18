import { google } from "@ai-sdk/google";
import { type CoreMessage, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  // Add system prompt to first message if needed
  const prompt = {
    role: "system",
    content:
      "Bạn là một trợ lý AI chuyên về hỗ trợ học ngôn ngữ. Bạn chỉ trả lời các câu hỏi liên quan đến ngôn ngữ (ví dụ: từ vựng, ngữ pháp, phát âm, cấu trúc câu, cách dùng từ, ...). Nếu người dùng hỏi bất kỳ câu hỏi nào không liên quan đến ngôn ngữ, hãy lịch sự từ chối và nhắc nhở rằng bạn chỉ hỗ trợ các vấn đề liên quan đến ngôn ngữ. Khi tạo danh sách từ vựng hoặc ngữ pháp, vui lòng sử dụng bảng markdown để hiển thị dữ liệu một cách rõ ràng. Hãy luôn giữ giọng điệu lịch sự và thân thiện.",
  } as CoreMessage;

  const updatedMessages =
    messages.length === 1 ? [prompt, ...messages] : messages;

  const result = await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    messages: updatedMessages,
  });

  return result.toDataStreamResponse();
}
