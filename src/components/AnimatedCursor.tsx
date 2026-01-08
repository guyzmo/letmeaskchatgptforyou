import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import cursorImage from "@/assets/macos-cursor.png";

interface AnimatedCursorProps {
  targetRef: React.RefObject<HTMLElement>;
  onComplete: () => void;
  delay?: number;
  startPosition?: { x: number; y: number } | null;
}

export const AnimatedCursor = ({ targetRef, onComplete, delay = 0, startPosition }: AnimatedCursorProps) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsVisible(true);
      // Start from provided position or bottom-right area
      if (startPosition) {
        setPosition(startPosition);
      } else {
        setPosition({ 
          x: window.innerWidth * 0.7, 
          y: window.innerHeight * 0.7 
        });
      }
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay, startPosition]);

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
      }}
    >
      <img
        src={cursorImage}
        alt=""
        className="w-6 h-auto drop-shadow-lg"
        style={{ 
          filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.4))",
        }}
      />
      
      {/* Click ripple effect */}
      {isClicking && (
        <div className="absolute top-2 left-1">
          <div className="w-6 h-6 rounded-full bg-foreground/20 animate-ping" />
        </div>
      )}
    </div>
  );
};
