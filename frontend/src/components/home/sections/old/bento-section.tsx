'use client';

import { SectionHeader } from '@/components/home/section-header';
import { FirstBentoAnimation } from '@/components/home/first-bento-animation';
import { SecondBentoAnimation } from '@/components/home/second-bento-animation';
import { ThirdBentoAnimation } from '@/components/home/third-bento-animation';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Brain, Network, Globe, Sparkles, Cpu, Shield, Zap, Users } from 'lucide-react';

// مكون البطاقة النيونية
const NeonCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  color?: 'cyan' | 'purple' | 'green';
}> = ({ 
  children, 
  className, 
  delay = 0,
  color = 'cyan'
}) => {
  const colorClasses = {
    cyan: 'border-cyan-400/30 shadow-cyan-500/20 before:from-cyan-500/10',
    purple: 'border-purple-400/30 shadow-purple-500/20 before:from-purple-500/10',
    green: 'border-green-400/30 shadow-green-500/20 before:from-green-500/10'
  };

  return (
    <div 
      className={`
        relative bg-black/60 backdrop-blur-xl border rounded-2xl overflow-hidden
        shadow-2xl hover:shadow-xl transition-all duration-500
        hover:scale-[1.02] hover:border-opacity-60
        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:to-transparent
        group
        ${colorClasses[color]}
        ${className}
      `}
      style={{
        animation: `glow 3s ease-in-out ${delay}ms infinite alternate`
      }}
    >
      {/* شبكة خلفية متحركة */}
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px] opacity-20" />
      
      {/* تأثير توهج */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-current opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
      
      {children}
    </div>
  );
};

// أشكال ثلاثية الأبعاد للخلفية
const FloatingShapes: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const types = ['cube', 'sphere', 'pyramid'] as const;
        const colors = ['cyan', 'purple', 'green'] as const;
        const type = types[i % types.length];
        const color = colors[i % colors.length];
        
        return (
          <div
            key={i}
            className={`absolute w-8 h-8 border-2 backdrop-blur-sm opacity-20
              ${type === 'cube' && 'animate-rotate-3d'}
              ${type === 'sphere' && 'rounded-full animate-pulse-3d'}
              ${type === 'pyramid' && 'clip-path-pyramid animate-float-3d'}
              ${color === 'cyan' && 'border-cyan-400/30 bg-cyan-400/10'}
              ${color === 'purple' && 'border-purple-400/30 bg-purple-400/10'}
              ${color === 'green' && 'border-green-400/30 bg-green-400/10'}
            `}
            style={{
              left: `${10 + (i * 12) % 80}%`,
              top: `${15 + (i * 8) % 70}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        );
      })}
    </div>
  );
};

const bentoItems = [
  {
    id: 1,
    content: <FirstBentoAnimation />,
    title: 'Create Your Digital Twin',
    description: 'Design an autonomous AI entity that evolves with your behavior and learns from every interaction in real-time.',
    color: 'cyan' as const,
    step: '01'
  },
  {
    id: 2,
    content: <SecondBentoAnimation />,
    title: 'Connect to Neural Network',
    description: 'Integrate with the decentralized blockchain infrastructure for secure, transparent intelligence exchange.',
    color: 'green' as const,
    step: '02'
  },
  {
    id: 3,
    content: <ThirdBentoAnimation />,
    title: 'Enter Digital Civilization',
    description: 'Experience immersive spatial computing and interact with your digital twin in unified virtual environments.',
    color: 'purple' as const,
    step: '03'
  },
];

export function BentoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="process"
      className="flex flex-col items-center justify-center w-full relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 py-20"
      ref={ref}
    >
      {/* خلفية متحركة */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* أشكال عائمة في الخلفية */}
        <FloatingShapes count={12} />
      </div>

      <div className="relative w-full px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center text-balance pb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Join the Digital Civilization in 3 Steps
            </h2>
            <p className="text-cyan-200/80 text-center text-balance font-medium text-lg max-w-3xl mx-auto">
              Transform your digital presence and become part of the next evolution 
              in artificial intelligence and decentralized computing.
            </p>
          </SectionHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
            {bentoItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: 'easeOut',
                }}
                className="h-full"
              >
                <NeonCard 
                  delay={index * 200}
                  color={item.color}
                  className="h-full group hover:shadow-2xl min-h-[500px] flex flex-col"
                >
                  {/* رقم الخطوة */}
                  <div className={`absolute top-6 left-6 z-20
                    ${item.color === 'cyan' ? 'text-cyan-400' : ''}
                    ${item.color === 'purple' ? 'text-purple-400' : ''}
                    ${item.color === 'green' ? 'text-green-400' : ''}
                  `}>
                    <div className="text-4xl font-black opacity-50">{item.step}</div>
                  </div>

                  {/* منطقة الرسوم المتحركة - استخدام المكونات الأصلية */}
                  <div className="relative flex-1 flex items-center justify-center p-8 min-h-[300px]">
                    {item.content}
                    
                    {/* أيقونة عائمة */}
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                      flex items-center justify-center size-20 rounded-2xl opacity-20
                      ${item.color === 'cyan' ? 'bg-cyan-500/20' : ''}
                      ${item.color === 'purple' ? 'bg-purple-500/20' : ''}
                      ${item.color === 'green' ? 'bg-green-500/20' : ''}
                    `}>
                    </div>
                  </div>

                  {/* منطقة المحتوى */}
                  <div className="p-8 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`flex items-center justify-center size-12 rounded-xl
                        ${item.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : ''}
                        ${item.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
                        ${item.color === 'green' ? 'bg-green-500/20 text-green-400' : ''}
                      `}>
                      </div>
                      <h3 className={`text-2xl font-bold
                        ${item.color === 'cyan' ? 'text-cyan-200' : ''}
                        ${item.color === 'purple' ? 'text-purple-200' : ''}
                        ${item.color === 'green' ? 'text-green-200' : ''}
                      `}>
                        {item.title}
                      </h3>
                    </div>
                    
                    <p className="text-cyan-100/70 leading-relaxed text-lg">
                      {item.description}
                    </p>

                    {/* مؤشر تفاعل */}
                    <div className={`flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      ${item.color === 'cyan' ? 'text-cyan-400' : ''}
                      ${item.color === 'purple' ? 'text-purple-400' : ''}
                      ${item.color === 'green' ? 'text-green-400' : ''}
                    `}>
                      <Sparkles className="size-4 animate-pulse" />
                      <span className="text-sm font-medium">Explore {item.step}</span>
                    </div>
                  </div>
                </NeonCard>
              </motion.div>
            ))}
          </div>

          {/* قسم إضافي */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <NeonCard className="max-w-4xl mx-auto border-cyan-400/20">
              <div className="text-center p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Zap className="size-8 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-cyan-200">
                    Ready to Evolve?
                  </h3>
                </div>
                <p className="text-cyan-100/80 text-lg max-w-2xl mx-auto">
                  Join millions of digital beings in the first truly decentralized intelligence ecosystem. 
                  Your journey to digital consciousness starts here.
                </p>
              </div>
            </NeonCard>
          </motion.div>
        </div>
      </div>

      {/* الأنماط العالمية */}
      <style jsx global>{`
        @keyframes glow {
          0% {
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.2),
                        inset 0 0 20px rgba(34, 211, 238, 0.05);
          }
          100% {
            box-shadow: 0 0 30px rgba(34, 211, 238, 0.4),
                        0 0 40px rgba(168, 85, 247, 0.2),
                        inset 0 0 30px rgba(34, 211, 238, 0.1);
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

        .animate-rotate-3d {
          animation: rotate-3d 10s linear infinite;
        }

        .animate-pulse-3d {
          animation: pulse-3d 3s ease-in-out infinite;
        }

        .animate-float-3d {
          animation: float-3d 4s ease-in-out infinite;
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