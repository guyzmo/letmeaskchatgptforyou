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

    const releaseTimer = setTimeout(() => {
      setIsClicking(false);
    }, 1150);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1200);

    return () => {
      clearTimeout(moveTimer);
      clearTimeout(clickTimer);
      clearTimeout(releaseTimer);
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
      {/* macOS Cursor SVG */}
      <svg
        width="24"
        height="28"
        viewBox="0 0 24 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
      >
        <path
          d="M2.5 0.5L2.5 22.5L7.5 17.5L11.5 26.5L15 25L11 16H19L2.5 0.5Z"
          fill="white"
          stroke="black"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      
      {/* Click ripple effect */}
      {isClicking && (
        <div className="absolute top-2 left-1">
          <div className="w-6 h-6 rounded-full bg-foreground/20 animate-ping" />
        </div>
      )}
    </div>
  );
};
