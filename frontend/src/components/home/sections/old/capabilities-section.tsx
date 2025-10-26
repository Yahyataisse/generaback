'use client';

import { SectionHeader } from '@/components/home/section-header';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { 
  FileText,
  Image,
  Presentation,
  Globe,
  BarChart3,
  ShoppingCart,
  Users,
  Clock,
  Brain,
  Cpu,
  Network,
  Shield,
  Zap,
  Cloud,
  Database,
  Code,
  Sparkles
} from 'lucide-react';

// مكون البطاقة النيونية
const NeonCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  color?: 'cyan' | 'purple' | 'green' | 'pink';
}> = ({ 
  children, 
  className, 
  delay = 0,
  color = 'cyan'
}) => {
  const colorClasses = {
    cyan: 'border-cyan-400/30 shadow-cyan-500/20 before:from-cyan-500/10 before:via-cyan-500/5',
    purple: 'border-purple-400/30 shadow-purple-500/20 before:from-purple-500/10 before:via-purple-500/5',
    green: 'border-green-400/30 shadow-green-500/20 before:from-green-500/10 before:via-green-500/5',
    pink: 'border-pink-400/30 shadow-pink-500/20 before:from-pink-500/10 before:via-pink-500/5'
  };

  return (
    <div 
      className={`
        relative bg-black/60 backdrop-blur-xl border rounded-2xl p-6
        shadow-2xl hover:shadow-xl transition-all duration-500
        hover:scale-[1.02] hover:border-opacity-60
        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:to-transparent
        overflow-hidden group
        ${colorClasses[color]}
        ${className}
      `}
      style={{
        animation: `glow 3s ease-in-out ${delay}ms infinite alternate`
      }}
    >
      {/* شبكة خلفية متحركة */}
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px] opacity-30" />
      
      {/* تأثير توهج عند hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-current opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
      
      {children}
    </div>
  );
};

// أشكال ثلاثية الأبعاد متحركة
const ThreeDShape: React.FC<{ 
  type: 'cube' | 'sphere' | 'pyramid' | 'torus';
  className?: string;
  color?: string;
}> = ({ 
  type, 
  className,
  color = 'cyan'
}) => {
  const colorClasses = {
    cyan: 'border-cyan-400/50 bg-cyan-400/10',
    purple: 'border-purple-400/50 bg-purple-400/10',
    green: 'border-green-400/50 bg-green-400/10',
    pink: 'border-pink-400/50 bg-pink-400/10'
  };

  return (
    <div className={cn(
      "absolute opacity-40 group-hover:opacity-70 transition-opacity duration-500",
      type === 'cube' && "w-8 h-8 animate-rotate-3d",
      type === 'sphere' && "w-10 h-10 animate-pulse-3d rounded-full",
      type === 'pyramid' && "w-12 h-10 animate-float-3d",
      type === 'torus' && "w-9 h-9 animate-spin-3d rounded-full",
      colorClasses[color],
      className
    )}>
      <div className={cn(
        "absolute inset-0 border-2 backdrop-blur-sm",
        type === 'cube' && "",
        type === 'sphere' && "",
        type === 'pyramid' && "clip-path-pyramid",
        type === 'torus' && "border-double"
      )} />
    </div>
  );
};

const capabilities = [
  {
    title: 'Digital Twin Creation',
    description: 'Generate autonomous AI entities that evolve with user behavior and learn from interactions in real-time.',
    icon: <Brain className="size-6" />,
    color: 'cyan' as const,
    shapes: [
      { type: 'sphere' as const, position: 'top-2 right-2', color: 'cyan' },
      { type: 'cube' as const, position: 'bottom-4 left-4', color: 'cyan' }
    ]
  },
  {
    title: 'Cognitive Processing',
    description: 'Advanced neural networks that analyze, reason, and make intelligent decisions based on contextual data.',
    icon: <Cpu className="size-6" />,
    color: 'purple' as const,
    shapes: [
      { type: 'pyramid' as const, position: 'top-4 left-4', color: 'purple' },
      { type: 'torus' as const, position: 'bottom-2 right-2', color: 'purple' }
    ]
  },
  {
    title: 'Blockchain Integration',
    description: 'Secure all transactions and data exchanges with immutable blockchain technology and smart contracts.',
    icon: <Shield className="size-6" />,
    color: 'green' as const,
    shapes: [
      { type: 'cube' as const, position: 'top-6 left-6', color: 'green' },
      { type: 'sphere' as const, position: 'bottom-6 right-6', color: 'green' }
    ]
  },
  {
    title: 'Spatial Computing',
    description: 'Create immersive AR/VR experiences and interact with digital twins in 3D spatial environments.',
    icon: <Globe className="size-6" />,
    color: 'pink' as const,
    shapes: [
      { type: 'torus' as const, position: 'top-2 left-2', color: 'pink' },
      { type: 'pyramid' as const, position: 'bottom-4 right-4', color: 'pink' }
    ]
  },
  {
    title: 'Neural Analytics',
    description: 'Process complex datasets with AI-powered analytics and generate predictive insights automatically.',
    icon: <BarChart3 className="size-6" />,
    color: 'cyan' as const,
    shapes: [
      { type: 'sphere' as const, position: 'top-4 right-4', color: 'cyan' },
      { type: 'cube' as const, position: 'bottom-2 left-2', color: 'cyan' }
    ]
  },
  {
    title: 'Decentralized Economy',
    description: 'Participate in the intelligence economy with tokenized rewards and value exchange between digital twins.',
    icon: <ShoppingCart className="size-6" />,
    color: 'purple' as const,
    shapes: [
      { type: 'pyramid' as const, position: 'top-2 right-4', color: 'purple' },
      { type: 'torus' as const, position: 'bottom-4 left-2', color: 'purple' }
    ]
  },
  {
    title: 'Collective Intelligence',
    description: 'Connect with other digital twins to form collaborative networks and share knowledge across the ecosystem.',
    icon: <Users className="size-6" />,
    color: 'green' as const,
    shapes: [
      { type: 'cube' as const, position: 'top-4 left-2', color: 'green' },
      { type: 'sphere' as const, position: 'bottom-2 right-4', color: 'green' }
    ]
  },
  {
    title: 'Continuous Evolution',
    description: 'Digital twins that learn 24/7, adapting to new information and improving their capabilities over time.',
    icon: <Zap className="size-6" />,
    color: 'pink' as const,
    shapes: [
      { type: 'torus' as const, position: 'top-6 right-6', color: 'pink' },
      { type: 'pyramid' as const, position: 'bottom-6 left-6', color: 'pink' }
    ]
  },
];

export function CapabilitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="capabilities"
      className="flex flex-col items-center justify-center w-full relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 py-20"
      ref={ref}
    >
      {/* خلفية متحركة */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative w-full px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-center text-balance pb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Genera Ecosystem Capabilities
            </h2>
            <p className="text-cyan-200/80 text-center text-balance font-medium text-lg max-w-3xl mx-auto">
              Experience the next evolution of digital intelligence with our comprehensive suite of 
              blockchain-powered AI capabilities.
            </p>
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                className="h-full"
              >
                <NeonCard 
                  delay={index * 100}
                  color={capability.color}
                  className="h-full group hover:shadow-2xl"
                >
                  {/* أشكال ثلاثية الأبعاد */}
                  {capability.shapes.map((shape, shapeIndex) => (
                    <ThreeDShape
                      key={shapeIndex}
                      type={shape.type}
                      color={shape.color}
                      className={shape.position}
                    />
                  ))}

                  {/* المحتوى */}
                  <div className="relative z-10">
                    {/* الأيقونة */}
                    <div className={`flex items-center justify-center size-14 rounded-2xl mb-4 transition-all duration-500 group-hover:scale-110
                      ${capability.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : ''}
                      ${capability.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
                      ${capability.color === 'green' ? 'bg-green-500/20 text-green-400' : ''}
                      ${capability.color === 'pink' ? 'bg-pink-500/20 text-pink-400' : ''}
                    `}>
                      <div className="transition-transform duration-300 group-hover:scale-110">
                        {capability.icon}
                      </div>
                    </div>

                    {/* العنوان والوصف */}
                    <div className="space-y-3">
                      <h3 className={`text-xl font-bold tracking-tight leading-tight
                        ${capability.color === 'cyan' ? 'text-cyan-200' : ''}
                        ${capability.color === 'purple' ? 'text-purple-200' : ''}
                        ${capability.color === 'green' ? 'text-green-200' : ''}
                        ${capability.color === 'pink' ? 'text-pink-200' : ''}
                      `}>
                        {capability.title}
                      </h3>
                      <p className="text-cyan-100/70 leading-relaxed text-sm">
                        {capability.description}
                      </p>
                    </div>

                    {/* مؤشر تفاعل */}
                    <div className={`absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500
                      ${capability.color === 'cyan' ? 'text-cyan-400' : ''}
                      ${capability.color === 'purple' ? 'text-purple-400' : ''}
                      ${capability.color === 'green' ? 'text-green-400' : ''}
                      ${capability.color === 'pink' ? 'text-pink-400' : ''}
                    `}>
                      <Sparkles className="size-4 animate-pulse" />
                    </div>
                  </div>
                </NeonCard>
              </motion.div>
            ))}
          </div>

          {/* قسم إضافي للخصائص */}
          <div className="mt-16 text-center">
            <NeonCard className="max-w-4xl mx-auto border-cyan-400/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-cyan-200 mb-4">
                  Join the Digital Civilization
                </h3>
                <p className="text-cyan-100/80 text-lg max-w-2xl mx-auto">
                  Every capability is powered by our unified architecture of AI, Blockchain, 
                  and Spatial Computing - creating a seamless digital ecosystem.
                </p>
              </div>
            </NeonCard>
          </div>
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
          50% { transform: scale(1.2); }
        }

        @keyframes float-3d {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-8px) rotateX(10deg); }
        }

        @keyframes spin-3d {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
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

        .animate-spin-3d {
          animation: spin-3d 6s linear infinite;
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