'use client';

import React, { useState } from 'react';
import { Bot, Globe } from 'lucide-react';
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

interface AgentCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (agentId: string) => void;
}

export function AgentCreationModal({ open, onOpenChange, onSuccess }: AgentCreationModalProps) {
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
        toast.success('Agent created successfully');
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

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
    setSelectedTemplate(null);
  };

  const handlePreviewInstall = () => {
    // Handle template installation logic here
    setIsPreviewOpen(false);
    setSelectedTemplate(null);
    toast.success('Template installed successfully');
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Create New Agent
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Templates Section */}
            <div>
              <h3 className="text-lg font-medium mb-4">Start with a Template</h3>
              {isLoading ? (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-muted/30 rounded-2xl p-4 h-20 flex items-center">
                      <Skeleton className="w-12 h-12 rounded-xl" />
                      <Skeleton className="h-4 flex-1 ml-3" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {displayTemplates.map((template) => (
                    <UnifiedAgentCard
                      key={template.template_id}
                      variant="compact"
                      data={convertTemplateToAgentData(template)}
                      actions={{
                        onClick: () => handleCardClick(template)
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-start gap-3 pt-4 border-t">
              <Button
                variant="default"
                onClick={handleCreateFromScratch}
                disabled={createNewAgentMutation.isPending}
                className="gap-2"
              >
                <Bot className="h-4 w-4" />
                {createNewAgentMutation.isPending ? 'Creating...' : 'Create from Scratch'}
              </Button>
              <Button
                variant="outline"
                onClick={handleExploreTemplates}
                className="gap-2"
              >
                <Globe className="h-4 w-4" />
                Browse All Templates
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Template Preview Dialog */}
      <MarketplaceAgentPreviewDialog
        agent={selectedTemplate}
        isOpen={isPreviewOpen}
        onClose={handlePreviewClose}
        onInstall={handlePreviewInstall}
        isInstalling={false}
      />

      {/* Agent Limit Dialog */}
      <AgentCountLimitDialog
        open={showAgentLimitDialog}
        onOpenChange={setShowAgentLimitDialog}
        currentCount={agentLimitError?.current_count || 0}
        limit={agentLimitError?.limit || 0}
        tierName={agentLimitError?.tier_name || ''}
      />
    </>
  );
}