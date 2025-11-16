import { useState } from 'react';
import roamyFullLogo from 'figma:asset/88920ae4f27e8e2569a29489a000af778c5905e8.png';

type Props = {
  onComplete: () => void;
  onSwitchToSignUp: () => void;
};

export default function LogInScreen({ onComplete, onSwitchToSignUp }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle log in logic here
    onComplete();
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
    console.log('Forgot password clicked');
  };

  const handleContinueAsGuest = () => {
    onComplete();
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 px-6 py-8 dark:from-teal-950 dark:via-blue-950 dark:to-purple-950">
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <img src={roamyFullLogo} alt="Roamy Logo" className="h-16" />
      </div>

      {/* Content Container - Centered */}
      <div className="flex flex-1 flex-col justify-center">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl text-foreground">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Log in to continue exploring
          </p>
        </div>

        {/* Log In Form */}
        <form onSubmit={handleLogIn} className="mx-auto w-full max-w-sm space-y-4">
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
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-teal-600 transition-colors hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
            >
              Forgot Password?
            </button>
          </div>

          {/* Log In Button */}
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-gradient-to-r from-teal-500 to-blue-500 px-8 py-4 text-white shadow-lg transition-all hover:shadow-xl active:scale-98"
          >
            Log In
          </button>

          {/* Switch to Sign Up */}
          <div className="mt-4 text-center">
            <span className="text-muted-foreground">
              Don't have an account?{' '}
            </span>
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="text-teal-600 transition-colors hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>

      {/* Terms & Privacy */}
      <div className="mt-8 text-center text-xs text-muted-foreground">
        By logging in, you agree to our{' '}
        <button className="underline">Terms</button>
        {' & '}
        <button className="underline">Privacy Policy</button>.
      </div>
    </div>
  );
}