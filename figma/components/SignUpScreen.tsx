import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import roamyFullLogo from 'figma:asset/88920ae4f27e8e2569a29489a000af778c5905e8.png';

type Props = {
  onComplete: () => void;
  onSwitchToLogIn: () => void;
};

type InterestTag = {
  id: string;
  label: string;
  icon: string;
};

const interests: InterestTag[] = [
  { id: 'outdoor', label: 'Outdoor', icon: '🏞️' },
  { id: 'coffee', label: 'Coffee', icon: '☕' },
  { id: 'photography', label: 'Photography', icon: '📸' },
  { id: 'food', label: 'Food', icon: '🍽️' },
  { id: 'nature', label: 'Nature', icon: '🌲' },
  { id: 'social', label: 'Social', icon: '🎉' },
  { id: 'fitness', label: 'Fitness', icon: '💪' },
  { id: 'culture', label: 'Culture', icon: '🎨' },
];

export default function SignUpScreen({ onComplete, onSwitchToLogIn }: Props) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleStep1Continue = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim()) {
      setCurrentStep(2);
    }
  };

  const handleStep2Continue = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.length >= 8) {
      setCurrentStep(3);
    }
  };

  const handleStep3Finish = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here with: fullName, email, password, selectedInterests
    onComplete();
  };

  const handleSkip = () => {
    onComplete();
  };

  const toggleInterest = (interestId: string) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter((id) => id !== interestId));
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 px-6 py-8 dark:from-teal-950 dark:via-blue-950 dark:to-purple-950">
      {/* Content */}
      <div className="flex min-h-screen flex-col">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img src={roamyFullLogo} alt="Roamy Logo" className="h-16" />
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 flex justify-center gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1.5 rounded-full transition-all ${
                step === currentStep
                  ? 'w-8 bg-teal-500'
                  : step < currentStep
                  ? 'w-6 bg-teal-500/60'
                  : 'w-6 bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        <div className="text-center text-xs text-muted-foreground mb-8">
          Step {currentStep} of 3
        </div>

        {/* Forms Container - Centered */}
        <div className="flex flex-1 flex-col justify-center">
          <AnimatePresence mode="wait">
            {/* STEP 1 - NAME */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="mx-auto w-full max-w-sm"
              >
                {/* Header */}
                <div className="mb-8 text-center">
                  <h1 className="mb-2 text-3xl text-foreground">
                    What's your name?
                  </h1>
                  <p className="text-muted-foreground">
                    We'll personalize your experience
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleStep1Continue} className="space-y-6">
                  {/* Full Name Input */}
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-foreground shadow-sm transition-all placeholder:text-muted-foreground focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      required
                    />
                  </div>

                  {/* Continue Button */}
                  <button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-teal-500 to-blue-500 px-8 py-4 text-white shadow-lg transition-all hover:shadow-xl active:scale-98"
                  >
                    Continue
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 2 - EMAIL & PASSWORD */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="mx-auto w-full max-w-sm"
              >
                {/* Header */}
                <div className="mb-8 text-center">
                  <h1 className="mb-2 text-3xl text-foreground">
                    Set up your account
                  </h1>
                </div>

                {/* Form */}
                <form onSubmit={handleStep2Continue} className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-foreground shadow-sm transition-all placeholder:text-muted-foreground focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      required
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-foreground shadow-sm transition-all placeholder:text-muted-foreground focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      required
                      minLength={8}
                    />
                  </div>

                  {/* Continue Button */}
                  <button
                    type="submit"
                    className="mt-6 w-full rounded-full bg-gradient-to-r from-teal-500 to-blue-500 px-8 py-4 text-white shadow-lg transition-all hover:shadow-xl active:scale-98"
                  >
                    Continue
                  </button>

                  {/* Password hint */}
                  <p className="text-center text-xs text-muted-foreground">
                    Minimum 8 characters
                  </p>
                </form>
              </motion.div>
            )}

            {/* STEP 3 - INTERESTS */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="mx-auto w-full max-w-sm"
              >
                {/* Header */}
                <div className="mb-8 text-center">
                  <h1 className="mb-2 text-3xl text-foreground">
                    Choose your interests
                  </h1>
                  <p className="text-muted-foreground">
                    Optional, helps us suggest better places & activities
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleStep3Finish} className="space-y-6">
                  {/* Interest Pills */}
                  <div className="flex flex-wrap justify-center gap-3">
                    {interests.map((interest) => {
                      const isSelected = selectedInterests.includes(interest.id);
                      return (
                        <button
                          key={interest.id}
                          type="button"
                          onClick={() => toggleInterest(interest.id)}
                          className={`flex items-center gap-2 rounded-full px-4 py-2.5 shadow-sm transition-all active:scale-95 ${
                            isSelected
                              ? 'bg-teal-500 text-white border-2 border-teal-400'
                              : 'bg-background text-foreground border-2 border-border hover:border-teal-500'
                          }`}
                        >
                          <span>{interest.icon}</span>
                          <span className="text-sm">{interest.label}</span>
                          {isSelected && <Check size={16} />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Finish Sign Up Button */}
                  <button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-teal-500 to-blue-500 px-8 py-4 text-white shadow-lg transition-all hover:shadow-xl active:scale-98"
                  >
                    Finish Sign Up
                  </button>

                  {/* Skip Button */}
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="w-full text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Skip
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Switch to Log In / Terms - Only on Step 1 */}
        {currentStep === 1 && (
          <div className="mt-8 space-y-4">
            <div className="text-center">
              <span className="text-muted-foreground">
                Already have an account?{' '}
              </span>
              <button
                type="button"
                onClick={onSwitchToLogIn}
                className="text-teal-600 transition-colors hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
              >
                Log In
              </button>
            </div>
            <div className="text-center text-xs text-muted-foreground">
              By signing up, you agree to our{' '}
              <button className="underline">Terms</button>
              {' & '}
              <button className="underline">Privacy Policy</button>.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}