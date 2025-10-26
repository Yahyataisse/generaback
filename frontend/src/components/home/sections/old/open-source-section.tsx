'use client';

import { SectionHeader } from '@/components/home/section-header';
import { FlickeringGrid } from '@/components/home/ui/flickering-grid';
import { Globe } from '@/components/home/ui/globe';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Brain, Network, Shield, Cpu, Database, Sparkles, Zap, Lock, Code, Cloud } from 'lucide-react';

// مكون البطاقة النيونية
const NeonCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}> = ({ 
  children, 
  className, 
  delay = 0 
}) => {
  return (
    <div 
      className={`
        relative bg-black/60 backdrop-blur-xl border border-cyan-400/30 rounded-2xl overflow-hidden
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
      {/* شبكة خلفية متحركة */}
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px] opacity-20" />
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
      "absolute opacity-40",
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

export function OpenSourceSection() {
  const items = [
    {
      id: 1,
      content: (
        <div className="relative flex size-full items-center justify-center overflow-hidden min-h-[300px]">
          {/* أشكال ثلاثية الأبعاد عائمة */}
          <FloatingShape type="cube" className="top-8 left-8" color="cyan" />
          <FloatingShape type="sphere" className="top-12 right-12" color="purple" />
          <FloatingShape type="pyramid" className="bottom-8 left-12" color="green" />
          <FloatingShape type="cube" className="bottom-12 right-8" color="cyan" />
          
          {/* النواة المركزية */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="size-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/25 border border-cyan-400/30">
              <Shield className="size-10 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-cyan-200 text-lg font-bold">Neural Security</h3>
              <p className="text-cyan-200/70 text-sm">Quantum-Resistant Encryption</p>
            </div>
          </div>

          {/* جسيمات متحركة */}
          <div className="absolute inset-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full
                  ${i % 3 === 0 ? 'bg-cyan-400' : ''}
                  ${i % 3 === 1 ? 'bg-purple-400' : ''}
                  ${i % 3 === 2 ? 'bg-green-400' : ''}
                `}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.sin(i) * 15, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
                style={{
                  left: `${20 + (i * 10) % 60}%`,
                  top: `${30 + (i * 8) % 40}%`,
                }}
              />
            ))}
          </div>

          {/* شبكة متحركة في الخلفية */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <FlickeringGrid
              className="size-full"
              gridGap={6}
              squareSize={3}
              maxOpacity={0.3}
              color="var(--cyan)"
            />
          </motion.div>
        </div>
      ),
      title: 'Decentralized Neural Network',
      description: 'Deploy your Digital Twins on a fully decentralized blockchain infrastructure with complete data sovereignty and quantum-resistant security protocols.',
      showGitHubInfo: true,
    },
    {
      id: 2,
      content: (
        <div className="relative flex size-full items-center justify-center overflow-hidden min-h-[300px] [mask-image:linear-gradient(to_top,transparent,black_50%)]">
          {/* كرة العالم المعدلة */}
          <div className="scale-150">
            <Globe className="top-40" />
          </div>
          
          {/* أشكال ثلاثية الأبعاد */}
          <FloatingShape type="sphere" className="top-6 left-6" color="purple" />
          <FloatingShape type="cube" className="top-10 right-10" color="cyan" />
          <FloatingShape type="pyramid" className="bottom-6 left-10" color="green" />
          
          {/* مؤشرات النظام */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex items-center gap-4 bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-cyan-400/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm">2.5M Nodes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-cyan-400 text-sm">99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      ),
      title: 'Global Intelligence Grid',
      description: 'Access a worldwide network of AI nodes and blockchain validators ensuring maximum uptime, low latency, and distributed computing power for your Digital Twins.',
      showFeatures: true,
    },
  ];

  return (
    <section
      id="open-source"
      className="flex flex-col items-center justify-center w-full relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 py-20"
    >
      {/* خلفية متحركة */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative w-full px-6 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <SectionHeader>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center text-balance pb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Open Neural Ecosystem
            </h2>
            <p className="text-cyan-200/80 text-center text-balance font-medium text-lg max-w-3xl mx-auto">
              Build on a completely open-source, decentralized infrastructure for artificial intelligence. 
              Full transparency, complete control, and unlimited scalability.
            </p>
          </SectionHeader>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            {items.map((item, index) => (
              <NeonCard key={item.id} delay={index * 200} className="min-h-[600px]">
                <div className="flex flex-col h-full">
                  {/* منطقة المحتوى المرئي */}
                  <div className="flex-1 p-8">
                    {item.content}
                  </div>

                  {/* منطقة المعلومات */}
                  <div className="p-8 border-t border-cyan-400/20">
                    {item.showGitHubInfo && (
                      <div className="flex flex-col gap-6 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-cyan-500/20 p-3 rounded-2xl border border-cyan-400/30">
                            <Code className="size-6 text-cyan-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-cyan-200 font-bold text-lg">
                              <span>genera-ai/core</span>
                            </div>
                            <p className="text-cyan-200/70 text-sm">Decentralized Intelligence Protocol</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-xl bg-cyan-500/20 border border-cyan-400/30 px-3 py-1.5 text-sm font-semibold text-cyan-400">
                            <Cpu className="size-4 mr-2" />
                            TypeScript
                          </span>
                          <span className="inline-flex items-center rounded-xl bg-purple-500/20 border border-purple-400/30 px-3 py-1.5 text-sm font-semibold text-purple-400">
                            <Database className="size-4 mr-2" />
                            Rust
                          </span>
                          <span className="inline-flex items-center rounded-xl bg-green-500/20 border border-green-400/30 px-3 py-1.5 text-sm font-semibold text-green-400">
                            <Lock className="size-4 mr-2" />
                            Apache 2.0
                          </span>
                        </div>
                      </div>
                    )}

                    {item.showFeatures && (
                      <div className="grid grid-cols-1 gap-4 mb-6">
                        {[
                          { icon: Cloud, title: 'Distributed Nodes', desc: '2.5M+ global network' },
                          { icon: Zap, title: 'Quantum Security', desc: 'Post-quantum encryption' },
                          { icon: Network, title: 'Blockchain Consensus', desc: 'Proof of Intelligence' }
                        ].map((feature, i) => (
                          <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-black/40 border border-white/10">
                            <div className="flex items-center justify-center size-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30">
                              <feature.icon className="size-6 text-cyan-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-cyan-200">{feature.title}</h4>
                              <p className="text-cyan-200/70 text-sm">{feature.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <h3 className="text-2xl font-bold text-cyan-200 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-cyan-100/80 leading-relaxed text-lg mb-6">
                      {item.description}
                    </p>
                    
                    {item.showGitHubInfo && (
                      <Link
                        href="https://github.com/genera-ai/core"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex h-12 items-center justify-center gap-3 text-base font-semibold tracking-wide rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-105"
                      >
                        <Sparkles className="size-5" />
                        <span>Explore Neural Codebase</span>
                      </Link>
                    )}
                  </div>
                </div>
              </NeonCard>
            ))}
          </div>

          {/* قسم إضافي */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <NeonCard className="max-w-4xl mx-auto">
              <div className="text-center p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Brain className="size-8 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-cyan-200">
                    Join the Neural Revolution
                  </h3>
                </div>
                <p className="text-cyan-100/80 text-lg max-w-2xl mx-auto mb-6">
                  Contribute to the future of decentralized artificial intelligence. 
                  Build, innovate, and shape the next generation of digital civilization.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="https://github.com/genera-ai/core"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 text-sm font-semibold rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 px-6 hover:bg-cyan-500/30 transition-all duration-300"
                  >
                    <Code className="size-4" />
                    View Source Code
                  </Link>
                  <Link
                    href="/docs"
                    className="inline-flex h-11 items-center justify-center gap-2 text-sm font-semibold rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-400 px-6 hover:bg-purple-500/30 transition-all duration-300"
                  >
                    <BookOpen className="size-4" />
                    Read Documentation
                  </Link>
                </div>
              </div>
            </NeonCard>
          </motion.div>
        </div>
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

// أيقونة BookOpen المطلوبة
const BookOpen = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);