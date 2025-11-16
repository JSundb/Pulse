import { motion } from 'motion/react';
import type { Event } from '../App';
import { X, MapPin, Calendar, Clock, Heart, Share2, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Props = {
  event: Event;
  onClose: () => void;
  onSave: () => void;
  isSaved?: boolean;
};

export default function EventDetails({ event, onClose, onSave, isSaved }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal expands upward from bottom - same card aesthetic */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 35, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md max-h-[92vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl"
      >
        {/* Header with close button */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-5 py-4 backdrop-blur-lg rounded-t-3xl">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-blue-600" />
            <span className="text-sm text-gray-700">{event.date}</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative h-80">
          <ImageWithFallback
            src={event.photo}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Category and distance badges */}
          <div className="absolute top-4 left-5 right-5 flex items-center justify-between gap-2">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-sm text-gray-900 shadow-lg backdrop-blur-sm">
              {event.category}
            </span>
            <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm">
              <MapPin size={14} className="text-blue-600" />
              <span className="text-sm text-gray-900">{event.distance}</span>
            </div>
          </div>

          {/* Live indicator */}
          {event.liveCount > 0 && (
            <>
              {/* Show live count ONLY for ongoing events */}
              {event.status === 'ongoing' && (
                <div className="absolute bottom-4 left-5 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <Users size={16} className="text-gray-700" />
                  <span className="text-sm text-gray-900">{event.liveCount} here now</span>
                </div>
              )}
            </>
          )}
          
          {/* Show start time for upcoming events */}
          {event.status === 'upcoming' && (
            <div className="absolute bottom-4 left-5 flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-2 shadow-lg">
              <Clock size={16} className="text-white" />
              <span className="text-sm text-white">
                Starts {event.time.includes('AM') || event.time.includes('PM') ? event.time.split(' - ')[0] : event.time}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Title */}
          <h1 className="mb-4 text-3xl text-gray-900 leading-tight">
            {event.title}
          </h1>

          {/* Time and Location Row */}
          <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl bg-gray-50 p-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock size={18} className="text-gray-400" />
              <span className="text-sm">{event.time}</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin size={18} className="text-gray-400" />
              <span className="text-sm">{event.location}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg text-gray-900">About this event</h2>
            <p className="text-[15px] leading-relaxed text-gray-600">
              {event.fullDescription || event.description}
            </p>
          </div>

          {/* Additional Photos */}
          {event.photos && event.photos.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-3 text-lg text-gray-900">Photos</h2>
              <div className="grid grid-cols-2 gap-3">
                {event.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl"
                  >
                    <ImageWithFallback
                      src={photo}
                      alt={`${event.title} ${index + 1}`}
                      className="h-40 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Map placeholder */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg text-gray-900">Location</h2>
            <div className="h-48 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="flex h-full items-center justify-center text-gray-400">
                <div className="text-center">
                  <MapPin size={32} className="mx-auto mb-2 text-blue-400" />
                  <p className="text-sm text-gray-500">Map view</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pb-8">
            {!isSaved && (
              <button
                onClick={() => {
                  onSave();
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95"
              >
                <Heart size={20} />
                Save Event
              </button>
            )}
            <button
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-gray-200 bg-white px-6 py-4 text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
            >
              <Share2 size={20} />
              {!isSaved && 'Share'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}