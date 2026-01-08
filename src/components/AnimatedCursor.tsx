import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCursorProps {
  targetRef: React.RefObject<HTMLElement>;
  onComplete: () => void;
  delay?: number;
}

export const AnimatedCursor = ({ targetRef, onComplete, delay = 0 }: AnimatedCursorProps) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsVisible(true);
      // Start from bottom-right area
      setPosition({ 
        x: window.innerWidth * 0.7, 
        y: window.innerHeight * 0.7 
      });
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible || !targetRef.current) return;

    const moveTimer = setTimeout(() => {
      const rect = targetRef.current!.getBoundingClientRect();
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }, 300);

    const clickTimer = setTimeout(() => {
      setIsClicking(true);
    }, 1000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1200);

    return () => {
      clearTimeout(moveTimer);
      clearTimeout(clickTimer);
      clearTimeout(completeTimer);
    };
  }, [isVisible, targetRef, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed pointer-events-none z-50 transition-all duration-700 ease-out",
        isClicking && "scale-90"
      )}
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-2px, -2px)"
      }}
    >
      {/* Cursor SVG */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <path
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z"
          fill="white"
          stroke="black"
          strokeWidth="1.5"
        />
      </svg>
      
      {/* Click ripple effect */}
      {isClicking && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 rounded-full bg-primary/30 animate-ping" />
        </div>
      )}
    </div>
  );
};
