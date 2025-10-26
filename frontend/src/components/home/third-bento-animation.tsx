'use client';

import { motion, useInView, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Brain, Network, Cpu, Database, Shield, Zap, Cloud, Users } from 'lucide-react';

interface TaskConfig {
  title: string;
  icon: React.ReactNode;
  status: 'pending' | 'processing' | 'completed';
  className: string;
  color: 'cyan' | 'purple' | 'green' | 'pink';
}

const taskConfigs: TaskConfig[] = [
  {
    title: 'Digital Twin Initialized', 
    icon: <Brain className="size-4" />,
    status: 'completed',
    className: 'bg-cyan-500/20 border border-cyan-400/30 text-cyan-200',
    color: 'cyan'
  },
  {
    title: 'Neural Network Connected',
    icon: <Network className="size-4" />,
    status: 'completed',
    className: 'bg-purple-500/20 border border-purple-400/30 text-purple-200',
    color: 'purple'
  },
  {
    title: 'Blockchain Sync Active',
    icon: <Shield className="size-4" />,
    status: 'processing',
    className: 'bg-green-500/20 border border-green-400/30 text-green-200',
    color: 'green'
  },
  {
    title: 'Cognitive Processing',
    icon: <Cpu className="size-4" />,
    status: 'pending',
    className: 'bg-pink-500/20 border border-pink-400/30 text-pink-200',
    color: 'pink'
  },
  {
    title: 'Data Stream Analysis',
    icon: <Database className="size-4" />,
    status: 'pending',
    className: 'bg-cyan-500/20 border border-cyan-400/30 text-cyan-200',
    color: 'cyan'
  },
  {
    title: 'Spatial Integration',
    icon: <Cloud className="size-4" />,
    status: 'pending',
    className: 'bg-purple-500/20 border border-purple-400/30 text-purple-200',
    color: 'purple'
  },
];

export function AITaskExecution({
  shouldAnimate,
  startAnimationDelay,
}: {
  shouldAnimate: boolean;
  startAnimationDelay?: number;
}) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [showTasks, setShowTasks] = useState(false);

  useEffect(() => {
    if (!shouldAnimate) {
      setShowTasks(false);
      setCurrentTaskIndex(0);
      return;
    }

    const timeoutId = setTimeout(
      () => {
        setShowTasks(true);
      },
      (startAnimationDelay || 0) * 1000,
    );

    return () => clearTimeout(timeoutId);
  }, [shouldAnimate, startAnimationDelay]);

  useEffect(() => {
    if (!showTasks) return;

    const intervalId = setInterval(() => {
      setCurrentTaskIndex((prev) => {
        if (prev < taskConfigs.length - 1) {
          return prev + 1;
        }
        return 0; // Reset to start the cycle again
      });
    }, 1200);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [showTasks]);

  return (
    <div className="w-full max-w-md mx-auto px-6 space-y-3">
      {/* Neural Core Icon */}
      <div className="flex justify-center mb-6">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: showTasks ? 1 : 0,
            opacity: showTasks ? 1 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: 'backOut',
          }}
          className="relative"
        >
          <div className="size-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/25">
            <Brain className="size-8 text-white" />
          </div>
          {/* Pulsing neural rings */}
          <motion.div
            className="absolute inset-0 border-2 border-cyan-400 rounded-2xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute inset-0 border-2 border-purple-400 rounded-2xl"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </motion.div>
      </div>

      {/* System Status Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: showTasks ? 1 : 0, y: showTasks ? 0 : -10 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-6"
      >
        <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Neural System Status
        </h3>
        <p className="text-cyan-200/70 text-sm">Digital Twin Initialization</p>
      </motion.div>

      {/* Task List */}
      <AnimatePresence>
        {taskConfigs.map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{
              opacity: showTasks && index <= currentTaskIndex ? 1 : 0.3,
              x: showTasks ? 0 : -30,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
              ease: 'easeOut',
            }}
            className={`relative flex items-center gap-3 p-4 rounded-xl transition-all duration-500 group overflow-hidden ${
              index <= currentTaskIndex ? task.className : 'bg-black/40 border border-white/10 text-white/30'
            }`}
          >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-white/5 bg-[size:10px_10px] opacity-20" />
            
            {/* Animated Border */}
            {index === currentTaskIndex && (
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* Status indicator */}
            <div className="flex-shrink-0 relative z-10">
              {index < currentTaskIndex ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`size-6 rounded-full flex items-center justify-center shadow-lg
                    ${task.color === 'cyan' ? 'bg-cyan-500' : ''}
                    ${task.color === 'purple' ? 'bg-purple-500' : ''}
                    ${task.color === 'green' ? 'bg-green-500' : ''}
                    ${task.color === 'pink' ? 'bg-pink-500' : ''}
                  `}
                >
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="size-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </motion.svg>
                </motion.div>
              ) : index === currentTaskIndex ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className={`size-6 border-2 rounded-full border-t-transparent
                    ${task.color === 'cyan' ? 'border-cyan-400' : ''}
                    ${task.color === 'purple' ? 'border-purple-400' : ''}
                    ${task.color === 'green' ? 'border-green-400' : ''}
                    ${task.color === 'pink' ? 'border-pink-400' : ''}
                  `}
                />
              ) : (
                <div className="size-6 border-2 border-white/20 rounded-full" />
              )}
            </div>

            {/* Task icon and title */}
            <div className="flex items-center gap-3 relative z-10">
              <div className={`p-1.5 rounded-lg
                ${task.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : ''}
                ${task.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : ''}
                ${task.color === 'green' ? 'bg-green-500/20 text-green-400' : ''}
                ${task.color === 'pink' ? 'bg-pink-500/20 text-pink-400' : ''}
              `}>
                {task.icon}
              </div>
              <span className="text-sm font-semibold">{task.title}</span>
            </div>

            {/* Processing dots for current task */}
            {index === currentTaskIndex && (
              <motion.div
                className="flex gap-1 ml-auto relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    className={`w-1.5 h-1.5 rounded-full
                      ${task.color === 'cyan' ? 'bg-cyan-400' : ''}
                      ${task.color === 'purple' ? 'bg-purple-400' : ''}
                      ${task.color === 'green' ? 'bg-green-400' : ''}
                      ${task.color === 'pink' ? 'bg-pink-400' : ''}
                    `}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: dot * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* System Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showTasks ? 1 : 0, y: showTasks ? 0 : 20 }}
        transition={{ delay: 1 }}
        className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/10"
      >
        <div className="text-center">
          <div className="text-cyan-400 text-sm font-bold">86%</div>
          <div className="text-cyan-200/60 text-xs">Neural Load</div>
        </div>
        <div className="text-center">
          <div className="text-green-400 text-sm font-bold">24ms</div>
          <div className="text-cyan-200/60 text-xs">Latency</div>
        </div>
        <div className="text-center">
          <div className="text-purple-400 text-sm font-bold">2.5M</div>
          <div className="text-cyan-200/60 text-xs">Nodes</div>
        </div>
      </motion.div>
    </div>
  );
}

export function ThirdBentoAnimation({
  startAnimationDelay = 0,
  once = false,
}: {
  data?: number[];
  toolTipValues?: number[];
  color?: string;
  startAnimationDelay?: number;
  once?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShouldAnimate(true);
    } else {
      setShouldAnimate(false);
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="relative flex size-full items-center justify-center h-[400px] overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-500/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="flex items-center justify-center w-full h-full relative z-10">
        <AITaskExecution
          shouldAnimate={shouldAnimate}
          startAnimationDelay={startAnimationDelay}
        />
      </div>

      {/* Gradient Overlay */}
    </div>
  );
}