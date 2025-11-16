import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import roamyFullLogo from 'figma:asset/88920ae4f27e8e2569a29489a000af778c5905e8.png';
import SignUpScreen from './SignUpScreen';
import LogInScreen from './LogInScreen';

type OnboardingSlide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
};

const slides: OnboardingSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1761605119138-6da68a0d8023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWRkZW4lMjByZXN0YXVyYW50JTIwY296eSUyMGludGVyaW9yfGVufDF8fHx8MTc2MzI2MTg0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Discover hidden spots nearby',
    subtitle: 'Find unique places curated by locals.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1761949119766-ce7870c38bd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBncm91cCUyMGFjdGl2aXR5fGVufDF8fHx8MTc2MzI2MTY3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Join activities instantly',
    subtitle: 'Meet people doing what you love.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1668900016730-75a72135f96d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHNjZW5pY3xlbnwxfHx8fDE3NjMxODcyMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Swipe left or right',
    subtitle: 'Tell Roamy what you like, and it learns your taste.',
  },
];

type Props = {
  onComplete: () => void;
};

export default function OnboardingCarousel({ onComplete }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowFinalScreen(true);
    }
  };

  const handleSkip = () => {
    setShowFinalScreen(true);
  };

  // Show Sign Up Screen
  if (showSignUp) {
    return (
      <SignUpScreen
        onComplete={onComplete}
        onSwitchToLogIn={() => {
          setShowSignUp(false);
          setShowLogIn(true);
        }}
      />
    );
  }

  // Show Log In Screen
  if (showLogIn) {
    return (
      <LogInScreen
        onComplete={onComplete}
        onSwitchToSignUp={() => {
          setShowLogIn(false);
          setShowSignUp(true);
        }}
      />
    );
  }

  // Final Screen - Brand Message + CTA
  if (showFinalScreen) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-between bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 px-6 py-12 dark:from-teal-950 dark:via-blue-950 dark:to-purple-950">
        {/* Logo & Message - Centered */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          {/* Logo */}
          <div className="mb-8">
            <img src={roamyFullLogo} alt="Roamy Logo" className="h-32" />
          </div>

          {/* Headline */}
          <h1 className="mb-4 max-w-sm text-4xl text-foreground">
            Bored? New in town? No idea what to do?
          </h1>

          {/* Subtext */}
          <p className="max-w-md text-muted-foreground leading-relaxed">
            Swipe left, swipe right, and discover activities, places, and people with Roamy.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="w-full max-w-sm space-y-3">
          {/* Sign Up Button */}
          <button
            onClick={() => setShowSignUp(true)}
            className="w-full rounded-full bg-gradient-to-r from-teal-500 to-blue-500 px-8 py-4 text-white shadow-lg transition-all hover:shadow-xl active:scale-98"
          >
            Sign Up
          </button>

          {/* Log In Button */}
          <button
            onClick={() => setShowLogIn(true)}
            className="w-full rounded-full border-2 border-border bg-transparent px-8 py-4 text-foreground transition-all hover:bg-secondary active:scale-98"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  // Carousel Slides
  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-background"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative flex h-full w-full flex-shrink-0 flex-col"
          >
            {/* Image - Full screen with overlay */}
            <div className="relative h-full w-full">
              <ImageWithFallback
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Text Overlay - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-32">
              <h2 className="mb-3 text-4xl text-white">
                {slide.title}
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 pb-12">
        {/* Dot Indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-foreground shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}