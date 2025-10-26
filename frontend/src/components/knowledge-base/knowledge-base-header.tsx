'use client';

import React from 'react';
import { BookOpen, Brain, Network, Database, Sparkles, Cpu } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { cn } from '@/lib/utils';

// Blockchain 3D Background Component for Header
const KnowledgeBase3DBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Knowledge Cubes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute transform animate-float"
          style={{
            left: `${15 + (i * 15)}%`,
            top: `${30 + (Math.sin(i) * 20)}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${7 + (i % 3)}s`
          }}
        >
          <div className={cn(
            "w-6 h-6 border-2 transform rotate-45 transition-all duration-1000 hover:rotate-180 hover:scale-150",
            i % 3 === 0 ? "border-cyan-400 shadow-[0_0_20px_#00FFFF]" :
            i % 3 === 1 ? "border-purple-400 shadow-[0_0_20px_#FF00FF]" :
            "border-green-400 shadow-[0_0_20px_#00FF00]"
          )}>
            <div className="absolute inset-1 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-sm opacity-60"></div>
          </div>
        </div>
      ))}

      {/* Data Stream Lines */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-transparent opacity-40 animate-pulse"
          style={{
            top: `${40 + i * 15}%`,
            left: '0%',
            width: '100%',
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}

      {/* Neural Network Dots */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            backgroundColor: `hsl(${200 + Math.random() * 160}, 100%, 65%)`
          }}
        />
      ))}

      {/* Blockchain Chain Effect */}
      <div className="absolute top-10 right-20">
        <div className="flex space-x-1 animate-pulse">
          <div className="w-2 h-4 bg-cyan-400 shadow-[0_0_10px_#00FFFF] rounded-sm"></div>
          <div className="w-2 h-4 bg-purple-400 shadow-[0_0_10px_#FF00FF] rounded-sm"></div>
          <div className="w-2 h-4 bg-cyan-400 shadow-[0_0_10px_#00FFFF] rounded-sm"></div>
          <div className="w-2 h-4 bg-purple-400 shadow-[0_0_10px_#FF00FF] rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};

// Animated Icon Component
const AnimatedKnowledgeIcon = () => {
  return (
    <div className="relative">
      <div className="relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/30 animate-pulse">
          <Database className="w-8 h-8 text-white" />
        </div>
      </div>
      
      {/* Orbiting Icons */}
      {[Brain, Network, Database, Cpu].map((Icon, index) => (
        <div
          key={index}
          className="absolute w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center shadow-lg animate-orbital"
          style={{
            top: '50%',
            left: '50%',
            animationDelay: `${index * 0.5}s`,
            animationDuration: '3s'
          }}
        >
          <Icon className="w-4 h-4 text-white" />
        </div>
      ))}
      
      {/* Pulsing Glow Effect */}
      <div className="absolute inset-0 w-16 h-16 bg-cyan-400 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
    </div>
  );
};

export const KnowledgeBasePageHeader = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-black via-purple-900/20 to-cyan-900/20 rounded-2xl border border-cyan-400/20 p-8 mb-8">
      {/* 3D Background */}
      <KnowledgeBase3DBackground />
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left Section - Icon and Main Title */}
          <div className="flex items-start gap-6 flex-1">
            <AnimatedKnowledgeIcon />
            
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-4 flex-wrap">
                <h1 className="text-4xl lg:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_#00FFFF]">
                    Data training market
                  </span>
                </h1>
                <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full">
                  <Sparkles className="w-3 h-3 text-cyan-300 animate-pulse" />
                  <span className="text-xs font-medium text-cyan-300">AI Powered</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-xl  items-center  text-cyan-100 font-medium leading-relaxed">
                  Centralized Intelligence Repository
                </p>
                
                
              </div>
            </div>
          </div>

          {/* Right Section - Status Indicator */}
          
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl"></div>
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-400/10 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

// Global styles for animations
const styles = `
  @keyframes float {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg) scale(1); 
    }
    33% { 
      transform: translateY(-10px) rotate(120deg) scale(1.1); 
    }
    66% { 
      transform: translateY(-5px) rotate(240deg) scale(0.9); 
    }
  }
  
  @keyframes orbital {
    0% {
      transform: translate(-50%, -50%) rotate(0deg) translateX(40px) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg) translateX(40px) rotate(-360deg);
    }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-orbital {
    animation: orbital 3s linear infinite;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}