"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Eye,
  Globe,
  Zap,
  Sparkles,
  Cpu,
  Shield,
  Users,
  Code,
  Video,
  Box,
 Torus,
  Layout,
  Scan,
  
  
  
  
  ScanEye
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Spatial Computing 3D Background
const SpatialComputing3DBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Holographic Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="animate-pulse">
          <defs>
            <linearGradient id="hologram-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#FF00FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00FF00" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {/* 3D Grid Lines */}
          {Array.from({ length: 15 }).map((_, i) => (
            <g key={i}>
              <path
                d={`M${i * 7} 0 L${i * 7} 100`}
                stroke="url(#hologram-glow)"
                strokeWidth="0.2"
                strokeDasharray="2,2"
              />
              <path
                d={`M0 ${i * 7} L100 ${i * 7}`}
                stroke="url(#hologram-glow)"
                strokeWidth="0.2"
                strokeDasharray="2,2"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Floating Holographic Cubes */}
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="absolute transform animate-float"
          style={{
            left: `${15 + (i % 3) * 30}%`,
            top: `${20 + Math.floor(i / 3) * 25}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${8 + (i % 4)}s`
          }}
        >
          <div className={cn(
            "w-8 h-8 border-2 transform rotate-45 transition-all duration-1000 hover:rotate-180 hover:scale-150",
            i % 3 === 0 ? "border-cyan-400 shadow-[0_0_25px_#00FFFF]" :
            i % 3 === 1 ? "border-purple-400 shadow-[0_0_25px_#FF00FF]" :
            "border-green-400 shadow-[0_0_25px_#00FF00]"
          )}>
            <div className="absolute inset-1 bg-gradient-to-br from-cyan-400 to-purple-400 opacity-40"></div>
          </div>
        </div>
      ))}

      {/* AR Data Points */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            backgroundColor: `hsl(${180 + Math.random() * 90}, 100%, 65%)`
          }}
        />
      ))}

      {/* Spatial Scan Lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-pulse"
            style={{
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 0.8}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Feature Card Component for Spatial Computing
const SpatialFeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  stats,
  gradient,
  delay 
}: {
  icon: any;
  title: string;
  description: string;
  stats?: string;
  gradient: string;
  delay: number;
}) => (
  <div 
    className="group relative p-8 bg-black/40 backdrop-blur-sm border border-cyan-400/20 rounded-2xl hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
    style={{ 
      animationDelay: `${delay}ms`,
      boxShadow: '0 0 40px rgba(0, 255, 255, 0.1)'
    }}
  >
    {/* Holographic Background Effect */}
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
    
    {/* Icon with Holographic Effect */}
    <div className={`p-4 rounded-xl bg-gradient-to-br ${gradient} w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-[0_0_30px_currentColor]`}>
      <Icon className="w-8 h-8 text-white" />
    </div>

    {/* Content */}
    <h3 className="text-2xl font-bold text-cyan-300 mb-3 group-hover:text-cyan-200 transition-colors">
      {title}
    </h3>
    <p className="text-cyan-200/70 text-lg leading-relaxed mb-4 group-hover:text-cyan-200 transition-colors">
      {description}
    </p>
    
    {stats && (
      <div className="flex items-center space-x-2 text-cyan-400 group-hover:text-cyan-300 transition-colors">
        <Zap className="w-4 h-4 animate-pulse" />
        <span className="font-semibold text-sm">{stats}</span>
      </div>
    )}

    {/* Holographic Border Effect */}
    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-cyan-400/30 transition-all duration-500"></div>
  </div>
);

// Interactive AR Demo Component
const InteractiveARDemo = () => {
  const [activeLayer, setActiveLayer] = useState(0);
  
  const layers = [
    { icon: Eye, title: "Reality Capture", color: "from-cyan-500 to-blue-500" },
    { icon: Scan, title: "Spatial Mapping", color: "from-purple-500 to-pink-500" },
    { icon: ScanEye, title: "3D Object Rendering", color: "from-green-500 to-emerald-500" },
    { icon: ScanEye, title: "Immersive Interaction", color: "from-orange-500 to-red-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % layers.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [layers.length]);

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-8 group hover:border-cyan-400/40 transition-all duration-500">
      <h3 className="text-2xl font-bold text-cyan-300 mb-6 text-center">Spatial Reality Layers</h3>
      
      <div className="relative h-48 mb-6">
        {/* Central Reality Core */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        
        </div>

        {/* Orbiting AR Elements */}
        {layers.map((_, index) => (
          <div
            key={index}
            className={cn(
              "absolute w-10 h-10 rounded-lg transform rotate-45 border-2 transition-all duration-500 flex items-center justify-center",
              activeLayer === index 
                ? `${layers[index].color} border-white scale-125 shadow-[0_0_25px_currentColor]` 
                : "from-gray-600 to-gray-800 border-gray-500 scale-100"
            )}
            style={{
              top: `${50 + 50 * Math.sin((index * Math.PI) / 2)}%`,
              left: `${50 + 50 * Math.cos((index * Math.PI) / 2)}%`,
              transform: `translate(-50%, -50%) rotate(45deg) ${activeLayer === index ? 'scale(1.3)' : 'scale(1)'}`,
              animationDelay: `${index * 0.5}s`
            }}
          >
            <div className="transform -rotate-45">
              <div className={cn(
                "w-2 h-2 rounded-full",
                activeLayer === index ? "bg-white" : "bg-gray-400"
              )} />
            </div>
          </div>
        ))}

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="connection-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF00FF" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {layers.map((_, index) => (
            <line
              key={index}
              x1="50%"
              y1="50%"
              x2={`${50 + 50 * Math.cos((index * Math.PI) / 2)}%`}
              y2={`${50 + 50 * Math.sin((index * Math.PI) / 2)}%`}
              stroke="url(#connection-glow)"
              strokeWidth="1"
              strokeDasharray="3,3"
              className="animate-pulse"
              style={{ animationDelay: `${index * 0.3}s` }}
            />
          ))}
        </svg>
      </div>

      <div className="text-center">
        <h4 className={cn(
          "text-xl font-semibold mb-2 transition-colors duration-500",
          activeLayer === 0 ? "text-cyan-300" :
          activeLayer === 1 ? "text-purple-300" :
          activeLayer === 2 ? "text-green-300" :
          "text-orange-300"
        )}>
          {layers[activeLayer].title}
        </h4>
        <p className="text-cyan-200/60 text-sm">
          {layers[activeLayer].title === "Reality Capture" && "Real-time environment scanning and object detection"}
          {layers[activeLayer].title === "Spatial Mapping" && "Creating digital twins of physical spaces"}
          {layers[activeLayer].title === "3D Object Rendering" && "Holographic projections and virtual objects"}
          {layers[activeLayer].title === "Immersive Interaction" && "Natural gesture and voice controls"}
        </p>
      </div>
    </div>
  );
};

// Stats Card Component
const SpatialStatCard = ({ value, label, icon: Icon, trend }: {
  value: string;
  label: string;
  icon: any;
  trend?: string;
}) => (
  <div className="bg-black/40 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 text-center hover:border-cyan-400/40 hover:scale-105 transition-all duration-300 group">
    <Icon className="w-8 h-8 mx-auto mb-3 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
    <div className="text-3xl font-bold text-cyan-300 mb-2">{value}</div>
    <div className="text-cyan-200/60 text-sm">{label}</div>
    {trend && (
      <div className="text-green-400 text-xs mt-2 flex items-center justify-center">
        <Sparkles className="w-3 h-3 mr-1" />
        {trend}
      </div>
    )}
  </div>
);

export function TriggersPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Cpu,
      title: "Seamless Reality Fusion",
      description: "Blend physical and digital worlds with millimeter precision, creating unified experiences that transcend traditional boundaries.",
      stats: "0.1mm Precision",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Box,
      title: "Holographic Interfaces",
      description: "Interact with 3D holograms using natural gestures, voice commands, and eye tracking for intuitive digital experiences.",
      stats: "120FPS Rendering",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Torus,
      title: "Spatial Intelligence",
      description: "AI-powered spatial understanding that enables digital twins to interact meaningfully with physical environments.",
      stats: "99.9% Accuracy",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: ScanEye,
      title: "Real-time Environment Mapping",
      description: "Instantaneous scanning and digital replication of physical spaces with dynamic object recognition and tracking.",
      stats: "60ms Latency",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Layout,
      title: "Cross-Reality Continuum",
      description: "Seamlessly transition between AR, VR, and mixed reality while maintaining context and interaction continuity.",
      stats: "Zero Context Loss",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: Video,
      title: "Immersive Digital Twins",
      description: "Create living digital replicas of physical objects and spaces that evolve and learn from real-world interactions.",
      stats: "10M+ Digital Twins",
      gradient: "from-yellow-500 to-amber-500"
    }
  ];

  const stats = [
    { icon: Eye, value: "5M+", label: "AR Sessions", trend: "+40% monthly" },
    { icon: Globe, value: "99.8%", label: "Tracking Accuracy", trend: "Industry leading" },
    { icon: Zap, value: "2ms", label: "Response Time", trend: "Near instant" },
    { icon: Users, value: "150+", label: "Countries Supported", trend: "Global coverage" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/10 to-cyan-900/10 relative overflow-hidden">
      <SpatialComputing3DBackground />
      
      <div className="relative z-10">
        {/* Header Section */}
        <div className="container mx-auto px-4 py-16 text-center">
          <Badge className="mb-6 bg-cyan-500/20 text-cyan-300 border-cyan-400/30 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            The Future of Spatial Computing
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-green-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_#00FFFF]">
              Spatial Intelligence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-cyan-200/80 max-w-4xl mx-auto leading-relaxed mb-8">
            Step into a world where digital and physical realities merge seamlessly. 
            Experience holographic interfaces, spatial AI, and immersive environments that redefine human-computer interaction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] border-0">
              <ScanEye className="w-5 h-5 mr-2" />
              Experience AR Demo
            </Button>
            <Button variant="outline" className="border-cyan-400 text-cyan-300 hover:bg-cyan-500/10 px-8 py-4 text-lg rounded-xl transition-all duration-300">
              <Code className="w-5 h-5 mr-2" />
              Spatial SDK
            </Button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <SpatialStatCard key={index} {...stat} />
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-300 mb-4">
              Next-Generation Reality Platform
            </h2>
            <p className="text-cyan-200/70 text-xl max-w-3xl mx-auto">
              Powered by advanced computer vision, spatial AI, and real-time rendering technologies
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <SpatialFeatureCard
                key={index}
                {...feature}
                delay={index * 100}
              />
            ))}
          </div>
        </div>

        {/* Interactive Demo Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <InteractiveARDemo />
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="bg-black/40 backdrop-blur-sm border border-cyan-400/20 rounded-3xl p-12 max-w-4xl mx-auto hover:border-cyan-400/40 transition-all duration-500">
            <ScanEye className="w-16 h-16 text-cyan-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-4">
              Transform Your Reality
            </h2>
            <p className="text-cyan-200/70 text-lg mb-8 max-w-2xl mx-auto">
              Join the spatial computing revolution. Create immersive experiences, 
              build digital twins, and shape the future of human-computer interaction.
            </p>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-12 py-6 text-xl rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,255,255,0.5)] border-0">
              <Sparkles className="w-6 h-6 mr-3" />
              Start Spatial Journey
            </Button>
          </div>
        </div>
      </div>

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
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        @keyframes hologramPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        .animate-hologram {
          animation: hologramPulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}