'use client';

import { useState } from 'react';
import { SectionHeader } from '@/components/home/section-header';
import { FooterSection } from '@/components/home/sections/footer-section';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  Clock, 
  Shield, 
  Users, 
  Zap,
  Star,
  Calendar,
  Headphones,
  Settings,
  TrendingUp,
  Sparkles,
  Cpu,
  Network,
  Brain,
  Globe,
  
  Link2,
  Blocks
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { KortixEnterpriseModal } from '@/components/sidebar/kortix-enterprise-modal';
import { KortixLogo } from '@/components/sidebar/kortix-logo';

// 3D Blockchain Animated Shapes Component
const BlockchainShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Blockchain Cubes */}
      <motion.div
        className="absolute top-20 left-10 w-6 h-6 border border-blue-400/40 rounded shadow-lg shadow-blue-400/20"
        animate={{
          y: [0, -30, 0],
          rotateY: [0, 180, 360],
          rotateX: [0, 90, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-5 h-5 border border-purple-400/40 rounded shadow-lg shadow-purple-400/20"
        animate={{
          y: [0, 25, 0],
          rotateZ: [0, 45, 90, 135, 180],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Blockchain Chain Links */}
      <motion.div
        className="absolute top-1/4 left-1/4"
        animate={{
          x: [0, 10, 0, -10, 0],
          y: [0, -10, 0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-blue-400/30 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-400/30 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-400/30 rounded-full"></div>
        </div>
      </motion.div>

      {/* Pulsing Blockchain Nodes */}
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400/40 to-purple-400/40 border border-blue-400/30"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Blockchain Grid Lines */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 95%, #3b82f6 100%),
            linear-gradient(0deg, transparent 95%, #8b5cf6 100%)
          `,
          backgroundSize: '50px 50px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating Blockchain Blocks */}
      <motion.div
        className="absolute bottom-20 left-32"
        animate={{
          y: [0, -15, 0],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 bg-blue-400/50 border border-blue-400/70"></div>
          <div className="w-4 h-4 bg-purple-400/50 border border-purple-400/70"></div>
          <div className="w-4 h-4 bg-blue-400/50 border border-blue-400/70"></div>
        </div>
      </motion.div>

      {/* Animated Connection Lines */}
      <motion.div
        className="absolute top-1/2 right-20 w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Holographic Blockchain Ring */}
      <motion.div
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotateZ: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-20 h-20 border-2 border-blue-400/30 rounded-full shadow-lg shadow-blue-400/20">
          <div className="w-16 h-16 border-2 border-purple-400/30 rounded-full m-2 shadow-lg shadow-purple-400/20"></div>
        </div>
      </motion.div>
    </div>
  );
};

// Neon Background Component
const NeonBackground = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 overflow-hidden">
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                                radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 2px)`,
               backgroundSize: '100px 100px, 150px 150px'
             }}>
        </div>
      </div>
      
      {/* Floating Particles */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-1 h-1 bg-blue-400 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-2/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full"
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-40 h-40 bg-purple-400/10 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
};

// Hero Section Component
const CustomHeroSection = () => {
  return (
    <section className="w-full relative overflow-hidden min-h-screen">
      <NeonBackground />
      <BlockchainShapes />
      <div className="relative flex flex-col items-center w-full px-6">
        <div className="relative z-10 pt-32 mx-auto h-full w-full max-w-6xl flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-6 pt-12 max-w-4xl mx-auto">
            {/* Genera Logo Placeholder */}
            <div className="mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Digital Civilization Infrastructure</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tighter text-balance text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              <span>The Future of</span>
              <br />
              <span>Digital Intelligence</span>
            </h1>
            
            <p className="text-lg md:text-xl text-center text-gray-300 font-medium text-balance leading-relaxed tracking-tight max-w-3xl">
              Genera redefines the relationship between intelligence, data, and human life through decentralized AI, blockchain infrastructure, and spatial computing.
            </p>
            
            <div className="flex flex-col items-center gap-6 pt-6">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Calendar className="w-4 h-4 mr-2" />
                Explore Genera Ecosystem
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                  <span>Decentralized Intelligence</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                  <span>Digital Twin Network</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                  <span>Spatial Computing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-16 sm:mt-32 mx-auto"></div>
      </div>
    </section>
  );
};

// Value Proposition Section
const ValuePropSection = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full relative bg-black">
      <NeonBackground />
      <BlockchainShapes />
      <div className="relative w-full px-6">
        <div className="max-w-6xl mx-auto border-l border-r border-gray-800">
          <SectionHeader>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance pb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Three Pillars of Genera
            </h2>
            <p className="text-gray-400 text-center text-balance font-medium">
              A unified infrastructure merging artificial intelligence, blockchain, and immersive reality into a single digital civilization
            </p>
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-800">
            <div className="p-8 border-r border-gray-800 group hover:bg-gradient-to-br from-blue-500/5 to-transparent transition-all duration-300">
              <div className="space-y-6">
                <motion.div 
                  className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Brain className="w-6 h-6 text-blue-400" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Artificial Intelligence</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Autonomous Digital Twins that evolve alongside users, creating a distributed intelligence network that learns and adapts continuously.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-8 border-r border-gray-800 group hover:bg-gradient-to-br from-purple-500/5 to-transparent transition-all duration-300">
              <div className="space-y-6">
                <motion.div 
                  className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-purple-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Network className="w-6 h-6 text-purple-400" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Blockchain Infrastructure</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Proof of Intelligence consensus ensures trust, data sovereignty, and value transfer without central intermediaries.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 group hover:bg-gradient-to-br from-blue-500/5 to-transparent transition-all duration-300">
              <div className="space-y-6">
                <motion.div 
                  className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-500/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Globe className="w-6 h-6 text-blue-400" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Spatial Computing</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Merges physical and digital realities into seamless interactive environments through AR/VR interfaces and immersive experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Implementation Process Section
const ProcessSection = () => {
  const steps = [
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Digital Twin Genesis",
      description: "Each user receives a personalized Digital Twin that observes, learns, and evolves through behavioral patterns and cognitive input, creating a baseline behavioral model.",
      phase: "Observation"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Cognitive Adaptation", 
      description: "Digital Twins refine their models based on new data, feedback, and environmental signals, evolving into semi-autonomous assistants within the network.",
      phase: "Adaptation"
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Autonomous Intelligence",
      description: "Digital Twins achieve self-learning capabilities and decision-making independence, becoming fully autonomous cognitive entities within the Genera ecosystem.",
      phase: "Autonomy"
    }
  ];

  return (
    <section className="flex flex-col items-center justify-center w-full relative bg-black">
      <NeonBackground />
      <BlockchainShapes />
      <div className="relative w-full px-6">
        <div className="max-w-6xl mx-auto border-l border-r border-gray-800">
          <SectionHeader>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance pb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Digital Twin Lifecycle
            </h2>
            <p className="text-gray-400 text-center text-balance font-medium">
              The evolutionary journey of autonomous AI entities within the Genera ecosystem
            </p>
          </SectionHeader>

          <div className="border-t border-gray-800">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row gap-8 p-8 group hover:bg-gradient-to-r from-blue-500/5 to-purple-500/5 transition-all duration-300 ${index !== steps.length - 1 ? 'border-b border-gray-800' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30 group-hover:border-blue-500/60 transition-all duration-300">
                    {step.icon}
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                    <span className="px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                      {step.phase}
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Benefits Section
const BenefitsSection = () => {
  const benefits = [
    "Sovereign data ownership through blockchain-based verification",
    "Continuous evolutionary intelligence through decentralized learning",
    "Seamless reality integration across physical and digital realms",
    "Cognitive contracts that adapt through AI context interpretation",
    "Quantum-resistant security with self-learning threat detection",
    "Cross-chain interoperability with major blockchain ecosystems"
  ];

  return (
    <section className="flex flex-col items-center justify-center w-full relative bg-black">
      <NeonBackground />
      <BlockchainShapes />
      <div className="relative w-full px-6">
        <div className="max-w-6xl mx-auto border-l border-r border-gray-800">
          <SectionHeader>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance pb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Core Architecture Principles
            </h2>
            <p className="text-gray-400 text-center text-balance font-medium">
              The foundational pillars that sustain Genera as a self-evolving digital civilization
            </p>
          </SectionHeader>

          <div className="border-t border-gray-800 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg hover:bg-gradient-to-r from-blue-500/10 to-purple-500/10 transition-all duration-300 group border border-gray-800 hover:border-blue-500/30"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 group-hover:bg-blue-500/30 transition-colors duration-300">
                    <Check className="w-3 h-3 text-blue-400" />
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-white">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full relative bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <NeonBackground />
      <BlockchainShapes />
      <div className="relative w-full px-6">
        <div className="max-w-6xl mx-auto border-l border-r border-gray-800">
          <SectionHeader>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance pb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Join the Digital Civilization
            </h2>
            <p className="text-gray-400 text-center text-balance font-medium">
              Be part of the next evolutionary stage where intelligence, economy, and identity converge into a unified digital existence.
            </p>
          </SectionHeader>

          <div className="border-t border-gray-800 p-8">
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <div className="space-y-6">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Begin Your Digital Evolution
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center max-w-2xl mx-auto">
                    <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20">
                      <Shield className="w-6 h-6 text-blue-400" />
                      <span className="text-sm font-medium text-white">Data Sovereignty</span>
                      <span className="text-xs text-gray-400">Complete ownership</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20">
                      <Users className="w-6 h-6 text-purple-400" />
                      <span className="text-sm font-medium text-white">Digital Twins</span>
                      <span className="text-xs text-gray-400">Autonomous AI entities</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20">
                      <Globe className="w-6 h-6 text-blue-400" />
                      <span className="text-sm font-medium text-white">Spatial Reality</span>
                      <span className="text-xs text-gray-400">Immersive integration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Page Component
export default function CustomImplementationPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full bg-black">
      <div className="w-full divide-y divide-gray-800">
        <CustomHeroSection />
        <ValuePropSection />
        <ProcessSection />
        <BenefitsSection />
        <FinalCTASection />
        <FooterSection />
      </div>
    </main>
  );
}