"use client";

import { Book, Code, Cpu, Database, Globe, Lock, Network, Server, Shield, Zap, Sparkles, Brain, Users, Cloud, Terminal, FileText, GitBranch, Cog, Rocket } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";

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
        "hover:border-cyan-400/60 hover:scale-[1.02]",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-cyan-500/10 before:via-purple-500/10 before:to-pink-500/10",
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

const FloatingOrbs: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute w-4 h-4 bg-cyan-400 rounded-full animate-float opacity-20"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 10}%`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
    </div>
  );
};

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = "typescript" }) => {
  return (
    <div className="bg-black/60 border border-cyan-400/20 rounded-lg p-4 font-mono text-sm text-cyan-100 overflow-x-auto">
      <div className="flex items-center gap-2 mb-2">
        <Terminal className="h-4 w-4 text-cyan-400" />
        <span className="text-cyan-400 text-xs">{language}</span>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
}> = ({ icon, title, description, features, color }) => {
  return (
    <NeonCard className="h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color} text-white`}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-cyan-100/80">{description}</p>
        </div>
      </div>
      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-cyan-200/70">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            {feature}
          </div>
        ))}
      </div>
    </NeonCard>
  );
};

const QuickStartSection: React.FC = () => {
  const installationCode = `# Install Genera CLI
npm install -g @genera/cli

# Initialize new project
genera init my-digital-twin

# Configure your environment
cd my-digital-twin
genera config set --chain=testnet

# Deploy your first Digital Twin
genera deploy --profile=default`;

  const sdkCode = `import { GeneraSDK } from '@genera/sdk';

// Initialize SDK
const genera = new GeneraSDK({
  apiKey: process.env.GENERA_API_KEY,
  environment: 'testnet'
});

// Create Digital Twin
const digitalTwin = await genera.digitalTwins.create({
  name: 'MyAssistant',
  capabilities: ['learning', 'autonomy']
});

// Interact with AI layer
const response = await digitalTwin.process({
  input: 'Analyze market trends',
  context: 'financial-analysis'
});`;

  return (
    <NeonCard>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6 flex items-center gap-3">
        <Rocket className="h-6 w-6" />
        Quick Start Guide
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Cog className="h-5 w-5 text-cyan-400" />
            Installation & Setup
          </h3>
          <CodeBlock code={installationCode} language="bash" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Code className="h-5 w-5 text-purple-400" />
            SDK Integration
          </h3>
          <CodeBlock code={sdkCode} />
        </div>
      </div>
    </NeonCard>
  );
};

const APISection: React.FC = () => {
  const apiExamples = [
    {
      title: "Digital Twins Management",
      code: `// Create a new Digital Twin
POST /v1/digital-twins
{
  "name": "TradingAssistant",
  "capabilities": ["analysis", "prediction"],
  "memory_size": "2GB"
}

// List all Digital Twins
GET /v1/digital-twins

// Interact with Twin
POST /v1/digital-twins/{id}/process
{
  "input": "Current market analysis",
  "context": "trading"
}`
    },
    {
      title: "Blockchain Operations",
      code: `// Deploy Cognitive Contract
POST /v1/blockchain/contracts
{
  "type": "cognitive",
  "logic": "adaptive-trading",
  "parameters": {
    "risk_tolerance": "medium",
    "learning_rate": 0.01
  }
}

// Query Chain State
GET /v1/blockchain/state/{address}`
    }
  ];

  return (
    <NeonCard>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-6 flex items-center gap-3">
        <Server className="h-6 w-6" />
        API Reference
      </h2>
      
      <div className="space-y-6">
        {apiExamples.map((example, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-white mb-3">{example.title}</h3>
            <CodeBlock code={example.code} language="javascript" />
          </div>
        ))}
      </div>
    </NeonCard>
  );
};

const ArchitectureSection: React.FC = () => {
  const layers = [
    {
      name: "AI Layer",
      description: "Digital Twins & Cognitive Computing",
      components: ["Federated Learning", "Neural Networks", "Adaptive Models"],
      icon: <Brain className="h-8 w-8" />,
      color: "from-cyan-500 to-blue-600"
    },
    {
      name: "Blockchain Layer",
      description: "Genera Chain & Proof of Intelligence",
      components: ["Smart Contracts", "Consensus", "Identity Management"],
      icon: <Shield className="h-8 w-8" />,
      color: "from-green-500 to-emerald-600"
    },
    {
      name: "Interaction Layer",
      description: "AR/VR & Spatial Computing",
      components: ["3D Rendering", "Real-time Sync", "Biofeedback"],
      icon: <Globe className="h-8 w-8" />,
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <NeonCard>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 flex items-center gap-3">
        <Network className="h-6 w-6" />
        System Architecture
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {layers.map((layer, index) => (
          <div key={index} className="text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${layer.color} flex items-center justify-center text-white`}>
              {layer.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{layer.name}</h3>
            <p className="text-cyan-200/70 text-sm mb-3">{layer.description}</p>
            <div className="space-y-1">
              {layer.components.map((component, compIndex) => (
                <div key={compIndex} className="text-xs text-cyan-300/60">
                  {component}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </NeonCard>
  );
};

export function GeneraDocs() {
  const [activeSection, setActiveSection] = useState("overview");

  const navigationItems = [
    { id: "overview", label: "Overview", icon: <Book className="h-4 w-4" /> },
    { id: "quickstart", label: "Quick Start", icon: <Rocket className="h-4 w-4" /> },
    { id: "api", label: "API Reference", icon: <Code className="h-4 w-4" /> },
    { id: "architecture", label: "Architecture", icon: <Network className="h-4 w-4" /> },
    { id: "deployment", label: "Deployment", icon: <Cloud className="h-4 w-4" /> },
    { id: "tutorials", label: "Tutorials", icon: <FileText className="h-4 w-4" /> }
  ];

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Digital Twin Framework",
      description: "Create autonomous AI entities that evolve with user behavior",
      features: ["Federated Learning", "Behavioral Adaptation", "Cognitive Autonomy"],
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Genera Chain",
      description: "Blockchain infrastructure with Proof of Intelligence consensus",
      features: ["Smart Contracts", "Quantum Security", "Cross-chain Interop"],
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Spatial Intelligence",
      description: "AR/VR integration for immersive digital experiences",
      features: ["3D Environments", "Real-time Rendering", "Biofeedback Systems"],
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <NeonCard className="text-center mb-8">
          <FloatingOrbs />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center">
                <Cpu className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Genera Documentation
                </h1>
                <p className="text-cyan-200/70 mt-2">
                  Building the Future of Digital Civilization
                </p>
              </div>
            </div>
            <p className="text-lg text-cyan-100/80 max-w-3xl mx-auto">
              Welcome to the Genera ecosystem documentation. Learn how to build intelligent applications, 
              deploy Digital Twins, and participate in the decentralized intelligence economy.
            </p>
          </div>
        </NeonCard>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <NeonCard>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-400" />
                Documentation
              </h3>
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeSection === item.id 
                        ? "bg-cyan-500/20 text-cyan-400 border-cyan-400/30" 
                        : "text-cyan-200/70 hover:text-cyan-400 hover:bg-cyan-400/10"
                    }`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                ))}
              </nav>
            </NeonCard>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeSection === "overview" && (
              <div className="space-y-6">
                <NeonCard>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    Welcome to Genera
                  </h2>
                  <p className="text-cyan-100/80 mb-6">
                    Genera is a unified digital civilization infrastructure that combines Artificial Intelligence, 
                    Blockchain, and Spatial Computing to create a decentralized ecosystem where intelligence 
                    becomes personalized, owned, and continuously evolving.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-cyan-500/10 rounded-lg border border-cyan-400/20">
                      <Users className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">10M+</div>
                      <div className="text-cyan-200/70 text-sm">Digital Twins</div>
                    </div>
                    <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-400/20">
                      <Network className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">2.5M+</div>
                      <div className="text-purple-200/70 text-sm">AI Nodes</div>
                    </div>
                    <div className="text-center p-4 bg-pink-500/10 rounded-lg border border-pink-400/20">
                      <Zap className="h-8 w-8 text-pink-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">150+</div>
                      <div className="text-pink-200/70 text-sm">Countries</div>
                    </div>
                  </div>
                </NeonCard>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                </div>

                <ArchitectureSection />
              </div>
            )}

            {activeSection === "quickstart" && <QuickStartSection />}
            {activeSection === "api" && <APISection />}
            {activeSection === "architecture" && <ArchitectureSection />}
            
            {activeSection === "deployment" && (
              <NeonCard>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-6">
                  Deployment Guide
                </h2>
                <div className="space-y-4">
                  <CodeBlock code={`# Deploy to Genera Mainnet
genera deploy --network=mainnet --profile=production

# Monitor deployment
genera status --deployment=my-digital-twin

# Scale your Digital Twins
genera scale --instances=5 --memory=4GB`} language="bash" />
                </div>
              </NeonCard>
            )}

            {activeSection === "tutorials" && (
              <NeonCard>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-6">
                  Tutorials & Examples
                </h2>
                <div className="space-y-4">
                  <p className="text-cyan-100/80">
                    Explore our comprehensive tutorials to master Genera development.
                  </p>
                  {/* Add tutorial content here */}
                </div>
              </NeonCard>
            )}
          </div>
        </div>
      </div>

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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Helper function for class names
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}