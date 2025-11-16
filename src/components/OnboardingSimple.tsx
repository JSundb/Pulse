import { useState } from 'react';
import { ChevronRight, MapPin } from 'lucide-react';
import roamyFullLogo from 'figma:asset/88920ae4f27e8e2569a29489a000af778c5905e8.png';

type Props = {
  onComplete: (interests: string[]) => void;
};

export default function OnboardingSimple({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests = [
    'Nature', 'Sport', 'Photography', 'Cafés', 'Study Spots',
    'Social', 'Routes & Hikes', 'Water & Swim', 'Seasonal', 'Hidden Gems'
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  if (step === 0) {
    // Welcome screen
    return (
      <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="mb-8">
            <img src={roamyFullLogo} alt="Roamy Logo" className="h-48" />
          </div>
          
          <p className="mb-8 max-w-md text-center text-lg text-gray-600 leading-relaxed">
            Find spots and activities around you, plan future trips, and see what people actually do there.
          </p>
        </div>

        <button
          onClick={() => setStep(1)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-98"
        >
          <span>Get Started</span>
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }

  if (step === 1) {
    // Choose interests
    return (
      <div className="flex h-full flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="mb-8">
          <h2 className="mb-3 text-3xl text-gray-900">Choose what you like</h2>
          <p className="text-gray-600">
            Pick a few themes you're into. You can change these later.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-wrap gap-3">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`rounded-full px-6 py-3 transition-all active:scale-95 ${
                  selectedInterests.includes(interest)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setStep(2)}
          disabled={selectedInterests.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Continue</span>
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }

  // Location permission screen
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="flex flex-col items-center max-w-md">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl">
          <MapPin size={48} />
        </div>
        
        <h2 className="mb-4 text-3xl text-center text-gray-900">Enable Location</h2>
        
        <p className="mb-8 text-center text-lg text-gray-600 leading-relaxed">
          We use your location to show nearby spots and activities, and to plan future locations.
        </p>

        <div className="w-full space-y-3">
          <button
            onClick={() => onComplete(selectedInterests)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-98"
          >
            Enable Location
          </button>
          
          <button
            onClick={() => onComplete(selectedInterests)}
            className="w-full rounded-2xl bg-gray-200 px-4 py-4 text-gray-700 transition-all hover:bg-gray-300 active:scale-98"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}