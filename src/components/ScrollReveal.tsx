import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ReactNode, CSSProperties } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  blur?: boolean;
}

const getTransform = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up": return `translateY(${distance}px)`;
    case "down": return `translateY(-${distance}px)`;
    case "left": return `translateX(${distance}px)`;
    case "right": return `translateX(-${distance}px)`;
    case "none": return "none";
  }
};

const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 600,
  distance = 20,
  className = "",
  blur = true,
}: ScrollRevealProps) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  const style: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    filter: blur ? (isVisible ? "blur(0px)" : "blur(4px)") : undefined,
    transform: isVisible ? "translateY(0) translateX(0)" : getTransform(direction, distance),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: "opacity, transform, filter",
  };

  return (
    <div ref={elementRef} style={style} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
