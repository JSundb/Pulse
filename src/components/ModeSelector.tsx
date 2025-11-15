import { motion } from 'motion/react';

type Props = {
  onClose: () => void;
  onSelectMode: (mode: string) => void;
  currentMode: string;
};

const modes = [
  {
    id: 'social',
    name: 'Social Mode',
    icon: '👥',
    description: 'Connect with people',
    bullets: [
      'See who\'s nearby and looking to meet',
      'Join spontaneous hangouts',
      'Discover social events',
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'work',
    name: 'Work Mode',
    icon: '💼',
    description: 'Focus and productivity',
    bullets: [
      'Find quiet coffee shops',
      'Join study groups',
      'Professional networking spots',
    ],
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'fitness',
    name: 'Fitness Mode',
    icon: '💪',
    description: 'Active lifestyle',
    bullets: [
      'Discover workout buddies',
      'Find outdoor activities',
      'Group fitness events',
    ],
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'exploration',
    name: 'Exploration Mode',
    icon: '🗺️',
    description: 'Discover new places',
    bullets: [
      'Hidden gems in your area',
      'Food and culture',
      'Adventure opportunities',
    ],
    gradient: 'from-orange-500 to-pink-500',
  },
];

export default function ModeSelector({ onClose, onSelectMode, currentMode }: Props) {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="mx-4 w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="text-white">Choose Your Mode</div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {modes.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`overflow-hidden rounded-3xl bg-white p-6 shadow-xl ${
                currentMode === mode.id ? 'ring-4 ring-blue-500' : ''
              }`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${mode.gradient} text-white`}>
                    <span className="text-2xl">{mode.icon}</span>
                  </div>
                  <div>
                    <div className="text-gray-900">{mode.name}</div>
                    <p className="text-gray-500">{mode.description}</p>
                  </div>
                </div>
              </div>

              <ul className="mb-4 space-y-2">
                {mode.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectMode(mode.id)}
                className={`w-full rounded-full py-3 transition-all ${
                  currentMode === mode.id
                    ? `bg-gradient-to-r ${mode.gradient} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {currentMode === mode.id ? 'Current Mode' : 'Set Mode'}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}