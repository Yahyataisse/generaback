'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/home/ui/accordion';
import { SectionHeader } from '@/components/home/section-header';
import { siteConfig } from '@/lib/home';
import { useState, useEffect } from 'react';
import { Brain, Cpu, Network, Shield, Zap, Sparkles } from 'lucide-react';

// Neural Network AI Animation
const NeuralNetworkAnimation: React.FC = () => {
  const [nodes, setNodes] = useState<Array<{id: number, x: number, y: number, connections: number[]}>>([]);
  
  useEffect(() => {
    const newNodes = [];
    for (let i = 0; i < 8; i++) {
      newNodes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        connections: Array.from({length: 2}, () => Math.floor(Math.random() * 8))
      });
    }
    setNodes(newNodes);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-20">
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
              strokeWidth="0.2"
              className="animate-pulse"
              style={{ animationDelay: `${(node.id + targetId) * 0.2}s` }}
            />
          ))
        )}
        
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#9333ea" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {nodes.map(node => (
        <div
          key={node.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            animationDelay: `${node.id * 0.4}s`
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
    for (let i = 0; i < 5; i++) {
      newBlocks.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }
    setBlocks(newBlocks);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-25">
      {blocks.slice(0, -1).map((block, index) => (
        <div
          key={`chain-${block.id}`}
          className="absolute h-0.5 bg-gradient-to-r from-green-400/20 to-emerald-400/10 animate-pulse"
          style={{
            left: `${block.x}%`,
            top: `${block.y}%`,
            width: `${Math.abs(blocks[index + 1].x - block.x)}%`,
            transform: `rotate(${Math.atan2(
              blocks[index + 1].y - block.y,
              blocks[index + 1].x - block.x
            ) * 180 / Math.PI}deg)`,
            animationDelay: `${index * 0.5}s`
          }}
        />
      ))}

      {blocks.map(block => (
        <div
          key={block.id}
          className="absolute w-2 h-2 border border-green-400/30 bg-green-400/5 rounded-sm animate-bounce"
          style={{
            left: `${block.x}%`,
            top: `${block.y}%`,
            animationDelay: `${block.id * 0.6}s`
          }}
        />
      ))}
    </div>
  );
};

// 3D Floating Elements
const Floating3DElements: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* AI Cubes */}
      {[0, 1].map(i => (
        <div
          key={`ai-cube-${i}`}
          className="absolute w-4 h-4 border border-cyan-400/30 bg-cyan-400/5 animate-float-3d"
          style={{
            left: `${20 + i * 60}%`,
            top: `${30 + i * 20}%`,
            animationDelay: `${i * 1.5}s`
          }}
        />
      ))}

      {/* Blockchain Cubes */}
      {[0, 1].map(i => (
        <div
          key={`blockchain-cube-${i}`}
          className="absolute w-3 h-3 border border-green-400/30 bg-green-400/5 animate-float-3d-reverse"
          style={{
            right: `${25 + i * 50}%`,
            bottom: `${35 + i * 15}%`,
            animationDelay: `${i * 2}s`
          }}
        />
      ))}

      {/* Floating Icons */}
      {[Brain, Cpu, Network, Shield].map((Icon, index) => (
        <div
          key={index}
          className="absolute text-cyan-400/10 animate-float-slow"
          style={{
            left: `${15 + index * 25}%`,
            top: `${70 - index * 10}%`,
            animationDelay: `${index * 1}s`
          }}
        >
          <Icon size={24} />
        </div>
      ))}
    </div>
  );
};

// مكون البطاقة النيونية للأسئلة الشائعة
const NeonFAQCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  isOpen?: boolean;
}> = ({ 
  children, 
  className,
  isOpen = false
}) => {
  return (
    <div 
      className={`
        relative bg-black/40 backdrop-blur-xl border border-cyan-400/20 rounded-xl
        shadow-lg shadow-cyan-500/10 transition-all duration-500
        hover:shadow-cyan-400/20 hover:border-cyan-400/30
        ${isOpen ? 'border-cyan-400/40 shadow-cyan-400/20' : ''}
        ${className}
      `}
      style={{
        animation: isOpen ? 'glow 2s ease-in-out infinite alternate' : 'none'
      }}
    >
      {/* شبكة خلفية */}
      <div className="absolute inset-0 bg-grid-white/3 bg-[size:15px_15px] opacity-20 rounded-xl" />
      
      {children}
    </div>
  );
};

export function FAQSection() {
  const { faqSection } = siteConfig;

  return (
    <section
      id="faq"
      className="flex flex-col items-center justify-center gap-10 pb-10 w-full relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900"
    >
      {/* خلفية متحركة */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Animations */}
        <NeuralNetworkAnimation />
        <BlockchainAnimation />
        <Floating3DElements />
      </div>

      <div className="relative w-full px-6 z-10">
        <SectionHeader>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {faqSection.title}
          </h2>
          <p className="text-cyan-200/80 text-center text-balance font-medium">
            {faqSection.description}
          </p>
        </SectionHeader>

        <div className="max-w-3xl w-full mx-auto px-4 md:px-10">
          <Accordion
            type="single"
            collapsible
            className="w-full border-b-0 grid gap-3"
          >
            {faqSection.faQitems.map((faq, index) => (
              <AccordionItem
                key={index}
                value={index.toString()}
                className="border-0 grid gap-3"
              >
                <AccordionTrigger className="p-0 border-0">
                  <NeonFAQCard className="w-full">
                    <div className="relative px-6 py-4 cursor-pointer group">
                      <div className="flex items-center justify-between">
                        <span className="text-cyan-100 font-medium text-left group-hover:text-cyan-50 transition-colors duration-300">
                          {faq.question}
                        </span>
                        <div className="flex items-center gap-2">
                          <Sparkles className="size-4 text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300" />
                          <div className={`transform transition-transform duration-300 text-cyan-400/60 group-hover:text-cyan-400 ${
                            false ? 'rotate-180' : ''
                          }`}>
                            <Zap className="size-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </NeonFAQCard>
                </AccordionTrigger>
                <AccordionContent className="p-0 border-0 mt-2">
                  <NeonFAQCard isOpen={true}>
                    <div className="px-6 py-4">
                      <p className="text-cyan-100/80 font-medium leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </NeonFAQCard>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* الأنماط العالمية */}
      <style jsx global>{`
        @keyframes glow {
          0% {
            box-shadow: 0 0 15px rgba(34, 211, 238, 0.15),
                        inset 0 0 15px rgba(34, 211, 238, 0.05);
          }
          100% {
            box-shadow: 0 0 25px rgba(34, 211, 238, 0.25),
                        0 0 35px rgba(168, 85, 247, 0.15),
                        inset 0 0 20px rgba(34, 211, 238, 0.08);
          }
        }

        @keyframes float-3d {
          0%, 100% { 
            transform: translateY(0px) rotateX(0deg) rotateY(0deg); 
          }
          33% { 
            transform: translateY(-6px) rotateX(8deg) rotateY(90deg); 
          }
          66% { 
            transform: translateY(-3px) rotateX(-4deg) rotateY(180deg); 
          }
        }

        @keyframes float-3d-reverse {
          0%, 100% { 
            transform: translateY(0px) rotateX(0deg) rotateY(0deg); 
          }
          33% { 
            transform: translateY(-5px) rotateX(-8deg) rotateY(-90deg); 
          }
          66% { 
            transform: translateY(-2px) rotateX(4deg) rotateY(-180deg); 
          }
        }

        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-10px) rotate(180deg); 
          }
        }

        .animate-float-3d {
          animation: float-3d 4s ease-in-out infinite;
        }

        .animate-float-3d-reverse {
          animation: float-3d-reverse 5s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .bg-grid-white\\/3 {
          background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
        }

        /* تحسينات للـ Accordion */
        [data-state="open"] .animate-float-3d {
          animation-duration: 2s;
        }

        [data-state="open"] .text-cyan-400\\/60 {
          color: rgb(34 211 238 / 0.8);
        }
      `}</style>
    </section>
  );
}