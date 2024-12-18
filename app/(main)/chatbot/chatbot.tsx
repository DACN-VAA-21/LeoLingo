"use client";

import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { SendIcon, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function Chatbot() {
  const [hasUserAsked, setHasUserAsked] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/chat",
      initialMessages: [
        {
          id: "welcome",
          role: "assistant",
          content: "Chào bạn! Bạn có câu hỏi nào về học ngoại ngữ không?", // Welcome message
        },
      ],
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (messages.length > 1) {
      setHasUserAsked(true);
    }
  }, [messages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Ngăn việc xuống dòng mặc định
      // KHÔNG gọi handleSubmit ở đây nữa
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-background overflow-hidden">
      {/* Chat messages */}
      <div className="flex-1 p-6 overflow-y-auto">
        {!hasUserAsked ? (
          <div className="flex flex-col justify-center items-center h-full space-y-4">
            <div className="relative animate-bounce">
              <Image
                src="/chatbot.webp"
                alt="AI"
                width={128}
                height={128}
                className="rounded-full border-4 border-primary object-cover"
                priority
              />
            </div>
            <p className="text-xl text-muted-foreground font-semibold animate-pulse">
              Chào mừng đến với Chatbot! Hãy bắt đầu bằng một câu hỏi về tiếng
              Anh nhé.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" ? "justify-end" : ""
                )}
              >
                {message.role === "assistant" && (
                  <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
                    <Image
                      src="/gnerate-ai.jpg"
                      alt="AI"
                      width={40}
                      height={40}
                    />
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-lg p-4 max-w-[70%]",
                    message.role === "assistant"
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  {message.role === "assistant" ? (
                    <Markdown className="text-sm">{message.content}</Markdown>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Section */}
      <form onSubmit={handleSubmit} className="bg-muted p-4 border-t-2">
        <div className="relative">
          <Textarea
            placeholder="Nhập câu hỏi của bạn..."
            className="rounded-lg pr-24 min-h-[80px] resize-none border-2"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Button
            type={isLoading ? "button" : "submit"}
            onClick={isLoading ? stop : undefined}
            disabled={!input && !isLoading}
            className="absolute bottom-2 right-2 h-10 px-4 rounded-md"
            variant="super"
          >
            {isLoading ? (
              <>
                <StopCircle className="mr-2 h-4 w-4" />
                Stop
              </>
            ) : (
              <>
                <SendIcon className="mr-2 h-4 w-4" />
                Send
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
