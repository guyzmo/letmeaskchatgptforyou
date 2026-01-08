import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { RefObject } from "react";

interface ChatInputProps {
  value: string;
  disabled?: boolean;
  sendButtonRef?: RefObject<HTMLButtonElement>;
}

export const ChatInput = ({ value, disabled, sendButtonRef }: ChatInputProps) => {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 pb-6">
      <div className="relative">
        <div
          className={cn(
            "w-full min-h-[52px] max-h-48 px-4 py-3 pr-12 rounded-2xl bg-secondary border border-border",
            "text-foreground resize-none overflow-hidden",
            disabled && "opacity-70"
          )}
        >
          <span className={value ? "" : "typing-cursor"}>{value}</span>
        </div>
        <button
          ref={sendButtonRef}
          className={cn(
            "absolute right-2 bottom-2 w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
            value ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
          )}
          disabled={disabled}
        >
          <ArrowUp size={18} />
        </button>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-3">
        ChatGPT can make mistakes. Check important info.
      </p>
    </div>
  );
};
