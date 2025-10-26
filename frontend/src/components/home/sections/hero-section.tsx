'use client';
import { HeroVideoSection } from '@/components/home/sections/hero-video-section';
import { siteConfig } from '@/lib/home';
import { ArrowRight, Github, X, AlertCircle, Square, Brain, Cpu, Network, Globe, Sparkles, Zap, Cloud, Server, MessageCircle } from 'lucide-react';
import { FlickeringGrid } from '@/components/home/ui/flickering-grid';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useState, useEffect, useRef, FormEvent } from 'react';
import { useScroll } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import {
  BillingError,
  AgentRunLimitError,
  ProjectLimitError,
} from '@/lib/api';
import { useInitiateAgentMutation } from '@/hooks/react-query/dashboard/use-initiate-agent';
import { useThreadQuery } from '@/hooks/react-query/threads/use-threads';
import { generateThreadName } from '@/lib/actions/threads';
import GoogleSignIn from '@/components/GoogleSignIn';
import { useAgents } from '@/hooks/react-query/agents/use-agents';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from '@/components/ui/dialog';
import { BillingErrorAlert } from '@/components/billing/usage-limit-alert';
import { useBillingError } from '@/hooks/useBillingError';
import { useAccounts } from '@/hooks/use-accounts';
import { isLocalMode, config } from '@/lib/config';
import { toast } from 'sonner';
import { BillingModal } from '@/components/billing/billing-modal';
import GitHubSignIn from '@/components/GithubSignIn';
import { ChatInput, ChatInputHandles } from '@/components/thread/chat-input/chat-input';
import { normalizeFilenameToNFC } from '@/lib/utils/unicode';
import { createQueryHook } from '@/hooks/use-query';
import { agentKeys } from '@/hooks/react-query/agents/keys';
import { getAgents } from '@/hooks/react-query/agents/utils';
import { AgentRunLimitDialog } from '@/components/thread/agent-run-limit-dialog';
import { useAgentSelection } from '@/lib/stores/agent-selection-store';

// Custom dialog overlay with blur effect
const BlurredDialogOverlay = () => (
  <DialogOverlay className="bg-background/40 backdrop-blur-md" />
);

// مكون البطاقة النيونية
const NeonCard: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ 
  children, 
  className, 
  delay = 0 
}) => {
  return (
    <div 
      className={`
        relative bg-black/80 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6
        shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-all duration-500
        hover:border-cyan-400/60 hover:scale-[1.02]
        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br 
        before:from-cyan-500/10 before:via-purple-500/10 before:to-pink-500/10
        ${className}
      `}
      style={{
        animation: `glow 3s ease-in-out ${delay}ms infinite alternate`
      }}
    >
      {children}
    </div>
  );
};

// Neural Network AI Animation
const NeuralNetworkAnimation: React.FC = () => {
  const [nodes, setNodes] = useState<Array<{id: number, x: number, y: number, connections: number[]}>>([]);
  
  useEffect(() => {
    // إنشاء عقد الشبكة العصبية
    const newNodes = [];
    for (let i = 0; i < 15; i++) {
      newNodes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        connections: Array.from({length: 3}, () => Math.floor(Math.random() * 15))
      });
    }
    setNodes(newNodes);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      {/* Neural Network Connections */}
      <svg className="w-full h-full">
        {nodes.map(node =>
          node.connections.map(targetId => (
            <line
              key={`${node.id}-${targetId}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${nodes[targetId]?.x || node.x}%`}
              y2={`${nodes[targetId]?.y || node.y}%`}
              stroke="url(#neuralGradient)"
              strokeWidth="0.5"
              className="animate-pulse"
              style={{ animationDelay: `${(node.id + targetId) * 0.1}s` }}
            />
          ))
        )}
        
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#9333ea" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating AI Nodes */}
      {nodes.map(node => (
        <div
          key={node.id}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            animationDelay: `${node.id * 0.2}s`
          }}
        />
      ))}
    </div>
  );
};

// Blockchain Network Animation
const BlockchainAnimation: React.FC = () => {
  const [blocks, setBlocks] = useState<Array<{id: number, x: number, y: number}>>([]);
  
  useEffect(() => {
    const newBlocks = [];
    for (let i = 0; i < 8; i++) {
      newBlocks.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }
    setBlocks(newBlocks);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-60">
      {/* Blockchain Connections */}
      <div className="absolute inset-0">
        {blocks.slice(0, -1).map((block, index) => (
          <div
            key={`chain-${block.id}`}
            className="absolute h-0.5 bg-gradient-to-r from-green-400/50 to-emerald-400/30 animate-pulse"
            style={{
              left: `${block.x}%`,
              top: `${block.y}%`,
              width: `${Math.abs(blocks[index + 1].x - block.x)}%`,
              transform: `rotate(${Math.atan2(
                blocks[index + 1].y - block.y,
                blocks[index + 1].x - block.x
              ) * 180 / Math.PI}deg)`,
              animationDelay: `${index * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Blockchain Nodes */}
      {blocks.map(block => (
        <div
          key={block.id}
          className="absolute w-4 h-4 border-2 border-green-400/70 bg-green-400/20 rounded-sm animate-bounce"
          style={{
            left: `${block.x}%`,
            top: `${block.y}%`,
            animationDelay: `${block.id * 0.4}s`
          }}
        />
      ))}

      {/* Decentralized Network Dots */}
      {Array.from({length: 20}).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
    </div>
  );
};

// 3D Floating Cubes for AI & Blockchain
const FloatingCubes: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* AI Cubes (Cyan/Purple) */}
      {[0, 1, 2, 3].map(i => (
        <div
          key={`ai-cube-${i}`}
          className="absolute w-8 h-8 border-2 border-cyan-400/50 bg-cyan-400/10 animate-float-3d"
          style={{
            left: `${10 + i * 25}%`,
            top: `${20 + (i % 2) * 40}%`,
            animationDelay: `${i * 1.5}s`,
            transformStyle: 'preserve-3d',
            transform: 'rotateX(45deg) rotateY(45deg)'
          }}
        />
      ))}

      {/* Blockchain Cubes (Green/Emerald) */}
      {[0, 1, 2, 3].map(i => (
        <div
          key={`blockchain-cube-${i}`}
          className="absolute w-6 h-6 border-2 border-green-400/50 bg-green-400/10 animate-float-3d-reverse"
          style={{
            right: `${10 + i * 20}%`,
            bottom: `${15 + (i % 2) * 35}%`,
            animationDelay: `${i * 1.2}s`,
            transformStyle: 'preserve-3d',
            transform: 'rotateX(60deg) rotateY(30deg)'
          }}
        />
      ))}

      {/* Hybrid Cubes (Mixed Colors) */}
      {[0, 1].map(i => (
        <div
          key={`hybrid-cube-${i}`}
          className="absolute w-10 h-10 border-2 border-purple-400/40 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 animate-rotate-3d"
          style={{
            left: `${40 + i * 30}%`,
            top: `${60 + i * 10}%`,
            animationDelay: `${i * 2}s`
          }}
        />
      ))}
    </div>
  );
};

// Data Flow Animation
const DataFlowAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      {/* Data Particles */}
      {Array.from({length: 30}).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-data-flow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Blockchain Data Stream */}
      <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent animate-pulse" />
      <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse" style={{animationDelay: '1s'}} />
    </div>
  );
};

// Digital Twin Animation
const DigitalTwinAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-32 flex items-center justify-center mb-6">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Central AI Core */}
        <div className="absolute w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse shadow-2xl shadow-cyan-400/30 z-20" />
        
        {/* Orbiting Digital Twins */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-orbital"
            style={{
              animationDelay: `${i * 0.5}s`,
              transform: `rotate(${i * 120}deg) translateX(60px) rotate(-${i * 120}deg)`
            }}
          />
        ))}

        {/* Blockchain Rings */}
        <div className="absolute w-24 h-24 border-2 border-green-400/30 rounded-full animate-ping" style={{animationDelay: '0.2s'}} />
        <div className="absolute w-32 h-32 border-2 border-blue-400/20 rounded-full animate-ping" style={{animationDelay: '0.4s'}} />
      </div>
    </div>
  );
};

// Rotating text component for Genera features
const RotatingText = ({ 
  texts, 
  className = "" 
}: { 
  texts: string[]; 
  className?: string; 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsVisible(true);
      }, 150);
    }, 2000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <span className={`inline-block transition-all duration-300 ${className}`}>
      <span 
        className={`inline-block transition-opacity duration-300 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {texts[currentIndex]}
      </span>
    </span>
  );
};

// Constant for localStorage key to ensure consistency
const PENDING_PROMPT_KEY = 'pendingAgentPrompt';

export function HeroSection() {
  const { hero } = siteConfig;
  const tablet = useMediaQuery('(max-width: 1024px)');
  const [mounted, setMounted] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const { scrollY } = useScroll();
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  
  // Use the agent selection store for localStorage persistence
  const { 
    selectedAgentId, 
    setSelectedAgent, 
    initializeFromAgents 
  } = useAgentSelection();
  const { user, isLoading } = useAuth();
  const { billingError, handleBillingError, clearBillingError } =
    useBillingError();
  const { data: accounts } = useAccounts({ enabled: !!user });
  const personalAccount = accounts?.find((account) => account.personal_account);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const initiateAgentMutation = useInitiateAgentMutation();
  const [initiatedThreadId, setInitiatedThreadId] = useState<string | null>(null);
  const threadQuery = useThreadQuery(initiatedThreadId || '');
  const chatInputRef = useRef<ChatInputHandles>(null);
  const [showAgentLimitDialog, setShowAgentLimitDialog] = useState(false);
  const [agentLimitData, setAgentLimitData] = useState<{
    runningCount: number;
    runningThreadIds: string[];
  } | null>(null);

  // Fetch agents for selection
  const { data: agentsResponse } = createQueryHook(
    agentKeys.list({
      limit: 100,
      sort_by: 'name',
      sort_order: 'asc'
    }),
    () => getAgents({
      limit: 100,
      sort_by: 'name',
      sort_order: 'asc'
    }),
    {
      enabled: !!user && !isLoading,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }
  )();

  const agents = agentsResponse?.agents || [];

  // Initialize agent selection from localStorage when agents are loaded
  useEffect(() => {
    if (agents.length > 0) {
      initializeFromAgents(agents);
    }
  }, [agents, initializeFromAgents]);

  // Auth dialog state
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect when scrolling is active to reduce animation complexity
  useEffect(() => {
    const unsubscribe = scrollY.on('change', () => {
      setIsScrolling(true);

      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set a new timeout
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    });

    return () => {
      unsubscribe();
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [scrollY]);

  useEffect(() => {
    if (authDialogOpen && inputValue.trim()) {
      localStorage.setItem(PENDING_PROMPT_KEY, inputValue.trim());
    }
  }, [authDialogOpen, inputValue]);

  useEffect(() => {
    if (authDialogOpen && user && !isLoading) {
      setAuthDialogOpen(false);
      router.push('/dashboard');
    }
  }, [user, isLoading, authDialogOpen, router]);

  useEffect(() => {
    if (threadQuery.data && initiatedThreadId) {
      const thread = threadQuery.data;
      if (thread.project_id) {
        router.push(`/projects/${thread.project_id}/thread/${initiatedThreadId}`);
      } else {
        router.push(`/agents/${initiatedThreadId}`);
      }
      setInitiatedThreadId(null);
    }
  }, [threadQuery.data, initiatedThreadId, router]);

  const handleChatRedirect = () => {
    // رابط الشات الخارجي - يمكن تغييره حسب الحاجة
    window.open('https://chat.genera.dev', '_blank');
  };

  return (
    <section id="hero" className="w-full relative overflow-hidden min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900">
      {/* Enhanced 3D Neon Background */}
      <div className="absolute inset-0">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* AI Neural Network Animation */}
        <NeuralNetworkAnimation />
        
        {/* Blockchain Network Animation */}
        <BlockchainAnimation />
        
        {/* 3D Floating Cubes */}
        <FloatingCubes />
        
        {/* Data Flow Animation */}
        <DataFlowAnimation />
      </div>

      <div className="relative flex flex-col items-center w-full px-4 sm:px-6">
        <div className="relative z-10 pt-16 sm:pt-24 md:pt-32 mx-auto h-full w-full max-w-6xl flex flex-col items-center justify-center">
          {/* Digital Twin Animation */}
          <DigitalTwinAnimation />

          {/* Main Hero Content */}
          <NeonCard className="mb-8 text-center max-w-4xl">
            <div className="flex flex-col items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Genera
                  </h1>
                  <p className="text-cyan-200/70 mt-2 text-lg">
                    Blockchain-Powered Digital Civilization
                  </p>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tighter text-balance text-center">
                <span className="text-cyan-200">Where Intelligence Meets </span>
                <RotatingText 
                  texts={['Blockchain', 'Decentralization', 'Security', 'Transparency', 'Consensus', 'Trust']}
                  className="font-bold"
                />
              </h2>
              
              <p className="text-lg md:text-xl text-center text-cyan-100/80 font-medium text-balance leading-relaxed tracking-tight max-w-3xl">
                Experience the future of decentralized intelligence. Join the blockchain revolution 
                where every Digital Twin is secured by immutable distributed ledger technology.
              </p>
            </div>
          </NeonCard>

          {/* Chat Redirect Button Section */}
          <NeonCard className="w-full max-w-2xl">
            <div className="relative z-10">
              <div className="w-full relative">
                <div className="relative z-10">
                  <Button 
                    onClick={handleChatRedirect}
                    className="w-full h-16 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-cyan-500/25 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    Enter Genera Chat
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
                {/* Neon Glow Effect */}
                <div className="absolute -bottom-4 inset-x-0 h-6 bg-cyan-500/20 blur-xl rounded-full -z-10 opacity-70"></div>
              </div>
            </div>
          </NeonCard>
        </div>
      </div>

      {/* Auth Dialog with Neon Design */}
      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <BlurredDialogOverlay />
        <DialogContent className="sm:max-w-md rounded-2xl bg-gray-900 border border-cyan-400/30">
          <div className="relative z-10">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-medium text-cyan-200">
                  Join Digital Civilization
                </DialogTitle>
              </div>
              <DialogDescription className="text-cyan-200/70">
                Authenticate to access the Genera blockchain network
              </DialogDescription>
            </DialogHeader>

            {/* OAuth Sign In */}
            <div className="w-full space-y-3">
              <GoogleSignIn returnUrl="/dashboard" />
              <GitHubSignIn returnUrl="/dashboard" />
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cyan-400/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-cyan-200/70">
                  or continue with digital identity
                </span>
              </div>
            </div>

            {/* Sign in options */}
            <div className="space-y-3 pt-4">
              <Link
                href={`/auth?returnUrl=${encodeURIComponent('/dashboard')}`}
                className="flex h-12 items-center justify-center w-full text-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 transition-all shadow-lg shadow-cyan-500/25"
                onClick={() => setAuthDialogOpen(false)}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Access Blockchain Network
              </Link>

              <Link
                href={`/auth?mode=signup&returnUrl=${encodeURIComponent('/dashboard')}`}
                className="flex h-12 items-center justify-center w-full text-center rounded-xl border border-cyan-400/30 bg-gray-800 text-cyan-200 hover:bg-cyan-400/10 transition-all"
                onClick={() => setAuthDialogOpen(false)}
              >
                Create Digital Identity
              </Link>
            </div>

            <div className="mt-4 text-center text-xs text-cyan-200/50">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="text-cyan-400 hover:underline">
                Blockchain Protocol
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-cyan-400 hover:underline">
                Data Privacy
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Billing Error Alert here */}
      <BillingErrorAlert
        message={billingError?.message}
        currentUsage={billingError?.currentUsage}
        limit={billingError?.limit}
        accountId={personalAccount?.account_id}
        onDismiss={clearBillingError}
        isOpen={!!billingError}
      />

      {agentLimitData && (
        <AgentRunLimitDialog
          open={showAgentLimitDialog}
          onOpenChange={setShowAgentLimitDialog}
          runningCount={agentLimitData.runningCount}
          runningThreadIds={agentLimitData.runningThreadIds}
          projectId={undefined}
        />
      )}

      {/* Global Styles */}
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
          0% { transform: rotateY(0deg) rotateX(0deg) scale(1); }
          50% { transform: rotateY(180deg) rotateX(180deg) scale(1.1); }
          100% { transform: rotateY(360deg) rotateX(360deg) scale(1); }
        }

        @keyframes pulse-3d {
          0%, 100% { transform: scale(1) rotateX(0deg); }
          50% { transform: scale(1.2) rotateX(10deg); }
        }

        @keyframes float-3d {
          0%, 100% { 
            transform: translateY(0px) rotateX(0deg) rotateY(0deg); 
          }
          33% { 
            transform: translateY(-10px) rotateX(10deg) rotateY(120deg); 
          }
          66% { 
            transform: translateY(-5px) rotateX(-5deg) rotateY(240deg); 
          }
        }

        @keyframes float-3d-reverse {
          0%, 100% { 
            transform: translateY(0px) rotateX(0deg) rotateY(0deg); 
          }
          33% { 
            transform: translateY(-8px) rotateX(-10deg) rotateY(-120deg); 
          }
          66% { 
            transform: translateY(-3px) rotateX(5deg) rotateY(-240deg); 
          }
        }

        @keyframes orbital {
          0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
        }

        @keyframes data-flow {
          0% {
            transform: translateY(0px) scale(1);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) scale(1.5);
            opacity: 1;
          }
          100% {
            transform: translateY(-40px) scale(1);
            opacity: 0;
          }
        }

        .animate-rotate-3d {
          animation: rotate-3d 6s ease-in-out infinite;
        }

        .animate-pulse-3d {
          animation: pulse-3d 4s ease-in-out infinite;
        }

        .animate-float-3d {
          animation: float-3d 4s ease-in-out infinite;
        }

        .animate-float-3d-reverse {
          animation: float-3d-reverse 5s ease-in-out infinite;
        }

        .animate-orbital {
          animation: orbital 3s linear infinite;
        }

        .animate-data-flow {
          animation: data-flow 3s ease-in-out infinite;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
}

// Button component (مطلوب إذا لم يكن مستورد)
const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-6 py-3 rounded-lg transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};