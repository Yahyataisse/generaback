'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Ripple } from '@/components/ui/ripple';

interface PageHeaderProps {
  icon: LucideIcon;
  children: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ icon: Icon, children }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl flex items-center justify-center border border-cyan-400/20 bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-sm shadow-2xl shadow-cyan-500/10">
      {/* Enhanced Neon Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 grid-rows-4 gap-8 w-full h-full">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="border border-cyan-400/20 rounded-lg animate-pulse"
                style={{
                  animationDelay: `${(i % 8) * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Neural Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute transform animate-float"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + (Math.sin(i) * 40)}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${6 + (i % 3)}s`
            }}
          >
            <div className={`
              w-2 h-2 rounded-full border-2
              ${i % 4 === 0 ? "border-cyan-400 shadow-[0_0_10px_#00FFFF]" :
                i % 4 === 1 ? "border-purple-400 shadow-[0_0_10px_#FF00FF]" :
                i % 4 === 2 ? "border-green-400 shadow-[0_0_10px_#00FF00]" :
                "border-blue-400 shadow-[0_0_10px_#0088FF]"}
            `} />
          </div>
        ))}

        {/* Data Stream Lines */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-40 animate-pulse"
            style={{
              top: `${30 + i * 20}%`,
              left: '0%',
              width: '100%',
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}

        {/* Corner Glow Effects */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative px-8 py-16 text-center z-10">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Enhanced Icon Container */}
          <div className="relative inline-flex items-center justify-center">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
            
            {/* Main Icon Container */}
            <div className="relative z-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 p-4 shadow-2xl shadow-cyan-500/20 backdrop-blur-sm">
              <Icon className="h-10 w-10 text-cyan-300 drop-shadow-[0_0_15px_#00FFFF]" />
            </div>

            {/* Orbiting Particles */}
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="absolute w-3 h-3 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full shadow-lg animate-orbital"
                style={{
                  animationDelay: `${index * 0.5}s`,
                  animationDuration: '4s'
                }}
              />
            ))}
          </div>

          {/* Enhanced Title */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_#00FFFF] animate-pulse">
                Digital Twins
              </span>
            </h1>
            
            {/* Subtitle Glow Effect */}
            <div className="absolute inset-x-0 -bottom-4 h-8 bg-cyan-400/10 blur-xl rounded-full"></div>
          </div>

          {/* Additional Decorative Elements */}
          <div className="flex justify-center items-center gap-6 opacity-60">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`
                  w-2 h-2 rounded-full animate-pulse
                  ${i === 0 ? "bg-cyan-400" : i === 1 ? "bg-purple-400" : "bg-green-400"}
                `}></div>
                <div className={`
                  w-12 h-0.5 rounded-full
                  ${i === 0 ? "bg-cyan-400/30" : i === 1 ? "bg-purple-400/30" : "bg-green-400/30"}
                `}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Ripple with Neon Effects */}
      <div className="absolute inset-0">
        <Ripple />
        {/* Additional Ripple Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
      </div>

      {/* Border Glow Effect */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-cyan-400/20 bg-clip-padding backdrop-blur-sm"></div>
    </div>
  );
};

// Enhanced Global styles for animations
const styles = `
  @keyframes float {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg) scale(1); 
    }
    25% { 
      transform: translateY(-15px) rotate(90deg) scale(1.1); 
    }
    50% { 
      transform: translateY(-8px) rotate(180deg) scale(0.95); 
    }
    75% { 
      transform: translateY(-12px) rotate(270deg) scale(1.05); 
    }
  }
  
  @keyframes orbital {
    0% {
      transform: translate(-50%, -50%) rotate(0deg) translateX(50px) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg) translateX(50px) rotate(-360deg);
    }
  }
  
  @keyframes pulse-glow {
    0%, 100% { 
      opacity: 0.4;
      filter: drop-shadow(0 0 10px currentColor);
    }
    50% { 
      opacity: 0.8;
      filter: drop-shadow(0 0 20px currentColor);
    }
  }
  
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  
  .animate-orbital {
    animation: orbital 4s linear infinite;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 3s ease-in-out infinite;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}