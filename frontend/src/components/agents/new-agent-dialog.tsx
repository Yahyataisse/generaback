'use client';

import React, { useState } from 'react';
import { Bot, FileEdit, Globe, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCreateNewAgent } from '@/hooks/react-query/agents/use-agents';
import { useKortixTeamTemplates } from '@/hooks/react-query/secure-mcp/use-secure-mcp';
import { AgentCountLimitError } from '@/lib/api';
import { toast } from 'sonner';
import { AgentCountLimitDialog } from './agent-count-limit-dialog';
import { UnifiedAgentCard } from '@/components/ui/unified-agent-card';
import type { BaseAgentData } from '@/components/ui/unified-agent-card';
import type { MarketplaceTemplate } from './installation/types';
import { MarketplaceAgentPreviewDialog } from './marketplace-agent-preview-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (agentId: string) => void;
}

// 3D Neon Background Component
const Neon3DBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Digital Elements */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute transform animate-float"
          style={{
            left: `${15 + (i * 15)}%`,
            top: `${30 + (Math.sin(i) * 20)}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${7 + (i % 3)}s`
          }}
        >
          <div className={cn(
            "w-6 h-6 border-2 transform rotate-45 transition-all duration-1000",
            i % 3 === 0 ? "border-cyan-400 shadow-[0_0_20px_#00FFFF]" :
            i % 3 === 1 ? "border-purple-400 shadow-[0_0_20px_#FF00FF]" :
            "border-green-400 shadow-[0_0_20px_#00FF00]"
          )}>
            <div className="absolute inset-1 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-sm opacity-60"></div>
          </div>
        </div>
      ))}

      {/* Data Stream Lines */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-transparent opacity-40 animate-pulse"
          style={{
            top: `${40 + i * 15}%`,
            left: '0%',
            width: '100%',
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}

      {/* Neural Network Dots */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            backgroundColor: `hsl(${200 + Math.random() * 160}, 100%, 65%)`
          }}
        />
      ))}
    </div>
  );
};

export function NewAgentDialog({ open, onOpenChange, onSuccess }: NewAgentDialogProps) {
  const router = useRouter();
  const [showAgentLimitDialog, setShowAgentLimitDialog] = useState(false);
  const [agentLimitError, setAgentLimitError] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<MarketplaceTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const createNewAgentMutation = useCreateNewAgent();
  const { data: templates, isLoading } = useKortixTeamTemplates();

  const displayTemplates = templates?.templates?.slice(0, 6) || [];

  const handleCreateFromScratch = () => {
    createNewAgentMutation.mutate(undefined, {
      onSuccess: (newAgent) => {
        onOpenChange(false);
        onSuccess?.(newAgent.agent_id);
      },
      onError: (error) => {
        if (error instanceof AgentCountLimitError) {
          setAgentLimitError(error.detail);
          setShowAgentLimitDialog(true);
          onOpenChange(false);
        } else {
          toast.error(error instanceof Error ? error.message : 'Failed to create agent');
        }
      }
    });
  };

  const handleExploreTemplates = () => {
    onOpenChange(false);
    router.push('/dashboard?tab=worker-templates');
  };

  const handleCardClick = (template: any) => {
    const marketplaceTemplate: MarketplaceTemplate = {
      id: template.template_id,
      template_id: template.template_id,
      creator_id: template.creator_id,
      name: template.name,
      description: template.description,
      system_prompt: template.system_prompt,
      tags: template.tags || [],
      download_count: template.download_count || 0,
      is_kortix_team: template.is_kortix_team || false,
      creator_name: template.creator_name,
      created_at: template.created_at,
      icon_name: template.icon_name,
      icon_color: template.icon_color,
      icon_background: template.icon_background,
      mcp_requirements: template.mcp_requirements || [],
      agentpress_tools: template.agentpress_tools || {},
      model: template.metadata?.model,
      marketplace_published_at: template.marketplace_published_at,
      usage_examples: template.usage_examples,
      config: template.config,
    };

    setSelectedTemplate(marketplaceTemplate);
    onOpenChange(false);
    setIsPreviewOpen(true);
  };

  const convertTemplateToAgentData = (template: any): BaseAgentData => ({
    id: template.template_id,
    name: template.name,
    description: template.description,
    tags: template.tags || [],
    created_at: template.created_at,
    icon_name: template.icon_name,
    icon_color: template.icon_color,
    icon_background: template.icon_background,
    creator_id: template.creator_id,
    creator_name: template.creator_name,
    is_kortix_team: template.is_kortix_team || false,
    download_count: template.download_count || 0,
    marketplace_published_at: template.marketplace_published_at,
    mcp_requirements: template.mcp_requirements || [],
    agentpress_tools: template.agentpress_tools || {},
  });

  const handlePreviewInstall = () => {
    onOpenChange(false);
  };

  // Custom Card with Neon Design
  const NeonAgentCard = ({ template }: { template: any }) => {
    const agentData = convertTemplateToAgentData(template);
    
    return (
      <div
        className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl p-4 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
        onClick={() => handleCardClick(template)}
      >
        {/* Neon Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-all duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-start gap-3">
            {/* Animated Icon */}
            <div className="relative">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                style={{
                  background: agentData.icon_background || 'linear-gradient(135deg, #00FFFF, #FF00FF)',
                  boxShadow: `0 0 20px ${agentData.icon_color || '#00FFFF'}`
                }}
              >
                <Bot className="w-6 h-6 text-white" />
              </div>
              
              {/* Pulsing Halo */}
              <div 
                className="absolute inset-0 rounded-xl animate-ping opacity-20"
                style={{
                  background: agentData.icon_color || '#00FFFF',
                }}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-cyan-100 truncate">
                  {agentData.name}
                </h3>
                {agentData.is_kortix_team && (
                  <Sparkles className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                )}
              </div>
              
              <p className="text-sm text-cyan-200/70 line-clamp-2 mb-2">
                {agentData.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {agentData.tags.slice(0, 2).map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-1 text-xs text-cyan-300/60">
                  <Bot className="w-3 h-3" />
                  <span>{agentData.download_count}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black border border-cyan-400/20">
          {/* 3D Neon Background */}
          <Neon3DBackground />
          
          <div className="relative z-10">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-center">
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  Create AI Agent
                </span>
              </DialogTitle>
              <p className="text-center text-cyan-200/70 mt-2">
                Choose a template or build your agent from scratch
              </p>
            </DialogHeader>
            
            <div className="space-y-6 py-6">
              {isLoading ? (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-gradient-to-br from-gray-800/50 to-black/50 rounded-2xl p-4 border border-cyan-400/10">
                      <div className="flex items-start gap-3">
                        <Skeleton className="w-12 h-12 rounded-xl bg-cyan-400/20" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4 bg-cyan-400/20" />
                          <Skeleton className="h-3 w-full bg-cyan-400/20" />
                          <Skeleton className="h-3 w-2/3 bg-cyan-400/20" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {displayTemplates.map((template) => (
                    <NeonAgentCard key={template.template_id} template={template} />
                  ))}
                </div>
              )}

              <div className="flex items-center justify-center gap-4 pt-6 border-t border-cyan-400/20">
                <Button
                  variant="default"
                  onClick={handleCreateFromScratch}
                  disabled={createNewAgentMutation.isPending}
                  className="gap-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border-0 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
                >
                  {createNewAgentMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Agent...
                    </>
                  ) : (
                    <>
                      <Bot className="h-5 w-5" />
                      Create from Scratch
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleExploreTemplates}
                  className="gap-3 border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200 font-semibold px-8 py-3 rounded-xl transition-all duration-300"
                >
                  <Globe className="h-5 w-5" />
                  Explore Templates
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <MarketplaceAgentPreviewDialog
        agent={selectedTemplate}
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setSelectedTemplate(null);
        }}
        onInstall={handlePreviewInstall}
        isInstalling={false}
      />

      {showAgentLimitDialog && agentLimitError && (
        <AgentCountLimitDialog
          open={showAgentLimitDialog}
          onOpenChange={setShowAgentLimitDialog}
          currentCount={agentLimitError.current_count}
          limit={agentLimitError.limit}
          tierName={agentLimitError.tier_name}
        />
      )}
    </>
  );
}

// Utility function for class names
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Global styles for animations
const styles = `
  @keyframes float {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg) scale(1); 
    }
    33% { 
      transform: translateY(-10px) rotate(120deg) scale(1.1); 
    }
    66% { 
      transform: translateY(-5px) rotate(240deg) scale(0.9); 
    }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}