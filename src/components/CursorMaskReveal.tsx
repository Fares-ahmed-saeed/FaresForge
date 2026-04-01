import { useRef, useEffect, useState } from "react";
import profilePhoto from "@/assets/profile-photo.jpg";

interface CursorMaskRevealProps {
  backgroundImage: string;
  foregroundImage: string;
  maskSize?: number;
  className?: string;
}

const CursorMaskReveal = ({ 
  backgroundImage, 
  foregroundImage, 
  maskSize = 150,
  className = ""
}: CursorMaskRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [maskPos, setMaskPos] = useState({ x: 0.5, y: 0.5 });
  const [isInside, setIsInside] = useState(false);
  const [containerSize, setContainerSize] = useState({ w: 400, h: 400 });
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const fgImageRef = useRef<HTMLImageElement | null>(null);

  // Load images
  useEffect(() => {
    const bgImg = new Image();
    const fgImg = new Image();
    
    bgImg.src = backgroundImage;
    fgImg.src = foregroundImage;
    
    bgImg.onload = () => {
      bgImageRef.current = bgImg;
      drawCanvas();
    };
    
    fgImg.onload = () => {
      fgImageRef.current = fgImg;
      drawCanvas();
    };
  }, [backgroundImage, foregroundImage]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ w: rect.width, h: rect.height });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle mouse move
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMaskPos({ x, y });
  };

  const handlePointerEnter = () => setIsInside(true);
  const handlePointerLeave = () => {
    setIsInside(false);
    setMaskPos({ x: 0.5, y: 0.5 });
  };

  // Draw canvas with magnifying glass effect
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx || !bgImageRef.current) return;
    
    const { w, h } = containerSize;
    canvas.width = w;
    canvas.height = h;
    
    // Clear canvas
    ctx.clearRect(0, 0, w, h);
    
    // Draw background image (normal size)
    ctx.drawImage(bgImageRef.current, 0, 0, w, h);
    
    if (isInside) {
      // Create magnifying glass effect
      const maskX = maskPos.x * w;
      const maskY = maskPos.y * h;
      const radius = maskSize / 2;
      const zoomLevel = 2.5; // Magnification level (higher = more zoom)
      
      // Save context
      ctx.save();
      
      // Create circular clipping path for magnifier
      ctx.beginPath();
      ctx.arc(maskX, maskY, radius, 0, Math.PI * 2);
      ctx.clip();
      
      // Calculate the source area from the original image
      // We need to take a smaller portion of the image
      const img = bgImageRef.current;
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      
      // Scale factors to convert canvas coordinates to image coordinates
      const scaleX = imgW / w;
      const scaleY = imgH / h;
      
      // Position in image coordinates
      const imgX = maskX * scaleX;
      const imgY = maskY * scaleY;
      
      // Size of the area to grab from original image (smaller area for zoom effect)
      const sourceWidth = (radius * 2 / zoomLevel) * scaleX;
      const sourceHeight = (radius * 2 / zoomLevel) * scaleY;
      
      // Make sure we don't go outside image bounds
      const sourceX = Math.max(0, Math.min(imgX - sourceWidth / 2, imgW - sourceWidth));
      const sourceY = Math.max(0, Math.min(imgY - sourceHeight / 2, imgH - sourceHeight));
      
      // Draw zoomed portion of image
      ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight, // source rectangle (small area from original)
        maskX - radius, maskY - radius, radius * 2, radius * 2 // destination (magnified circle)
      );
      
      // Restore context
      ctx.restore();
      
      // Draw outer border around magnifier (white)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 4;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(maskX, maskY, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Draw inner border
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(maskX, maskY, radius - 3, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  useEffect(() => {
    drawCanvas();
  }, [maskPos, containerSize, isInside]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden cursor-none ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      
      {/* Magnifying glass indicator */}
      {isInside && (
        <div 
          className="absolute pointer-events-none transition-all duration-150"
          style={{
            left: `${maskPos.x * 100}%`,
            top: `${maskPos.y * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative w-4 h-4">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            <div className="absolute inset-0 bg-primary rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CursorMaskReveal;