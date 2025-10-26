'use client';

import { SectionHeader } from '@/components/home/section-header';
import type { PricingTier } from '@/lib/home';
import { siteConfig } from '@/lib/home';
import { motion } from 'motion/react';
import React, { useState, useEffect, useCallback } from 'react';
import { 
  CheckIcon, 
  Clock, 
  Bot, 
  FileText, 
  Settings, 
  Grid3X3, 
  Image, 
  Video, 
  Presentation, 
  Diamond, 
  Heart,
  Zap,
  Sparkles,
  Brain,
  Cpu,
  Network,
  Shield,
  Cloud,
  Users,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/components/AuthProvider';

// مكون البطاقة النيونية
const NeonCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  popular?: boolean;
}> = ({ 
  children, 
  className, 
  delay = 0,
  popular = false
}) => {
  return (
    <div 
      className={`
        relative bg-black/60 backdrop-blur-xl border rounded-2xl overflow-hidden
        shadow-2xl hover:shadow-xl transition-all duration-500
        hover:scale-[1.02] hover:border-opacity-60
        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br 
        before:from-cyan-500/10 before:via-purple-500/10 before:to-pink-500/10
        group
        ${popular ? 'border-cyan-400/50 shadow-cyan-500/30' : 'border-cyan-400/30 shadow-cyan-500/20'}
        ${className}
      `}
      style={{
        animation: `glow 3s ease-in-out ${delay}ms infinite alternate`
      }}
    >
      {/* شبكة خلفية متحركة */}
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px] opacity-20" />
      
      {/* تأثير توهج للبطاقة الشعبية */}
      {popular && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-50" />
      )}
      
      {children}
    </div>
  );
};

// شكل ثلاثي الأبعاد عائم
const FloatingShape: React.FC<{ 
  type: 'cube' | 'sphere' | 'pyramid';
  className?: string;
  color?: 'cyan' | 'purple' | 'green';
}> = ({ 
  type, 
  className,
  color = 'cyan'
}) => {
  const colorClasses = {
    cyan: 'border-cyan-400/50 bg-cyan-400/10',
    purple: 'border-purple-400/50 bg-purple-400/10',
    green: 'border-green-400/50 bg-green-400/10'
  };

  return (
    <div className={cn(
      "absolute opacity-40 group-hover:opacity-70 transition-opacity duration-500",
      type === 'cube' && "w-6 h-6 animate-rotate-3d",
      type === 'sphere' && "w-8 h-8 animate-pulse-3d rounded-full",
      type === 'pyramid' && "w-7 h-7 animate-float-3d",
      colorClasses[color],
      className
    )}>
      <div className={cn(
        "absolute inset-0 border-2 backdrop-blur-sm",
        type === 'cube' && "",
        type === 'sphere' && "",
        type === 'pyramid' && "clip-path-pyramid"
      )} />
    </div>
  );
};

// Feature icon mapping معدل ليتناسب مع Genera
const getFeatureIcon = (feature: string) => {
  const featureLower = feature.toLowerCase();
  
  if (featureLower.includes('digital twin') || featureLower.includes('ai entity')) {
    return <Brain className="size-4 text-cyan-400" />;
  }
  if (featureLower.includes('neural') || featureLower.includes('cognitive')) {
    return <Cpu className="size-4 text-purple-400" />;
  }
  if (featureLower.includes('blockchain') || featureLower.includes('security')) {
    return <Shield className="size-4 text-green-400" />;
  }
  if (featureLower.includes('spatial') || featureLower.includes('vr') || featureLower.includes('ar')) {
    return <Globe className="size-4 text-pink-400" />;
  }
  if (featureLower.includes('network') || featureLower.includes('nodes')) {
    return <Network className="size-4 text-cyan-400" />;
  }
  if (featureLower.includes('community') || featureLower.includes('support')) {
    return <Users className="size-4 text-purple-400" />;
  }
  if (featureLower.includes('premium') || featureLower.includes('advanced')) {
    return <Diamond className="size-4 text-yellow-400" />;
  }
  if (featureLower.includes('cloud') || featureLower.includes('storage')) {
    return <Cloud className="size-4 text-blue-400" />;
  }
  
  // Default icon
  return <CheckIcon className="size-4 text-cyan-400" />;
};

// بيانات التسعير المعدلة للإصدار التجريبي المجاني


function PriceDisplay({ price, isCompact }: { price: string; isCompact?: boolean }) {
  return (
    <motion.span
      key={price}
      className={cn(
        "font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent",
        isCompact ? 'text-2xl' : 'text-5xl'
      )}
      initial={{
        opacity: 0,
        x: 10,
        filter: 'blur(5px)',
      }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {price}
    </motion.span>
  );
}

function PricingTierCard({
  tier,
  isCompact = false,
  isAuthenticated = false,
  onPlanSelect
}: {
  tier: PricingTier;
  isCompact?: boolean;
  isAuthenticated?: boolean;
  onPlanSelect?: (planId: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      if (tier.price === '$0') {
        // Free trial - redirect to signup
        window.location.href = '/auth?mode=signup';
      } else if (tier.price === '$99') {
        // Enterprise - redirect to contact
        window.location.href = '/contact';
      } else {
        // Beta plan - show coming soon
        toast.success('🎉 Beta program launching soon! Stay tuned for updates.');
      }
      
      onPlanSelect?.(tier.stripePriceId);
    } catch (error) {
      toast.error('Failed to process request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonConfig = () => {
    if (tier.price === '$0') {
      return {
        text: 'Start Free Journey',
        variant: 'default' as const,
        className: 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white'
      };
    } else if (tier.price === '$99') {
      return {
        text: 'Contact Our Team',
        variant: 'outline' as const,
        className: 'border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10'
      };
    } else {
      return {
        text: 'Join Beta Waitlist',
        variant: 'default' as const,
        className: 'bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 text-white'
      };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <NeonCard 
      delay={tier.isPopular ? 200 : 0} 
      popular={tier.isPopular}
      className={cn("h-full min-h-[500px] flex flex-col", isCompact && "min-h-[400px]")}
    >
      {/* أشكال ثلاثية الأبعاد عائمة */}
      <FloatingShape type="cube" className="top-4 left-4" color="cyan" />
      <FloatingShape type="sphere" className="top-6 right-6" color="purple" />
      <FloatingShape type="pyramid" className="bottom-4 left-6" color="green" />
      
      <div className="relative z-10 flex flex-col h-full p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-cyan-200">{tier.name}</h3>
            {tier.isPopular && (
              <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-cyan-500/25">
                🚀 MOST POPULAR
              </span>
            )}
          </div>
          
          <div className="flex items-baseline gap-2">
            <PriceDisplay price={tier.price} isCompact={isCompact} />
            {tier.price !== '$0' && (
              <span className="text-cyan-200/70 text-lg">/month</span>
            )}
          </div>
          
          <p className="text-cyan-200/80 text-sm leading-relaxed">
            {tier.description}
          </p>
        </div>

        {/* Features */}
        <div className="flex-grow mb-6">
          <ul className="space-y-4">
            {tier.features.map((feature, index) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-xl bg-black/40 border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  {getFeatureIcon(feature)}
                </div>
                <span className="text-cyan-100/90 text-sm leading-relaxed">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Button
            onClick={handleAction}
            disabled={isLoading}
            variant={buttonConfig.variant}
            className={cn(
              "w-full h-12 font-bold text-base rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl",
              buttonConfig.className,
              isLoading && "animate-pulse"
            )}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="size-4" />
                <span>{buttonConfig.text}</span>
              </div>
            )}
          </Button>
          
          {/* Badge تجريبي */}
          <div className="text-center mt-3">
            <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium px-2 py-1 rounded-full border border-yellow-400/30">
              <Zap className="size-3" />
              BETA ACCESS
            </span>
          </div>
        </div>
      </div>
    </NeonCard>
  );
}

interface PricingSectionProps {
  returnUrl?: string;
  showTitleAndTabs?: boolean;
  insideDialog?: boolean;
  onSubscriptionUpdate?: () => void;
}

export function PricingSection({
  returnUrl = typeof window !== 'undefined' ? window.location.href : '/',
  showTitleAndTabs = true,
  insideDialog = false,
  onSubscriptionUpdate,
}: PricingSectionProps) {
  const { user } = useAuth();
  const isUserAuthenticated = !!user;
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  return (
    <section
      id="pricing"
      className="flex flex-col items-center justify-center w-full relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 py-20"
    >
      {/* خلفية متحركة */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {showTitleAndTabs && (
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold tracking-tighter text-center text-balance pb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Join the Digital Civilization
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-cyan-200/80 text-center text-balance font-medium text-lg max-w-3xl mx-auto"
            >
              Start your journey with our free beta program. Experience the future of decentralized intelligence 
              and help shape the next digital civilization.
            </motion.p>
          </SectionHeader>
        )}

        {/* شارة تجريبية */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-2xl px-6 py-3 shadow-2xl shadow-cyan-500/25">
            <Sparkles className="size-5 text-cyan-400" />
            <span className="text-cyan-200 font-bold text-lg">FREE BETA PROGRAM</span>
            <span className="text-cyan-200/70 text-sm">Limited Time Offer</span>
          </div>
        </motion.div>

        {/* شبكة البطاقات */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={cn(
            "grid gap-8 w-full mt-12",
            insideDialog
              ? "grid-cols-1"
              : "grid-cols-1 lg:grid-cols-3"
          )}
        >
          
        </motion.div>

        {/* معلومات إضافية */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <NeonCard className="max-w-4xl mx-auto border-cyan-400/20">
            <div className="text-center p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Brain className="size-8 text-cyan-400" />
                <h3 className="text-2xl font-bold text-cyan-200">
                  What's Included in Beta?
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[
                  { icon: Shield, text: 'Full Security Suite' },
                  { icon: Network, text: 'Blockchain Access' },
                  { icon: Globe, text: 'Spatial Computing' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 justify-center">
                    <item.icon className="size-5 text-cyan-400" />
                    <span className="text-cyan-200 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              <p className="text-cyan-100/80 text-lg max-w-2xl mx-auto">
                All beta users get complete access to our neural network infrastructure, 
                blockchain security protocols, and spatial computing interfaces. 
                Help us build the future of digital civilization.
              </p>
            </div>
          </NeonCard>
        </motion.div>
      </div>

      {/* الأنماط العالمية */}
      <style jsx global>{`
        @keyframes glow {
          0% {
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.3),
                        inset 0 0 20px rgba(34, 211, 238, 0.1);
          }
          100% {
            box-shadow: 0 0 30px rgba(34, 211, 238, 0.5),
                        0 0 40px rgba(168, 85, 247, 0.3),
                        inset 0 0 30px rgba(34, 211, 238, 0.2);
          }
        }

        @keyframes rotate-3d {
          0% { transform: rotateY(0deg) rotateX(0deg); }
          100% { transform: rotateY(360deg) rotateX(360deg); }
        }

        @keyframes pulse-3d {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes float-3d {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-8px) rotateX(10deg); }
        }

        .animate-rotate-3d {
          animation: rotate-3d 8s linear infinite;
        }

        .animate-pulse-3d {
          animation: pulse-3d 4s ease-in-out infinite;
        }

        .animate-float-3d {
          animation: float-3d 3s ease-in-out infinite;
        }

        .clip-path-pyramid {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        .bg-grid-white\\/5 {
          background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
}

// Helper function for class names
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}