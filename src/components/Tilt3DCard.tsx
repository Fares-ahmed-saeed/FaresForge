import { useRef, useState, useCallback, ReactNode } from "react";

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

const Tilt3DCard = ({ children, className = "", maxTilt = 12, glare = true }: Tilt3DCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setStyle({
      rotateX: (0.5 - y) * maxTilt,
      rotateY: (x - 0.5) * maxTilt,
      glareX: x * 100,
      glareY: y * 100,
    });
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    setStyle({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} relative`}
      style={{
        transform: `perspective(800px) rotateX(${style.rotateX}deg) rotateY(${style.rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: style.rotateX === 0 ? "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" : "transform 0.1s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden z-10"
          style={{
            background: `radial-gradient(circle at ${style.glareX}% ${style.glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            opacity: style.rotateX === 0 ? 0 : 1,
            transition: style.rotateX === 0 ? "opacity 0.6s" : "opacity 0.1s",
          }}
        />
      )}
    </div>
  );
};

export default Tilt3DCard;
