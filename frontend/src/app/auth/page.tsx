'use client';

import Link from 'next/link';
import { SubmitButton } from '@/components/ui/submit-button';
import { Input } from '@/components/ui/input';
import GoogleSignIn from '@/components/GoogleSignIn';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useState, useEffect, Suspense } from 'react';
import { signIn, signUp, forgotPassword } from './actions';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  X,
  CheckCircle,
  AlertCircle,
  MailCheck,
  Loader2,
  Sparkles,
  Shield,
  Zap,
  Brain,
  Network,
  Globe,
} from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useAuthMethodTracking } from '@/lib/stores/auth-tracking';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import GitHubSignIn from '@/components/GithubSignIn';
import { KortixLogo } from '@/components/sidebar/kortix-logo';
import { Ripple } from '@/components/ui/ripple';
import { ReleaseBadge } from '@/components/auth/release-badge';
import { motion } from 'motion/react';

// 3D Neon Animated Shapes Component
const NeonShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Cubes */}
      <motion.div
        className="absolute top-20 left-10 w-6 h-6 border border-blue-400/40 rounded-lg shadow-lg shadow-blue-400/20"
        animate={{
          y: [0, -30, 0],
          rotateY: [0, 180, 360],
          rotateX: [0, 90, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-5 h-5 border border-purple-400/40 rounded-lg shadow-lg shadow-purple-400/20"
        animate={{
          y: [0, 25, 0],
          rotateZ: [0, 45, 90, 135, 180],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Pulsing Spheres */}
      <motion.div
        className="absolute bottom-40 left-20 w-8 h-8 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 border border-blue-400/30 shadow-lg shadow-blue-400/20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating Lines */}
      <motion.div
        className="absolute top-60 left-32 w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
        animate={{
          x: [-20, 20, -20],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Holographic Rings */}
      <motion.div
        className="absolute bottom-20 right-32 w-16 h-16 border-2 border-blue-400/30 rounded-full shadow-lg shadow-blue-400/20"
        animate={{
          rotateZ: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-12 h-12 border-2 border-purple-400/30 rounded-full m-2 shadow-lg shadow-purple-400/20"></div>
      </motion.div>
    </div>
  );
};

// Neon Background Component
const NeonBackground = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 overflow-hidden">
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 1px, transparent 1px),
                                radial-gradient(circle at 75% 75%, #8b5cf6 1px, transparent 1px)`,
               backgroundSize: '80px 80px, 120px 120px'
             }}>
        </div>
      </div>
      
      {/* Floating Particles */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-1 h-1 bg-blue-400 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-10 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

// Features Showcase Component
const FeaturesShowcase = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Digital Twins",
      description: "Autonomous intelligence that evolves with you"
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Blockchain Security",
      description: "Decentralized trust and data sovereignty"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Spatial Computing",
      description: "Immersive digital-physical experiences"
    }
  ];

  return (
    <div className="relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 backdrop-blur-sm mb-6">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-400">Digital Civilization Platform</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          Welcome to Genera
        </h1>
        <p className="text-lg text-gray-300 max-w-md mx-auto">
          Join the next evolution of digital intelligence and decentralized civilization
        </p>
      </motion.div>

      <div className="space-y-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 backdrop-blur-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center border border-blue-500/30">
              <div className="text-blue-400">
                {feature.icon}
              </div>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useAuth();
  const mode = searchParams.get('mode');
  const returnUrl = searchParams.get('returnUrl') || searchParams.get('redirect');
  const message = searchParams.get('message');

  const isSignUp = mode === 'signup';
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mounted, setMounted] = useState(false);

  const { wasLastMethod: wasEmailLastMethod, markAsUsed: markEmailAsUsed } = useAuthMethodTracking('email');

  useEffect(() => {
    if (!isLoading && user) {
      router.push(returnUrl || '/dashboard');
    }
  }, [user, isLoading, router, returnUrl]);

  const isSuccessMessage =
    message &&
    (message.includes('Check your email') ||
      message.includes('Account created') ||
      message.includes('success'));

  // Registration success state
  const [registrationSuccess, setRegistrationSuccess] =
    useState(!!isSuccessMessage);
  const [registrationEmail, setRegistrationEmail] = useState('');

  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isSuccessMessage) {
      setRegistrationSuccess(true);
    }
  }, [isSuccessMessage]);

  const handleSignIn = async (prevState: any, formData: FormData) => {
    markEmailAsUsed();

    const finalReturnUrl = returnUrl || '/dashboard';
    formData.append('returnUrl', finalReturnUrl);
    const result = await signIn(prevState, formData);

    if (
      result &&
      typeof result === 'object' &&
      'success' in result &&
      result.success &&
      'redirectTo' in result
      ) {
      window.location.href = result.redirectTo as string;
      return null;
    }

    if (result && typeof result === 'object' && 'message' in result) {
      toast.error('Login failed', {
        description: result.message as string,
        duration: 5000,
      });
      return {};
    }

    return result;
  };

  const handleSignUp = async (prevState: any, formData: FormData) => {
    markEmailAsUsed();

    const email = formData.get('email') as string;
    setRegistrationEmail(email);

    const finalReturnUrl = returnUrl || '/dashboard';
    formData.append('returnUrl', finalReturnUrl);

    // Add origin for email redirects
    formData.append('origin', window.location.origin);

    const result = await signUp(prevState, formData);

    // Check for success and redirectTo properties (direct login case)
    if (
      result &&
      typeof result === 'object' &&
      'success' in result &&
      result.success &&
      'redirectTo' in result
    ) {
      // Use window.location for hard navigation to avoid stale state
      window.location.href = result.redirectTo as string;
      return null; // Return null to prevent normal form action completion
    }

    // Check if registration was successful but needs email verification
    if (result && typeof result === 'object' && 'message' in result) {
      const resultMessage = result.message as string;
      if (resultMessage.includes('Check your email')) {
        setRegistrationSuccess(true);

        // Update URL without causing a refresh
        const params = new URLSearchParams(window.location.search);
        params.set('message', resultMessage);

        const newUrl =
          window.location.pathname +
          (params.toString() ? '?' + params.toString() : '');

        window.history.pushState({ path: newUrl }, '', newUrl);

        return result;
      } else {
        toast.error('Sign up failed', {
          description: resultMessage,
          duration: 5000,
        });
        return {};
      }
    }

    return result;
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setForgotPasswordStatus({});

    if (!forgotPasswordEmail || !forgotPasswordEmail.includes('@')) {
      setForgotPasswordStatus({
        success: false,
        message: 'Please enter a valid email address',
      });
      return;
    }

    const formData = new FormData();
    formData.append('email', forgotPasswordEmail);
    formData.append('origin', window.location.origin);

    const result = await forgotPassword(null, formData);

    setForgotPasswordStatus(result);
  };

  const resetRegistrationSuccess = () => {
    setRegistrationSuccess(false);
    // Remove message from URL and set mode to signin
    const params = new URLSearchParams(window.location.search);
    params.delete('message');
    params.set('mode', 'signin');

    const newUrl =
      window.location.pathname +
      (params.toString() ? '?' + params.toString() : '');

    window.history.pushState({ path: newUrl }, '', newUrl);

    router.refresh();
  };

  // Show loading spinner while checking auth state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 flex items-center justify-center relative overflow-hidden">
        <NeonBackground />
        <NeonShapes />
        <div className="relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-12 h-12 border-2 border-blue-400 border-t-transparent rounded-full shadow-lg shadow-blue-400/20"></div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Registration success view
  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
        <NeonBackground />
        <NeonShapes />
        <div className="w-full max-w-md mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-400/20 rounded-full p-6 mb-6 inline-flex border border-green-400/30 shadow-lg shadow-green-400/20">
              <MailCheck className="h-16 w-16 text-green-400" />
            </div>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              Check your email
            </h1>

            <p className="text-gray-300 mb-2 text-lg">
              We've sent a confirmation link to:
            </p>

            <p className="text-xl font-semibold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {registrationEmail || 'your email address'}
            </p>

            <div className="bg-gradient-to-r from-green-500/10 to-emerald-400/10 border border-green-400/20 rounded-2xl p-6 mb-8 backdrop-blur-sm">
              <p className="text-sm text-green-400">
                Click the link in the email to activate your account. If you don't see the email, check your spam folder.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/"
                className="flex h-12 items-center justify-center px-8 text-center rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-purple-600/10 hover:from-blue-500/20 hover:to-purple-600/20 transition-all duration-300 text-white backdrop-blur-sm"
              >
                Return to home
              </Link>
              <button
                onClick={resetRegistrationSuccess}
                className="flex h-12 items-center justify-center px-8 text-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 transition-all duration-300 text-white font-semibold shadow-lg shadow-green-500/25"
              >
                Back to sign in
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 relative overflow-hidden">
      <NeonBackground />
      <NeonShapes />
      
      <div className="relative z-10 top-6 left-6">
        <KortixLogo size={32} />
      </div>
      
      <div className="flex min-h-screen">
        {/* Left Side - Login Form */}
        <div className="relative flex-1 flex items-center justify-center p-4 lg:p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm"
          >
            <div className="mb-8 flex items-center flex-col gap-4 justify-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-white text-center leading-tight">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-gray-400 text-center">
                {isSignUp ? 'Join the digital civilization' : 'Log into your account'}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <GoogleSignIn returnUrl={returnUrl || undefined} />
              <GitHubSignIn returnUrl={returnUrl || undefined} />
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-transparent text-gray-400 backdrop-blur-sm">
                  or continue with email
                </span>
              </div>
            </div>

            <form className="space-y-4">
              <div className="space-y-3">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="h-12 rounded-xl border-gray-700 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                  required
                />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="h-12 rounded-xl border-gray-700 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                  required
                />
                {isSignUp && (
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    className="h-12 rounded-xl border-gray-700 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    required
                  />
                )}
              </div>

              <div className="pt-2">
                <div className="relative">
                  <SubmitButton
                    formAction={isSignUp ? handleSignUp : handleSignIn}
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30"
                    pendingText={isSignUp ? "Creating account..." : "Signing in..."}
                  >
                    {isSignUp ? 'Create account' : 'Sign in'}
                  </SubmitButton>
                  {wasEmailLastMethod && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900 shadow-lg shadow-green-500/50">
                      <div className="w-full h-full bg-green-500 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            </form>
            
            <div className="mt-6 space-y-4 text-center text-sm">
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)}
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:underline"
                >
                  Forgot password?
                </button>
              )}
              
              <div>
                <Link
                  href={isSignUp 
                    ? `/auth${returnUrl ? `?returnUrl=${returnUrl}` : ''}`
                    : `/auth?mode=signup${returnUrl ? `&returnUrl=${returnUrl}` : ''}`
                  }
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {isSignUp 
                    ? 'Already have an account? Sign in' 
                    : "Don't have an account? Sign up"
                  }
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Features Showcase */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative">
          <div className="absolute inset-0">
            <Ripple />
          </div>
          <FeaturesShowcase />
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent className="sm:max-w-md border-gray-700 bg-gray-900/90 backdrop-blur-sm">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-white">Reset Password</DialogTitle>
            </div>
            <DialogDescription className="text-gray-400">
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <Input
              id="forgot-password-email"
              type="email"
              placeholder="Email address"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              className="h-12 rounded-xl border-gray-700 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              required
            />
            {forgotPasswordStatus.message && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-xl flex items-center gap-3 backdrop-blur-sm ${
                  forgotPasswordStatus.success
                    ? 'bg-gradient-to-r from-green-500/10 to-emerald-400/10 border border-green-400/20 text-green-400'
                    : 'bg-gradient-to-r from-red-500/10 to-pink-400/10 border border-red-400/20 text-red-400'
                }`}
              >
                {forgotPasswordStatus.success ? (
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                )}
                <span className="text-sm">{forgotPasswordStatus.message}</span>
              </motion.div>
            )}
            <DialogFooter className="gap-3">
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(false)}
                className="h-11 px-6 border border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 rounded-xl text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-11 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-300 rounded-xl shadow-lg shadow-blue-500/25"
              >
                Send Reset Link
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 flex items-center justify-center relative overflow-hidden">
          <NeonBackground />
          <NeonShapes />
          <div className="relative z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-12 h-12 border-2 border-blue-400 border-t-transparent rounded-full shadow-lg shadow-blue-400/20"></div>
            </motion.div>
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}