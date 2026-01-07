import { cn } from "@/lib/utils";
import { Sparkles, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
  isStreaming?: boolean;
}

export const ChatMessage = ({ role, content, isTyping, isStreaming }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={cn("py-6 fade-in", isUser ? "bg-transparent" : "bg-chat-ai")}>
      <div className="max-w-3xl mx-auto px-4 md:px-8 flex gap-4">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
            isUser ? "bg-primary" : "bg-primary/20"
          )}
        >
          {isUser ? (
            <User size={16} className="text-primary-foreground" />
          ) : (
            <Sparkles size={16} className="text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm mb-1">
            {isUser ? "You" : "ChatGPT"}
          </div>
          <div className={cn("text-foreground leading-relaxed", isTyping && "typing-cursor")}>
            {content}
            {isStreaming && <span className="typing-cursor" />}
          </div>
        </div>
      </div>
    </div>
  );
};
