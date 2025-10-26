/* eslint-disable @next/next/no-img-element */
'use client';

import {
  Reasoning,
  ReasoningContent,
  ReasoningResponse,
} from '@/components/home/ui/reasoning';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Brain, Network, Cpu, Sparkles } from 'lucide-react';

export function ReasoningBasic() {
  const reasoningText = `Perfect! I'll initialize your Digital Twin with advanced neural capabilities. The entity will learn from your behavior patterns, integrate with blockchain for secure transactions, and provide real-time cognitive processing across all your digital interactions.`;

  return (
    <Reasoning>
      <ReasoningContent className="">
        <ReasoningResponse text={reasoningText} />
      </ReasoningContent>
    </Reasoning>
  );
}

export function FirstBentoAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isInView) {
      timeoutId = setTimeout(() => {
        setShouldAnimate(true);
      }, 1000);
    } else {
      setShouldAnimate(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="w-full h-full p-4 flex flex-col items-center justify-center gap-5 relative"
    >
      {/* خلفية متحركة */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      
      <motion.div
        className="max-w-md mx-auto w-full flex flex-col gap-4 relative z-10"
        animate={{
          y: shouldAnimate ? -75 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* User Message */}
        <div className="flex items-end justify-end gap-3">
          <motion.div
            className="max-w-[280px] bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-100 p-4 rounded-2xl ml-auto shadow-2xl shadow-cyan-500/20"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
          >
            <p className="text-sm leading-relaxed">
              I want to create a Digital Twin that can learn from my behavior and 
              handle complex cognitive tasks autonomously. Can you help me initialize 
              this neural entity?
            </p>
          </motion.div>
          <div className="flex items-center bg-black/60 backdrop-blur-xl rounded-full w-fit border border-cyan-400/30 flex-shrink-0 shadow-2xl shadow-cyan-500/20">
            <div className="size-10 rounded-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-purple-500">
              <Brain className="size-5 text-white" />
            </div>
          </div>
        </div>

        {/* AI Response */}
        <div className="flex items-start gap-3">
          <div className="flex items-center bg-black/60 backdrop-blur-xl rounded-full size-12 flex-shrink-0 justify-center shadow-2xl shadow-purple-500/20 border border-purple-400/30">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
              <Cpu className="size-5 text-white" />
            </div>
          </div>

          <div className="relative flex-1">
            <AnimatePresence mode="wait">
              {!shouldAnimate ? (
                <motion.div
                  key="dots"
                  className="absolute left-0 top-0 bg-black/60 backdrop-blur-xl p-4 rounded-2xl border border-cyan-400/30 shadow-2xl shadow-cyan-500/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeOut',
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <span className="text-cyan-300 text-sm font-medium">Neural Processing</span>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((index) => (
                        <motion.div
                          key={index}
                          className="w-2 h-2 bg-cyan-400 rounded-full"
                          animate={{ 
                            y: [0, -6, 0],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: index * 0.2,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="response"
                  layout
                  className="absolute left-0 top-0 md:min-w-[320px] min-w-[240px] p-4 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-400/30 rounded-2xl shadow-2xl shadow-purple-500/20 backdrop-blur-xl"
                  initial={{ opacity: 0, x: 10, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeOut',
                  }}
                >
                  {/* Neural Network Indicator */}
                  <div className="flex items-center gap-2 mb-3">
                    <Network className="size-4 text-green-400" />
                    <span className="text-green-400 text-xs font-medium">Neural Network Active</span>
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                  
                  <ReasoningBasic />
                  
                  {/* Cognitive Metrics */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-between mt-3 pt-3 border-t border-white/10"
                  >
                    <div className="flex items-center gap-1">
                      <Sparkles className="size-3 text-cyan-400" />
                      <span className="text-cyan-300 text-xs">Cognitive Load: 68%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-300 text-xs">Blockchain: Synced</span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Neural Particles */}
        <div className="absolute -top-4 -right-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              animate={{
                y: [0, -15, 0],
                x: [0, 10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: 'easeInOut',
              }}
              style={{
                left: `${i * 8}px`,
                top: `${i * 6}px`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes glow {
          0% {
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
          }
          100% {
            box-shadow: 0 0 30px rgba(34, 211, 238, 0.5),
                        0 0 40px rgba(168, 85, 247, 0.3);
          }
        }
      `}</style>
    </div>
  );
}