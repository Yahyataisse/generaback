'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DataTable, DataTableColumn } from '@/components/ui/data-table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Eye,
  EyeOff,
  Copy,
  Settings,
  ExternalLink,
  Crown,
  Search,
  X,
  Plus,
  CheckCircle2,
  XCircle,
  Trash2,
  Cpu,
  Network,
  Users,
  Globe,
  Brain,
  Shield,
  Zap,
  Cloud,
  Server,
  Code,
  Lock,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const NeonCard: React.FC<NeonCardProps> = ({ children, className, delay = 0 }) => {
  return (
    <div 
      className={cn(
        "relative bg-black/80 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6",
        "shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-all duration-500",
        "hover:border-cyan-400/60 hover:scale-105",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-cyan-500/10 before:via-purple-500/10 before:to-pink-500/10",
        "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-tl after:from-cyan-500/5 after:via-transparent after:to-purple-500/5",
        className
      )}
      style={{
        animation: `glow 3s ease-in-out ${delay}ms infinite alternate`
      }}
    >
      {children}
    </div>
  );
};

const ThreeDShape: React.FC<{ type: 'cube' | 'sphere' | 'pyramid' | 'torus'; className?: string }> = ({ 
  type, 
  className 
}) => {
  return (
    <div className={cn(
      "w-32 h-32 relative transform-style-3d",
      type === 'cube' && "animate-rotate-3d",
      type === 'sphere' && "animate-pulse-3d",
      type === 'pyramid' && "animate-float-3d",
      type === 'torus' && "animate-spin-3d",
      className
    )}>
      <div className={cn(
        "absolute inset-0 border-2 border-cyan-400/50 bg-cyan-400/10 backdrop-blur-sm",
        type === 'cube' && "cube",
        type === 'sphere' && "rounded-full sphere",
        type === 'pyramid' && "pyramid",
        type === 'torus' && "torus"
      )} />
    </div>
  );
};

const DigitalTwinAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Central AI Core */}
        <div className="absolute w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse shadow-2xl shadow-cyan-400/30 z-20" />
        
        {/* Orbiting Nodes */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-orbital"
            style={{
              animationDelay: `${i * 0.5}s`,
              transform: `rotate(${i * 72}deg) translateX(80px) rotate(-${i * 72}deg)`
            }}
          />
        ))}
        
        {/* Data Flow Lines */}
        <div className="absolute inset-0">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute w-px h-20 bg-gradient-to-b from-cyan-400/50 to-transparent animate-flow"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 72}deg)`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BlockchainNetwork: React.FC = () => {
  return (
    <div className="relative w-full h-32">
      {/* Network Nodes */}
      {[
        { x: '10%', y: '30%', delay: 0 },
        { x: '30%', y: '20%', delay: 0.3 },
        { x: '50%', y: '40%', delay: 0.6 },
        { x: '70%', y: '25%', delay: 0.9 },
        { x: '90%', y: '35%', delay: 1.2 },
        { x: '20%', y: '60%', delay: 1.5 },
        { x: '40%', y: '70%', delay: 1.8 },
        { x: '60%', y: '80%', delay: 2.1 },
        { x: '80%', y: '65%', delay: 2.4 }
      ].map((node, i) => (
        <React.Fragment key={i}>
          {/* Node */}
          <div
            className="absolute w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"
            style={{
              left: node.x,
              top: node.y,
              animationDelay: `${node.delay}s`
            }}
          />
          
          {/* Connection Lines */}
          {i > 0 && (
            <div
              className="absolute h-px bg-gradient-to-r from-green-400/30 to-cyan-400/30 animate-pulse"
              style={{
                left: '10%',
                top: '30%',
                width: '80%',
                animationDelay: `${node.delay}s`
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const SpatialReality: React.FC = () => {
  return (
    <div className="relative w-full h-40 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-xl overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
      
      {/* Floating AR Elements */}
      <div className="absolute top-4 left-8 w-6 h-6 bg-cyan-400 rounded-full animate-float shadow-lg shadow-cyan-400/50" />
      <div className="absolute top-12 right-12 w-8 h-8 bg-purple-400 rounded-lg animate-float shadow-lg shadow-purple-400/50" 
           style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-8 left-16 w-10 h-4 bg-green-400 rounded-full animate-float shadow-lg shadow-green-400/50"
           style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-16 right-8 w-5 h-5 bg-pink-400 rounded-full animate-float shadow-lg shadow-pink-400/50"
           style={{ animationDelay: '1.5s' }} />
      
      {/* Data Streams */}
      <div className="absolute inset-0">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent animate-stream"
            style={{
              left: `${25 + i * 25}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

const GeneraEcosystem: React.FC = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Digital Twin Network",
      description: "Autonomous AI entities that evolve with users",
      color: "from-cyan-400 to-blue-500",
      animation: <DigitalTwinAnimation />
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Genera Chain",
      description: "Proof of Intelligence consensus mechanism",
      color: "from-green-400 to-emerald-500",
      animation: <BlockchainNetwork />
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Spatial Intelligence",
      description: "AR/VR fusion of physical and digital realities",
      color: "from-purple-400 to-pink-500",
      animation: <SpatialReality />
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Value Layer",
      description: "Intelligence-based economic infrastructure",
      color: "from-yellow-400 to-orange-500",
      animation: <ThreeDShape type="cube" className="w-24 h-24 mx-auto" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {features.map((feature, index) => (
        <NeonCard key={index} delay={index * 200}>
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color} text-white`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {feature.title}
              </h3>
            </div>
            <p className="text-cyan-100/80 mb-4 flex-grow">{feature.description}</p>
            <div className="h-32">
              {feature.animation}
            </div>
          </div>
        </NeonCard>
      ))}
    </div>
  );
};

const StatsOverview: React.FC = () => {
  const stats = [
    { label: "AI Nodes", value: "2.5M+", icon: <Cpu className="h-6 w-6" />, color: "text-cyan-400" },
    { label: "Digital Twins", value: "10M+", icon: <Users className="h-6 w-6" />, color: "text-green-400" },
    { label: "Transactions", value: "500M+", icon: <Network className="h-6 w-6" />, color: "text-purple-400" },
    { label: "Global Reach", value: "150+", icon: <Globe className="h-6 w-6" />, color: "text-yellow-400" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <NeonCard key={index} delay={index * 100}>
          <div className="text-center">
            <div className={`flex justify-center mb-2 ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-cyan-200/70">{stat.label}</div>
          </div>
        </NeonCard>
      ))}
    </div>
  );
};

const TechnologyPillars: React.FC = () => {
  const pillars = [
    {
      title: "AI Layer",
      subtitle: "Cognitive Core",
      description: "Digital Twins with autonomous learning and adaptation",
      features: ["Federated Learning", "Meta-Learning", "Cognitive Autonomy"],
      icon: <Brain className="h-10 w-10" />,
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      title: "Blockchain Layer",
      subtitle: "Trust Fabric",
      description: "Proof of Intelligence consensus and Smart-ID system",
      features: ["Hybrid Architecture", "Cognitive Contracts", "Quantum Resistance"],
      icon: <Shield className="h-10 w-10" />,
      gradient: "from-green-500 to-emerald-600"
    },
    {
      title: "Interaction Layer",
      subtitle: "Reality Fusion",
      description: "Seamless AR/VR integration and spatial computing",
      features: ["XR Interfaces", "Biofeedback", "Neural Integration"],
      icon: <Globe className="h-10 w-10" />,
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
        Technological Pillars of Genera
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pillars.map((pillar, index) => (
          <NeonCard key={index} delay={index * 150}>
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${pillar.gradient} flex items-center justify-center text-white`}>
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{pillar.title}</h3>
              <p className="text-cyan-400 mb-3">{pillar.subtitle}</p>
              <p className="text-cyan-100/80 mb-4">{pillar.description}</p>
              <div className="space-y-2">
                {pillar.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="text-sm text-cyan-200/70 flex items-center justify-center gap-2">
                    <Sparkles className="h-3 w-3 text-cyan-400" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </NeonCard>
        ))}
      </div>
    </div>
  );
};

export const ComposioConnectionsSection: React.FC<{ className?: string }> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showRegistry, setShowRegistry] = useState(false);

  // تم تعطيل جميع خدمات Composio والاستعلامات

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900", className)}>
      {/* خلفية متحركة */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* الهيدر */}
        <NeonCard className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Genera Ecosystem
              </h1>
              <p className="text-cyan-200/70 mt-2">
                The Infrastructure for Digital Civilization
              </p>
            </div>
          </div>
          <p className="text-lg text-cyan-100/80 max-w-2xl mx-auto">
            A unified digital civilization powered by AI, Blockchain, and Spatial Computing. 
            Where intelligence becomes decentralized, owned, and personalized.
          </p>
        </NeonCard>

        {/* الإحصائيات */}
        <StatsOverview />

        {/* الركائز التقنية */}
        <TechnologyPillars />

        {/* نظام Genera */}
        <GeneraEcosystem />

        {/* محاكاة النظام */}
        <NeonCard className="mb-8">
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Live Ecosystem Simulation
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Network className="h-5 w-5 text-cyan-400" />
                Network Activity
              </h3>
              <BlockchainNetwork />
              <div className="flex justify-between text-sm text-cyan-200/70">
                <span>Active Nodes: 2,483</span>
                <span>TPS: 1,247</span>
                <span>Latency: 12ms</span>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-green-400" />
                AI Learning Progress
              </h3>
              <DigitalTwinAnimation />
              <div className="flex justify-between text-sm text-cyan-200/70">
                <span>Models: 847</span>
                <span>Accuracy: 98.3%</span>
                <span>Learning: Active</span>
              </div>
            </div>
          </div>
        </NeonCard>

        {/* البحث والإجراءات (محاكاة وهمية) */}
        <NeonCard>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-400" />
              <Input
                placeholder="Explore Genera ecosystem..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl bg-black/50 border-cyan-400/30 text-white placeholder-cyan-200/50 focus:bg-black/70 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-cyan-400/20"
                >
                  <X className="h-3 w-3 text-cyan-400" />
                </Button>
              )}
            </div>
            <Button
              onClick={() => toast.info("Genera ecosystem simulation mode active")}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-cyan-500/25"
            >
              <Zap className="h-4 w-4 mr-2" />
              Launch Simulation
            </Button>
          </div>
        </NeonCard>
      </div>

      {/* إضافة أنماط CSS للحركات والتصميم النيوني */}
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
          50% { transform: translateY(-10px) rotateX(10deg); }
        }

        @keyframes spin-3d {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        @keyframes orbital {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }

        @keyframes flow {
          0% { height: 0; opacity: 0; }
          50% { height: 80px; opacity: 1; }
          100% { height: 0; opacity: 0; }
        }

        @keyframes stream {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .animate-rotate-3d {
          animation: rotate-3d 10s linear infinite;
        }

        .animate-pulse-3d {
          animation: pulse-3d 3s ease-in-out infinite;
        }

        .animate-float-3d {
          animation: float-3d 4s ease-in-out infinite;
        }

        .animate-spin-3d {
          animation: spin-3d 8s linear infinite;
        }

        .animate-orbital {
          animation: orbital 4s linear infinite;
        }

        .animate-flow {
          animation: flow 2s ease-in-out infinite;
        }

        .animate-stream {
          animation: stream 3s linear infinite;
        }

        .animate-float {
          animation: float-3d 3s ease-in-out infinite;
        }

        .cube {
          transform-style: preserve-3d;
          transform: rotateX(45deg) rotateY(45deg);
        }

        .sphere {
          box-shadow: inset 0 0 50px rgba(34, 211, 238, 0.3);
        }

        .pyramid {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        .torus {
          border-radius: 50%;
          box-shadow: 
            0 0 0 10px rgba(34, 211, 238, 0.1),
            0 0 0 20px rgba(34, 211, 238, 0.05);
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }

        .bg-grid-white\/10 {
          background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
};