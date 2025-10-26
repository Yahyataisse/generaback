'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { 
  Brain, 
  Cpu, 
  Database, 
  Network, 
  Shield, 
  Zap, 
  ExternalLink,
  Sparkles,
  Globe,
  Users,
  Code,
  Lock
} from 'lucide-react';

// Blockchain 3D Shapes Component - Enhanced
const Blockchain3DShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Neural Network Lines */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="animate-pulse">
          <defs>
            <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF00FF" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d={`M${Math.random() * 100} ${Math.random() * 100} 
                  L${Math.random() * 100} ${Math.random() * 100}
                  L${Math.random() * 100} ${Math.random() * 100}`}
              stroke="url(#neural-gradient)"
              strokeWidth="0.5"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Floating AI Cubes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 transform animate-float"
          style={{
            left: `${10 + (i * 7)}%`,
            top: `${20 + (Math.sin(i) * 30)}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${8 + (i % 4)}s`
          }}
        >
          <div className="w-full h-full border border-cyan-400/50 shadow-[0_0_15px_#00FFFF] transform rotate-45 transition-all duration-1000 hover:rotate-180 hover:scale-150 hover:shadow-[0_0_30px_#FF00FF]"></div>
        </div>
      ))}

      {/* Blockchain Nodes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full animate-ping"
          style={{
            left: `${15 + (i * 15)}%`,
            top: `${70 + (Math.cos(i) * 20)}%`,
            animationDelay: `${i * 0.3}s`,
            backgroundColor: i % 3 === 0 ? '#00FFFF' : i % 3 === 1 ? '#FF00FF' : '#00FF00'
          }}
        />
      ))}

      {/* Data Flow Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};

// Feature Cards Component
const FeatureCard = ({ icon: Icon, title, description, gradient, delay }: {
  icon: any;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}) => (
  <div 
    className="group relative p-6 bg-black/40 backdrop-blur-sm border border-cyan-400/20 rounded-xl hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
    style={{ 
      animationDelay: `${delay}ms`,
      boxShadow: '0 0 30px rgba(0, 255, 255, 0.1)'
    }}
  >
    <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
      {title}
    </h3>
    <p className="text-cyan-100/70 text-sm leading-relaxed group-hover:text-cyan-100 transition-colors">
      {description}
    </p>
    
    {/* Hover effect */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>
);

// Statistics Component
const StatCard = ({ value, label, icon: Icon, color }: {
  value: string;
  label: string;
  icon: any;
  color: string;
}) => (
  <div className="text-center p-4 bg-black/30 backdrop-blur-sm border border-cyan-400/10 rounded-lg hover:border-cyan-400/30 transition-all duration-300">
    <Icon className={`w-8 h-8 mx-auto mb-2 ${color}`} />
    <div className="text-2xl font-bold text-cyan-300 mb-1">{value}</div>
    <div className="text-cyan-200/60 text-sm">{label}</div>
  </div>
);

// Enhanced Neon External Button
const NeonExternalButton = ({ onClick, isLoading = false }) => {
  return (
    <button
      data-tour="external-button"
      onClick={onClick}
      disabled={isLoading}
      className="group relative px-12 py-6 bg-black/80 backdrop-blur-sm border-2 border-cyan-400 rounded-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-[0_0_50px_#00FFFF,0_0_100px_#00FFFF,0_0_150px_#00FFFF] hover:shadow-[0_0_60px_#00FFFF,0_0_120px_#00FFFF,0_0_180px_#00FFFF] font-bold text-xl tracking-wider uppercase overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 group-hover:from-cyan-500/20 group-hover:via-purple-500/20 group-hover:to-cyan-500/20 transition-all duration-500"></div>
      
      {/* Neon border animation */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
      <div className="absolute inset-[2px] rounded-2xl bg-black/80 backdrop-blur-sm"></div>
      
      {/* Button content */}
      <div className="relative flex items-center justify-center space-x-4">
        <Sparkles className="w-6 h-6 text-cyan-300 animate-pulse" />
        <span className="text-cyan-300 drop-shadow-[0_0_10px_#00FFFF] bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
          Launch Blockchain Platform
        </span>
        <ExternalLink className="w-6 h-6 text-cyan-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
      </div>

      {/* Loading animation */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/90 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-cyan-300 text-sm">Connecting...</span>
          </div>
        </div>
      )}

      {/* Particle effects on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </button>
  );
};

export function DashboardContent() {
  const [isExternalLoading, setIsExternalLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Feature cards data
  const features = [
    {
      icon: Brain,
      title: "Digital Twins",
      description: "Autonomous AI entities that evolve with you, creating personalized intelligence companions.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Network,
      title: "Decentralized Intelligence",
      description: "Break free from centralized AI silos with our distributed cognitive network architecture.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Data Sovereignty",
      description: "Complete ownership and control over your data with blockchain-verified identity management.",
      gradient: "from-green-500 to-cyan-500"
    },
    {
      icon: Cpu,
      title: "Spatial Computing",
      description: "Seamlessly merge physical and digital realities with advanced AR/VR integration.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Database,
      title: "Proof of Intelligence",
      description: "Revolutionary consensus mechanism that rewards cognitive contributions, not computational waste.",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "Intelligence Economy",
      description: "Participate in the world's first economy where knowledge and AI collaboration generate real value.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  // Statistics data
  const stats = [
    { icon: Users, value: "2.4M+", label: "Digital Twins", color: "text-cyan-400" },
    { icon: Globe, value: "156+", label: "Countries", color: "text-purple-400" },
    { icon: Code, value: "98.7%", label: "Uptime", color: "text-green-400" },
    { icon: Lock, value: "256-bit", label: "Encryption", color: "text-orange-400" }
  ];

  // Handle external platform navigation
  const handleExternalNavigation = useCallback(() => {
    setIsExternalLoading(true);
    
    // Simulate API connection and navigation
    setTimeout(() => {
      const externalUrl = 'https://genera-blockchain-platform.com';
      window.open(externalUrl, '_blank');
      
      // Reset loading state after a short delay
      setTimeout(() => setIsExternalLoading(false), 1000);
    }, 2000);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-gradient-to-br from-black via-purple-900/20 to-cyan-900/20 relative">
      
      {/* Enhanced 3D Background */}
      <Blockchain3DShapes />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="min-h-full flex flex-col">
          
          {/* Hero Section */}
          <div className="px-4 py-12 md:py-20">
            <div className="w-full max-w-6xl mx-auto">
              
              {/* Main Title & Description */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-3 mb-6 px-6 py-3 bg-cyan-500/10 border border-cyan-400/30 rounded-full backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <span className="text-cyan-300 text-sm font-medium">
                    The Future of Digital Civilization is Here
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_#00FFFF]">
                    Welcome to Genera
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-cyan-200/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Experience the next evolution of digital life where{' '}
                  <span className="text-cyan-300 font-semibold">AI, Blockchain, and Reality</span>{' '}
                  converge into a unified intelligent civilization.
                </p>
              </div>

              {/* Main CTA Button */}
              <div className="flex justify-center mb-20">
                <NeonExternalButton 
                  onClick={handleExternalNavigation}
                  isLoading={isExternalLoading}
                />
              </div>

              {/* Statistics Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </div>

              {/* Features Grid */}
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-cyan-300 mb-12">
                  The Architecture of Tomorrow
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, index) => (
                    <FeatureCard
                      key={index}
                      {...feature}
                      delay={index * 100}
                    />
                  ))}
                </div>
              </div>

              {/* Technology Stack Preview */}
              <div className="bg-black/40 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-8 mb-16">
                <h3 className="text-2xl font-bold text-cyan-300 text-center mb-8">
                  Powered by Advanced Technology Stack
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  {['AI Neural Networks', 'Blockchain 4.0', 'Quantum Security', 'Spatial OS'].map((tech, index) => (
                    <div key={index} className="p-4">
                      <div className="w-3 h-3 bg-cyan-400 rounded-full mx-auto mb-2 animate-pulse"></div>
                      <div className="text-cyan-200 text-sm font-medium">{tech}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg) scale(1); 
          }
          33% { 
            transform: translateY(-20px) rotate(120deg) scale(1.1); 
          }
          66% { 
            transform: translateY(-10px) rotate(240deg) scale(0.9); 
          }
        }
        
        @keyframes neuralPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-neural {
          animation: neuralPulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}