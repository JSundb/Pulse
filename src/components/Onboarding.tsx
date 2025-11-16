import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Users, MapPin, ChevronRight } from 'lucide-react';
import type { UserPreferences } from '../App';

type Props = {
  onComplete: (preferences: UserPreferences) => void;
};

const INTERESTS = [
  'Fitness',
  'Cafés',
  'Studying',
  'Nature',
  'Photography',
  'Socializing',
  'Cheap Eats',
  'Quiet Spaces',
  'Sports',
  'Art & Culture',
  'Walking',
  'Coworking',
];

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [mood, setMood] = useState<'chill' | 'normal' | 'active'>('normal');
  const [openToMeeting, setOpenToMeeting] = useState(true);

  const handleComplete = () => {
    onComplete({
      interests: selectedInterests,
      mood,
      openToMeeting,
      showSoloOnly: false,
    });
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <AnimatePresence mode="wait">
        {/* Step 0: Welcome */}
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-1 flex-col items-center justify-center px-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-xl"
            >
              <Compass size={48} className="text-white" strokeWidth={2} />
            </motion.div>
            <h1 className="mb-4 text-4xl text-gray-900">Welcome to Roamy</h1>
            <p className="mb-12 max-w-sm text-lg text-gray-600 leading-relaxed">
              Discover the best things to do around you, find places with the right vibe, and connect with people like you.
            </p>
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95"
            >
              Get Started
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {/* Step 1: The Core Idea */}
        {step === 1 && (
          <motion.div
            key="idea"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-1 flex-col px-6 py-12"
          >
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <div className="mb-8 grid grid-cols-1 gap-6 max-w-md">
                <div className="rounded-3xl bg-white p-6 shadow-lg">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 mx-auto">
                    <Compass size={28} className="text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-lg text-gray-900">Discover things to do</h3>
                  <p className="text-sm text-gray-600">
                    Find activities that match your mood and interests, right now or anytime soon.
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-lg">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 mx-auto">
                    <MapPin size={28} className="text-purple-600" />
                  </div>
                  <h3 className="mb-2 text-lg text-gray-900">Find places with the right vibe</h3>
                  <p className="text-sm text-gray-600">
                    Quiet cafés, lively parks, hidden gems—all tailored to what you're looking for.
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-lg">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 mx-auto">
                    <Users size={28} className="text-green-600" />
                  </div>
                  <h3 className="mb-2 text-lg text-gray-900">Connect with people like you</h3>
                  <p className="text-sm text-gray-600">
                    Optional: meet others who share your interests around activities.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95"
            >
              Continue
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <motion.div
            key="interests"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-1 flex-col px-6 py-12"
          >
            <div className="flex flex-1 flex-col">
              <h2 className="mb-2 text-3xl text-gray-900">What are you into?</h2>
              <p className="mb-8 text-gray-600">Select all that apply. This helps us suggest better activities.</p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {INTERESTS.map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`rounded-full px-5 py-3 text-sm transition-all ${
                      selectedInterests.includes(interest)
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setStep(3)}
              disabled={selectedInterests.length === 0}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl px-8 py-4 text-white shadow-lg transition-all ${
                selectedInterests.length > 0
                  ? 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Continue ({selectedInterests.length} selected)
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {/* Step 3: Mood/Energy */}
        {step === 3 && (
          <motion.div
            key="mood"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-1 flex-col px-6 py-12"
          >
            <div className="flex flex-1 flex-col">
              <h2 className="mb-2 text-3xl text-gray-900">What's your usual vibe?</h2>
              <p className="mb-8 text-gray-600">We'll prioritize activities that match your energy level.</p>
              
              <div className="flex flex-col gap-4 mb-8">
                <button
                  onClick={() => setMood('chill')}
                  className={`rounded-2xl p-6 text-left transition-all ${
                    mood === 'chill'
                      ? 'bg-blue-600 text-white shadow-xl'
                      : 'bg-white text-gray-900 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="mb-2 text-xl">Low energy / Chill</div>
                  <p className={`text-sm ${mood === 'chill' ? 'text-blue-100' : 'text-gray-600'}`}>
                    Quiet cafés, peaceful walks, solo activities
                  </p>
                </button>
                
                <button
                  onClick={() => setMood('normal')}
                  className={`rounded-2xl p-6 text-left transition-all ${
                    mood === 'normal'
                      ? 'bg-blue-600 text-white shadow-xl'
                      : 'bg-white text-gray-900 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="mb-2 text-xl">Normal / Balanced</div>
                  <p className={`text-sm ${mood === 'normal' ? 'text-blue-100' : 'text-gray-600'}`}>
                    Mix of everything—solo, social, active, relaxed
                  </p>
                </button>
                
                <button
                  onClick={() => setMood('active')}
                  className={`rounded-2xl p-6 text-left transition-all ${
                    mood === 'active'
                      ? 'bg-blue-600 text-white shadow-xl'
                      : 'bg-white text-gray-900 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="mb-2 text-xl">High energy / Active</div>
                  <p className={`text-sm ${mood === 'active' ? 'text-blue-100' : 'text-gray-600'}`}>
                    Sports, social meetups, exploring, busy places
                  </p>
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setStep(4)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95"
            >
              Continue
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {/* Step 4: Social Preferences */}
        {step === 4 && (
          <motion.div
            key="social"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-1 flex-col px-6 py-12"
          >
            <div className="flex flex-1 flex-col">
              <h2 className="mb-2 text-3xl text-gray-900">Open to meeting people?</h2>
              <p className="mb-8 text-gray-600">
                This is optional. We can show you micro-groups and shared activities if you're interested.
              </p>
              
              <div className="flex flex-col gap-4 mb-8">
                <button
                  onClick={() => setOpenToMeeting(true)}
                  className={`rounded-2xl p-6 text-left transition-all ${
                    openToMeeting
                      ? 'bg-blue-600 text-white shadow-xl'
                      : 'bg-white text-gray-900 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="mb-2 text-xl">Yes, I'm open to it</div>
                  <p className={`text-sm ${openToMeeting ? 'text-blue-100' : 'text-gray-600'}`}>
                    Show me shared activities and micro-groups around my interests
                  </p>
                </button>
                
                <button
                  onClick={() => setOpenToMeeting(false)}
                  className={`rounded-2xl p-6 text-left transition-all ${
                    !openToMeeting
                      ? 'bg-blue-600 text-white shadow-xl'
                      : 'bg-white text-gray-900 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="mb-2 text-xl">No, just solo activities</div>
                  <p className={`text-sm ${!openToMeeting ? 'text-blue-100' : 'text-gray-600'}`}>
                    Focus on places and activities I can enjoy on my own
                  </p>
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setStep(5)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95"
            >
              Continue
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {/* Step 5: Location Permission */}
        {step === 5 && (
          <motion.div
            key="location"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-1 flex-col items-center justify-center px-6 text-center"
          >
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-xl">
              <MapPin size={48} className="text-white" strokeWidth={2} />
            </div>
            <h2 className="mb-4 text-3xl text-gray-900">Enable location</h2>
            <p className="mb-12 max-w-md text-lg text-gray-600 leading-relaxed">
              We use your location to suggest nearby activities and places. You can also plan for future locations and trips.
            </p>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <button
                onClick={handleComplete}
                className="rounded-2xl bg-blue-600 px-8 py-4 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95"
              >
                Enable Location
              </button>
              <button
                onClick={handleComplete}
                className="rounded-2xl bg-white px-8 py-4 text-gray-700 shadow-md transition-all hover:shadow-lg active:scale-95"
              >
                Skip for now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step indicator */}
      {step > 0 && step < 5 && (
        <div className="flex justify-center gap-2 pb-6">
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s <= step ? 'w-8 bg-blue-600' : 'w-1.5 bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
