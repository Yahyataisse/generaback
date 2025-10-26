'use client';

import React from 'react';
import { Bot, Search, Plus, Sparkles, Brain, Cpu, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  hasAgents: boolean;
  onCreateAgent: () => void;
  onClearFilters: () => void;
}

// 3D Neon Background without lines
const Neon3DBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Cognitive Elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute transform animate-float"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${20 + (Math.sin(i) * 30)}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${8 + (i % 4)}s`
          }}
        >
          <div className={cn(
            "w-8 h-8 rounded-xl border-2 flex items-center justify-center shadow-lg",
            i % 4 === 0 ? "border-cyan-400 shadow-[0_0_15px_#00FFFF] bg-cyan-400/10" :
            i % 4 === 1 ? "border-purple-400 shadow-[0_0_15px_#FF00FF] bg-purple-400/10" :
            i % 4 === 2 ? "border-green-400 shadow-[0_0_15px_#00FF00] bg-green-400/10" :
            "border-blue-400 shadow-[0_0_15px_#0088FF] bg-blue-400/10"
          )}>
            {i % 4 === 0 ? <Brain className="w-4 h-4 text-cyan-400" /> :
             i % 4 === 1 ? <Cpu className="w-4 h-4 text-purple-400" /> :
             i % 4 === 2 ? <Network className="w-4 h-4 text-green-400" /> :
             <Bot className="w-4 h-4 text-blue-400" />}
          </div>
        </div>
      ))}

      {/* Floating Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: `hsl(${200 + Math.random() * 160}, 100%, 65%)`
          }}
        />
      ))}
    </div>
  );
};

// Animated Main Icon
const AnimatedMainIcon = ({ hasAgents }: { hasAgents: boolean }) => {
  return (
    <div className="relative">
      {/* Main Icon Container */}
      <div className={cn(
        "relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-1000",
        hasAgents 
          ? "bg-gradient-to-br from-purple-500 to-purple-600 shadow-purple-500/30" 
          : "bg-gradient-to-br from-cyan-500 to-purple-500 shadow-cyan-500/30"
      )}>
        {!hasAgents ? (
          <Bot className="w-8 h-8 text-white" />
        ) : (
          <Search className="w-8 h-8 text-white" />
        )}
      </div>

      {/* Orbiting Sparkles for creation state */}
      {!hasAgents && (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="absolute w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-orbital"
              style={{
                animationDelay: `${index * 0.5}s`,
                animationDuration: '3s'
              }}
            >
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          ))}
        </>
      )}

      {/* Pulsing Glow Effect */}
      <div className={cn(
        "absolute inset-0 w-20 h-20 rounded-2xl blur-xl opacity-30 animate-pulse",
        hasAgents ? "bg-purple-400" : "bg-cyan-400"
      )} />
    </div>
  );
};

export const EmptyState = ({ hasAgents, onCreateAgent, onClearFilters }: EmptyStateProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center py-16 px-4 min-h-[400px] overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-cyan-400/20">
      {/* 3D Background */}
      <Neon3DBackground />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-md space-y-6">
        {/* Animated Icon */}
        <AnimatedMainIcon hasAgents={hasAgents} />

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
            {!hasAgents ? 'No Digital Twins Yet' : 'No Entities Found'}
          </h2>
          
          <p className="text-cyan-100/80 leading-relaxed">
            {!hasAgents ? (
              <>
                Create your first <span className="text-cyan-300 font-semibold">Digital Twin</span> to start your journey in the intelligent ecosystem. 
                Configure cognitive capabilities and join the decentralized network.
              </>
            ) : (
              'No digital twins match your current search criteria. Try adjusting your filters or search terms.'
            )}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {!hasAgents ? (
            <Button 
              size="lg" 
              onClick={onCreateAgent}
              className="gap-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border-0 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20"
            >
              <Plus className="h-5 w-5" />
              Create First Digital Twin
              <Sparkles className="h-4 w-4 animate-pulse" />
            </Button>
          ) : (
            <Button 
              variant="outline"
              onClick={onClearFilters}
              className="gap-2 border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200 font-semibold px-6 py-3 rounded-xl transition-all duration-300"
            >
              <Search className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Additional Info */}
        {!hasAgents && (
          <div className="pt-4 border-t border-cyan-400/20">
            <div className="flex items-center justify-center gap-4 text-xs text-cyan-300/60">
              <div className="flex items-center gap-1">
                <Brain className="w-3 h-3" />
                AI-Powered
              </div>
              <div className="flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                Autonomous
              </div>
              <div className="flex items-center gap-1">
                <Network className="w-3 h-3" />
                Connected
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Utility function for class names
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

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
      transform: translateY(-5px) rotate(240deg) scale(0.95); 
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