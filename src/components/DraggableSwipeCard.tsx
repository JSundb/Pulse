import { useState, useRef } from 'react';
import { ChevronUp, MapPin, Clock, Users, DollarSign } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Activity } from '../App';

type Props = {
  activity: Activity;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onOpenDetails: () => void;
  isTop?: boolean;
  zIndex?: number;
};

export default function DraggableSwipeCard({
  activity,
  onSwipeLeft,
  onSwipeRight,
  onOpenDetails,
  isTop = true,
  zIndex = 10,
}: Props) {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [dragDirection, setDragDirection] = useState<'horizontal' | 'vertical' | null>(null);
  const [isImageAreaDrag, setIsImageAreaDrag] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const imageAreaRef = useRef<HTMLDivElement>(null);

  const SWIPE_THRESHOLD = 100;
  const VERTICAL_THRESHOLD = 80;
  const IMAGE_SWIPE_THRESHOLD = 50;

  const panels = [
    { type: 'main', images: [activity.photo] },
    { type: 'gallery', images: activity.photos.length > 1 ? activity.photos.slice(1) : activity.photos },
    { type: 'details' },
  ];

  const handleStart = (clientX: number, clientY: number) => {
    if (!isTop) return;
    
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
    setDragDirection(null);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !isTop) return;

    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;

    if (dragDirection === null) {
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        setDragDirection(Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical');
      }
    }

    if (dragDirection === 'horizontal') {
      setPosition({ x: deltaX, y: 0 });
    } else if (dragDirection === 'vertical') {
      if (deltaY < 0) {
        setPosition({ x: 0, y: deltaY });
      }
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);

    if (dragDirection === 'vertical' && position.y < -VERTICAL_THRESHOLD) {
      onOpenDetails();
      resetPosition();
      return;
    }

    if (dragDirection === 'horizontal') {
      if (position.x < -SWIPE_THRESHOLD) {
        setPosition({ x: -500, y: 0 });
        setTimeout(() => {
          onSwipeLeft();
          resetPosition();
        }, 250);
        return;
      } else if (position.x > SWIPE_THRESHOLD) {
        setPosition({ x: 500, y: 0 });
        setTimeout(() => {
          onSwipeRight();
          resetPosition();
        }, 250);
        return;
      }
    }

    resetPosition();
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setDragDirection(null);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const onMouseUp = () => {
    handleEnd();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  const onTouchEnd = () => {
    handleEnd();
  };

  const handlePanelTap = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentPanel > 0) {
      setCurrentPanel(currentPanel - 1);
    } else if (direction === 'right' && currentPanel < panels.length - 1) {
      setCurrentPanel(currentPanel + 1);
    }
  };

  const handleImageAreaStart = (clientX: number, clientY: number) => {
    if (!isTop) return;
    
    setIsImageAreaDrag(true);
    setStartPos({ x: clientX, y: clientY });
    setDragDirection(null);
  };

  const handleImageAreaMove = (clientX: number, clientY: number) => {
    if (!isImageAreaDrag || !isTop) return;

    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;

    if (dragDirection === null) {
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        setDragDirection(Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical');
      }
    }

    if (dragDirection === 'horizontal') {
      setPosition({ x: deltaX, y: 0 });
    } else if (dragDirection === 'vertical') {
      if (deltaY < 0) {
        setPosition({ x: 0, y: deltaY });
      }
    }
  };

  const handleImageAreaEnd = () => {
    if (!isImageAreaDrag) return;
    
    setIsImageAreaDrag(false);

    if (dragDirection === 'vertical' && position.y < -VERTICAL_THRESHOLD) {
      onOpenDetails();
      resetPosition();
      return;
    }

    if (dragDirection === 'horizontal') {
      if (position.x < -IMAGE_SWIPE_THRESHOLD) {
        if (currentImageIndex > 0) {
          setCurrentImageIndex(currentImageIndex - 1);
        }
        resetPosition();
        return;
      } else if (position.x > IMAGE_SWIPE_THRESHOLD) {
        if (currentImageIndex < panels[currentPanel].images.length - 1) {
          setCurrentImageIndex(currentImageIndex + 1);
        }
        resetPosition();
        return;
      }
    }

    resetPosition();
  };

  const rotation = dragDirection === 'horizontal' ? position.x * 0.02 : 0;
  const opacity = isTop ? Math.max(0.3, 1 - Math.abs(position.x) / 300) : 0.6;
  const scale = isTop ? 1 - Math.abs(position.x) * 0.0001 : 0.95;

  const currentPanelData = panels[currentPanel];

  let dragState: 'pass' | 'save' | null = null;
  if (dragDirection === 'horizontal') {
    if (position.x < -SWIPE_THRESHOLD * 0.5) dragState = 'pass';
    if (position.x > SWIPE_THRESHOLD * 0.5) dragState = 'save';
  }

  return (
    <div
      ref={cardRef}
      className="absolute inset-0 select-none"
      style={{
        transform: isTop
          ? `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`
          : 'scale(0.95) translateY(10px)',
        opacity: opacity,
        zIndex: zIndex,
        transition: isDragging ? 'none' : 'all 0.25s ease-out',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: isTop ? (isDragging ? 'grabbing' : 'grab') : 'default',
      }}
      onMouseDown={onMouseDown}
      onMouseMove={isDragging ? onMouseMove : undefined}
      onMouseUp={isDragging ? onMouseUp : undefined}
      onMouseLeave={isDragging ? onMouseUp : undefined}
      onTouchStart={onTouchStart}
      onTouchMove={isDragging ? onTouchMove : undefined}
      onTouchEnd={isDragging ? onTouchEnd : undefined}
    >
      <div className="relative h-full w-full">
        <div className="mx-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
          
          {/* ==== (A) TOP LAYER - Category & Distance ==== */}
          <div className="pointer-events-none absolute left-4 top-4 z-30">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs text-gray-900 backdrop-blur-sm shadow-lg">
              {activity.category}
            </span>
          </div>

          <div className="pointer-events-none absolute right-4 top-4 z-30">
            <span className="flex items-center gap-1 rounded-full bg-blue-600/95 px-3 py-1.5 text-xs text-white backdrop-blur-sm shadow-lg">
              <MapPin size={12} />
              {activity.distance}
            </span>
          </div>

          {/* ==== (B) IMAGE AREA - Top 60% ==== */}
          <div className="relative h-[60%] w-full overflow-hidden">
            {/* Main Photo Panel */}
            {currentPanelData.type === 'main' && (
              <div className="relative h-full w-full">
                <ImageWithFallback
                  src={currentPanelData.images[currentImageIndex]}
                  alt={activity.title}
                  className="h-full w-full object-cover pointer-events-none"
                />

                {/* Gradient overlay for readability */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Image Navigation Tap Zones - Only when not dragging */}
                {!isDragging && currentPanelData.images.length > 1 && (
                  <>
                    {/* Left Tap Zone */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : currentPanelData.images.length - 1));
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      className="absolute left-0 top-0 h-full w-1/2 z-20"
                      style={{ background: 'transparent' }}
                    />
                    {/* Right Tap Zone */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => (prev < currentPanelData.images.length - 1 ? prev + 1 : 0));
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      className="absolute right-0 top-0 h-full w-1/2 z-20"
                      style={{ background: 'transparent' }}
                    />
                  </>
                )}

                {/* Vibe Tags - Bottom Left */}
                {activity.vibe.length > 0 && (
                  <div className="pointer-events-none absolute bottom-4 left-4 flex flex-wrap gap-2 z-20">
                    {activity.vibe.slice(0, 3).map((vibe, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-md border border-white/30"
                      >
                        {vibe}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Gallery Panel */}
            {currentPanelData.type === 'gallery' && (
              <div className="relative h-full w-full">
                <div className="grid h-full grid-cols-2 gap-1">
                  {currentPanelData.images.slice(0, 4).map((img, idx) => (
                    <div key={idx} className={idx === 0 ? 'col-span-2' : ''}>
                      <ImageWithFallback
                        src={img}
                        alt={`${activity.title} ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Panel Navigation */}
                {!isDragging && (
                  <>
                    <div
                      onClick={() => handlePanelTap('left')}
                      className="absolute left-0 top-0 h-full w-1/4 z-20"
                      style={{ background: 'transparent', cursor: 'pointer' }}
                    />
                    <div
                      onClick={() => handlePanelTap('right')}
                      className="absolute right-0 top-0 h-full w-1/4 z-20"
                      style={{ background: 'transparent', cursor: 'pointer' }}
                    />
                  </>
                )}

                <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-20">
                  <div className="rounded-xl bg-white/20 px-3 py-2 text-center text-xs text-white backdrop-blur-md border border-white/30">
                    {activity.photos.length} photos from community
                  </div>
                </div>
              </div>
            )}

            {/* Quick Details Panel */}
            {currentPanelData.type === 'details' && (
              <div className="relative flex h-full w-full flex-col justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
                {/* Panel Navigation */}
                {!isDragging && (
                  <div
                    onClick={() => handlePanelTap('left')}
                    className="absolute left-0 top-0 h-full w-1/4 z-20"
                    style={{ background: 'transparent', cursor: 'pointer' }}
                  />
                )}

                <div>
                  <h3 className="mb-3 text-xl text-gray-900">Quick Info</h3>
                  
                  <div className="space-y-3">
                    {activity.currentConditions.crowdLevel && (
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">{activity.currentConditions.crowdLevel}</span>
                      </div>
                    )}
                    
                    {activity.currentConditions.lightCondition && (
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">{activity.currentConditions.lightCondition}</span>
                      </div>
                    )}

                    {activity.costLevel && (
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-700">{activity.costLevel}</span>
                      </div>
                    )}

                    {activity.specialMoment && (
                      <div className="mt-3 rounded-xl bg-orange-100 px-3 py-2">
                        <p className="text-sm text-orange-900">✨ {activity.specialMoment}</p>
                      </div>
                    )}

                    {activity.bestTimeToVisit && (
                      <div className="mt-3 rounded-xl bg-blue-100 px-3 py-2">
                        <p className="text-sm text-blue-900">🕐 Best: {activity.bestTimeToVisit}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Panel Indicators */}
            <div className="pointer-events-none absolute bottom-3 left-0 right-0 z-30 flex justify-center gap-1.5">
              {panels.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentPanel ? 'w-6 bg-white shadow-lg' : 'w-1.5 bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ==== (C) TEXT CONTENT AREA - Bottom 40% ==== */}
          <div className="relative flex flex-1 flex-col bg-white p-5">
            {/* Drag State Overlay - Subtle */}
            {dragState === 'pass' && (
              <>
                <div className="absolute inset-0 z-10 bg-red-500/10 pointer-events-none" />
                <div className="absolute left-4 top-4 z-20 flex items-center gap-1 rounded-full bg-red-500/90 px-3 py-1.5 text-white shadow-lg backdrop-blur-sm pointer-events-none">
                  <span>✕</span>
                  <span className="text-sm">Pass</span>
                </div>
              </>
            )}
            {dragState === 'save' && (
              <>
                <div className="absolute inset-0 z-10 bg-green-500/10 pointer-events-none" />
                <div className="absolute right-4 top-4 z-20 flex items-center gap-1 rounded-full bg-green-500/90 px-3 py-1.5 text-white shadow-lg backdrop-blur-sm pointer-events-none">
                  <span>♥</span>
                  <span className="text-sm">Saved</span>
                </div>
              </>
            )}

            {/* Title & Subtitle */}
            <div className="mb-3">
              <h2 className="mb-1 text-xl text-gray-900">{activity.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{activity.description}</p>
            </div>

            {/* Metadata Chips Row */}
            <div className="mb-4 flex flex-wrap gap-2">
              {activity.currentConditions.crowdLevel && (
                <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1.5 text-xs text-green-700">
                  <Users size={12} />
                  {activity.currentConditions.crowdLevel}
                </span>
              )}

              {activity.currentConditions.lightCondition && (
                <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1.5 text-xs text-yellow-700">
                  <Clock size={12} />
                  {activity.currentConditions.lightCondition}
                </span>
              )}

              {activity.costLevel && (
                <span className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1.5 text-xs text-blue-700">
                  <DollarSign size={12} />
                  {activity.costLevel}
                </span>
              )}
            </div>

            {/* Special Moment Banner */}
            {activity.specialMoment && (
              <div className="mb-3 rounded-2xl bg-gradient-to-r from-orange-100 to-pink-100 px-4 py-2.5">
                <p className="text-sm text-orange-900">✨ {activity.specialMoment}</p>
              </div>
            )}

            {/* Best Time */}
            {activity.bestTimeToVisit && (
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                <Clock size={14} />
                <span>Best: {activity.bestTimeToVisit}</span>
              </div>
            )}

            {/* ==== (E) FOOTER INTERACTION HINTS ==== */}
            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                ← Pass
              </span>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetails();
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
              >
                <ChevronUp size={14} />
                <span>Swipe up for details</span>
              </button>
              
              <span className="flex items-center gap-1">
                Save →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}