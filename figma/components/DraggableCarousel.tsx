import { useState, useRef, useEffect } from 'react';
import { motion, PanInfo } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Props = {
  images: string[];
  alt?: string;
  aspectRatio?: string;
  showDots?: boolean;
  className?: string;
  label?: string;
};

export default function DraggableCarousel({
  images,
  alt = 'Image',
  aspectRatio = 'aspect-[4/3]',
  showDots = true,
  className = '',
  label,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const offset = info.offset.x;

    if (offset < -swipeThreshold && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (offset > swipeThreshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (images.length === 0) return null;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="flex"
        drag={images.length > 1 ? "x" : false}
        dragConstraints={{
          left: -(images.length - 1) * containerWidth,
          right: 0,
        }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={{ x: -currentIndex * containerWidth }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ width: `${images.length * 100}%` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`${aspectRatio} bg-muted`}
            style={{ width: `${100 / images.length}%` }}
          >
            <ImageWithFallback
              src={image}
              alt={`${alt} ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </motion.div>

      {/* Photo dots */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Label */}
      {label && (
        <div className="absolute top-4 left-4 pointer-events-none">
          <span className="rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
