import { useState, useEffect, useRef } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { AnimatedCursor } from "./AnimatedCursor";

interface ChatDemoProps {
  prompt: string;
}

type Phase = "idle" | "movingToInput" | "typing" | "clickingSend" | "sent" | "streaming" | "complete";

export const ChatDemo = ({ prompt }: ChatDemoProps) => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [typedText, setTypedText] = useState("");
  const [streamedResponse, setStreamedResponse] = useState("");
  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLDivElement>(null);

  const responseText = `Was that so hard? 🙄\n\nNext time, try asking ChatGPT yourself! You can find it at chat.openai.com — it's free and quite good at answering questions.\n\nThis message was brought to you by someone who believes in your ability to use the internet. 💪`;

  // Start by moving cursor to input
  useEffect(() => {
    if (phase !== "idle") return;
    
    const startDelay = setTimeout(() => {
      setPhase("movingToInput");
    }, 500);

    return () => clearTimeout(startDelay);
  }, [phase]);

  useEffect(() => {
    if (phase !== "typing") return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < prompt.length) {
        setTypedText(prompt.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase("clickingSend"), 300);
      }
    }, 50 + Math.random() * 30);

    return () => clearInterval(interval);
  }, [phase, prompt]);

  // After sending, start streaming response
  useEffect(() => {
    if (phase !== "sent") return;

    const delay = setTimeout(() => {
      setPhase("streaming");
    }, 800);

    return () => clearTimeout(delay);
  }, [phase]);

  // Stream the response
  useEffect(() => {
    if (phase !== "streaming") return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < responseText.length) {
        setStreamedResponse(responseText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setPhase("complete");
      }
    }, 20);

    return () => clearInterval(interval);
  }, [phase]);

  const showUserMessage = phase === "sent" || phase === "streaming" || phase === "complete";
  const showAssistantMessage = phase === "streaming" || phase === "complete";
  const showInputCursor = phase === "movingToInput";
  const showSendCursor = phase === "clickingSend";

  const handleInputCursorComplete = () => {
    setPhase("typing");
  };

  const handleSendCursorComplete = () => {
    setPhase("sent");
  };

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar />
      
      <main className="flex-1 flex flex-col">
        <header className="h-12 flex items-center justify-center border-b border-border">
          <span className="text-sm font-medium">ChatGPT</span>
        </header>

        <div className="flex-1 overflow-y-auto">
          {showUserMessage && (
            <ChatMessage role="user" content={prompt} />
          )}
          {showAssistantMessage && (
            <ChatMessage
              role="assistant"
              content={streamedResponse}
              isStreaming={phase === "streaming"}
            />
          )}
        </div>

        {(!showUserMessage) && (
          <div className="pb-4">
            <ChatInput 
              value={typedText} 
              disabled 
              sendButtonRef={sendButtonRef} 
              textareaRef={textareaRef}
            />
          </div>
        )}

        {showInputCursor && (
          <AnimatedCursor
            targetRef={textareaRef}
            onComplete={handleInputCursorComplete}
            delay={100}
          />
        )}

        {showSendCursor && (
          <AnimatedCursor
            targetRef={sendButtonRef}
            onComplete={handleSendCursorComplete}
            delay={100}
          />
        )}

        {phase === "complete" && (
          <div className="pb-6 px-4 fade-in space-y-3">
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
              <a
                href={`https://chat.openai.com?prompt=${encodeURIComponent(prompt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-lg bg-secondary border border-border text-foreground text-center font-medium hover:bg-muted transition-colors"
              >
                Open ChatGPT →
              </a>
              <a
                href="/"
                className="flex-1 py-3 px-4 rounded-lg bg-primary text-primary-foreground text-center font-medium hover:opacity-90 transition-opacity"
              >
                Create your own link
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
