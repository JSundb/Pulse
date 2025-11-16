import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Event } from '../App';
import { MapPin, Trash2, Calendar, Clock, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import EventDetails from './EventDetails';

type Props = {
  events: Event[];
  onRemove: (eventId: string) => void;
};

export default function SavedEvents({ events, onRemove }: Props) {
  const [expandedEvent, setExpandedEvent] = useState<Event | null>(null);

  if (expandedEvent) {
    return (
      <EventDetails
        event={expandedEvent}
        onClose={() => setExpandedEvent(null)}
        onSave={() => setExpandedEvent(null)}
        isSaved
      />
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200/80 bg-white/95 backdrop-blur-lg px-6 py-5">
        <h1 className="text-2xl text-gray-900">Saved Events</h1>
        <p className="mt-1 text-sm text-gray-500">
          {events.length} {events.length === 1 ? 'event' : 'events'} saved
        </p>
      </div>

      {/* Events List */}
      {events.length === 0 ? (
        <div className="flex h-[calc(100%-100px)] items-center justify-center p-6">
          <div className="text-center">
            <div className="mb-4 text-6xl">💾</div>
            <p className="text-gray-600">No saved events yet</p>
            <p className="mt-2 text-sm text-gray-400">
              Swipe right on events to save them here
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3 p-4 pb-24">
          <AnimatePresence mode="popLayout">
            {events.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, x: -100 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="overflow-hidden rounded-2xl bg-white shadow-md"
              >
                <button
                  onClick={() => setExpandedEvent(event)}
                  className="w-full text-left transition-all hover:shadow-lg active:scale-[0.98]"
                >
                  <div className="flex gap-4 p-4">
                    {/* Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                      <ImageWithFallback
                        src={event.photo}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between">
                      {/* Date badge */}
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1">
                          <Calendar size={12} className="text-blue-600" />
                          <span className="text-xs text-blue-600">{event.date}</span>
                        </div>
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                          {event.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mb-1 line-clamp-1 text-gray-900">
                        {event.title}
                      </h3>

                      {/* Time and location */}
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span className="truncate">{event.time.split(' - ')[0]}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          <span>{event.distance}</span>
                        </div>
                      </div>
                    </div>

                    {/* Chevron */}
                    <div className="flex items-center">
                      <ChevronRight size={20} className="text-gray-300" />
                    </div>
                  </div>
                </button>

                {/* Delete button */}
                <div className="border-t border-gray-100 px-4 py-3">
                  <button
                    onClick={() => onRemove(event.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600 transition-all hover:bg-red-100 active:scale-95"
                  >
                    <Trash2 size={16} />
                    Remove from Saved
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}