import { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Activity } from '../App';

type Props = {
  activity: Activity;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onOpenDetails: () => void;
  dragOffset?: number;
  isTop?: boolean;
};

export default function UniversalSwipeCard({
  activity,
  onSwipeLeft,
  onSwipeRight,
  onOpenDetails,
  dragOffset = 0,
  isTop = true,
}: Props) {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [panelDragOffset, setPanelDragOffset] = useState(0);

  // Panels: Main Photo, Extra Images, Quick Details
  const panels = [
    { type: 'main', images: [activity.photo] },
    { type: 'gallery', images: activity.photos.length > 1 ? activity.photos.slice(1) : activity.photos },
    { type: 'details' },
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;

    const diffX = e.touches[0].clientX - touchStartX;
    const diffY = e.touches[0].clientY - touchStartY;

    // Determine if this is a horizontal or vertical swipe
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe for panels
      setPanelDragOffset(diffX);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchStartY === null) return;

    // Handle panel transitions
    if (Math.abs(panelDragOffset) > 80) {
      if (panelDragOffset > 0 && currentPanel > 0) {
        setCurrentPanel(currentPanel - 1);
      } else if (panelDragOffset < 0 && currentPanel < panels.length - 1) {
        setCurrentPanel(currentPanel + 1);
      }
    }

    setTouchStartX(null);
    setTouchStartY(null);
    setPanelDragOffset(0);
  };

  const handleTapSide = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < width * 0.3 && currentPanel > 0) {
      setCurrentPanel(currentPanel - 1);
    } else if (x > width * 0.7 && currentPanel < panels.length - 1) {
      setCurrentPanel(currentPanel + 1);
    }
  };

  const currentPanelData = panels[currentPanel];

  return (
    <div
      className="relative w-full max-w-md transition-all duration-300 ease-out"
      style={{
        transform: isTop
          ? `translateX(${dragOffset}px) rotate(${dragOffset * 0.02}deg) scale(${1 - Math.abs(dragOffset) * 0.0002})`
          : 'scale(0.95) translateY(10px)',
        opacity: isTop ? 1 : 0.6,
        zIndex: isTop ? 10 : 1,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleTapSide}
    >
      <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Panel Content */}
        <div
          className="relative aspect-[3/4] overflow-hidden"
          style={{
            transform: `translateX(${panelDragOffset * 0.3}px)`,
            transition: panelDragOffset === 0 ? 'transform 0.3s ease' : 'none',
          }}
        >
          {/* Main Photo Panel */}
          {currentPanelData.type === 'main' && (
            <div className="h-full w-full">
              <ImageWithFallback
                src={currentPanelData.images[0]}
                alt={activity.title}
                className="h-full w-full object-cover"
              />

              {/* Top Labels */}
              <div className="absolute left-4 top-4 z-10">
                <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs text-gray-900 backdrop-blur-sm shadow-lg">
                  {activity.category}
                </span>
              </div>

              <div className="absolute right-4 top-4 z-10">
                <span className="rounded-full bg-blue-600/95 px-3 py-1.5 text-xs text-white backdrop-blur-sm shadow-lg">
                  {activity.distance}
                </span>
              </div>

              {/* Vibe Tags */}
              {activity.vibe.length > 0 && (
                <div className="absolute bottom-4 left-4 z-10 flex gap-2">
                  {activity.vibe.slice(0, 2).map((vibe, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur-sm"
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
            <div className="h-full w-full">
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

              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="rounded-2xl bg-black/60 px-4 py-2 text-center text-sm text-white backdrop-blur-md">
                  Photos from the community
                </div>
              </div>
            </div>
          )}

          {/* Details Panel */}
          {currentPanelData.type === 'details' && (
            <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-gray-50 to-white p-6">
              <div>
                <h2 className="mb-3 text-2xl text-gray-900">{activity.title}</h2>
                <p className="mb-4 text-gray-600 leading-relaxed">{activity.description}</p>

                {/* Meta Chips */}
                <div className="flex flex-wrap gap-2">
                  {activity.currentConditions.crowdLevel && (
                    <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs text-green-700">
                      {activity.currentConditions.crowdLevel}
                    </span>
                  )}
                  {activity.specialMoment && (
                    <span className="rounded-full bg-orange-100 px-3 py-1.5 text-xs text-orange-700">
                      {activity.specialMoment}
                    </span>
                  )}
                  {activity.currentConditions.lightCondition && (
                    <span className="rounded-full bg-yellow-100 px-3 py-1.5 text-xs text-yellow-700">
                      {activity.currentConditions.lightCondition}
                    </span>
                  )}
                  {activity.costLevel && (
                    <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs text-blue-700">
                      {activity.costLevel}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetails();
                  }}
                  className="flex items-center gap-2 text-sm text-gray-500"
                >
                  <ChevronUp size={16} />
                  <span>Swipe up for full details</span>
                </button>
              </div>
            </div>
          )}

          {/* Panel Indicators */}
          <div className="absolute bottom-20 left-0 right-0 z-10 flex justify-center gap-2">
            {panels.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPanel(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentPanel ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Content */}
        <div className="p-5">
          {/* Action Hints */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>← Pass</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails();
              }}
              className="flex items-center gap-1 rounded-full bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700 active:scale-95"
            >
              <ChevronUp size={16} />
              <span>Details</span>
            </button>
            <span>Save →</span>
          </div>
        </div>
      </div>
    </div>
  );
}
