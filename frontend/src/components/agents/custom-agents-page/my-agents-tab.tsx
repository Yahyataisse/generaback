'use client';

import React, { useState, useMemo } from 'react';
import { Globe, Sparkles, Brain } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchBar } from './search-bar';
import { EmptyState } from '../empty-state';
import { AgentsGrid } from '../agents-grid';
import { LoadingState } from '../loading-state';
import { Pagination } from '../pagination';
import { UnifiedAgentCard } from '@/components/ui/unified-agent-card';

type AgentFilter = 'all' | 'templates';

interface MyAgentsTabProps {
  agentsSearchQuery: string;
  setAgentsSearchQuery: (value: string) => void;
  agentsLoading: boolean;
  agents: any[];
  agentsPagination: any;
  viewMode: 'grid' | 'list';
  onCreateAgent: () => void;
  onEditAgent: (agentId: string) => void;
  onDeleteAgent: (agentId: string) => void;
  onToggleDefault: (agentId: string, currentDefault: boolean) => void;
  onClearFilters: () => void;
  deleteAgentMutation?: any;
  isDeletingAgent?: (agentId: string) => boolean;
  setAgentsPage: (page: number) => void;
  agentsPageSize: number;
  onAgentsPageSizeChange: (pageSize: number) => void;

  myTemplates: any[];
  templatesLoading: boolean;
  templatesError: any;
  templatesActioningId: string | null;
  templatesPagination?: {
    current_page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
  };
  templatesPage: number;
  setTemplatesPage: (page: number) => void;
  templatesPageSize: number;
  onTemplatesPageSizeChange: (pageSize: number) => void;
  templatesSearchQuery: string;
  setTemplatesSearchQuery: (value: string) => void;
  onPublish: (template: any) => void;
  onUnpublish: (templateId: string, templateName: string) => void;
  getTemplateStyling: (template: any) => { color: string };

  onPublishAgent?: (agent: any) => void;
  publishingAgentId?: string | null;
}

// Mock data for simulation - معدلة لتتناسب مع AgentsGrid
const mockDigitalTwins = [
  {
    agent_id: 'dt_001',
    name: 'Cognitive Analyzer',
    description: 'Advanced pattern recognition and predictive analytics',
    status: 'active',
    is_default: false,
    is_public: false,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    icon_name: 'brain',
    icon_color: '#00FFFF',
    icon_background: 'linear-gradient(135deg, #00FFFF, #0077FF)',
    tags: ['AI', 'Analytics', 'Cognitive'],
    capabilities: ['Data Analysis', 'Pattern Recognition', 'Predictive Modeling'],
    metadata: {
      is_suna_default: false,
      centrally_managed: false,
      restrictions: {
        system_prompt_editable: true,
        tools_editable: true,
        name_editable: true,
        mcps_editable: true
      }
    }
  },
  {
    agent_id: 'dt_002',
    name: 'Network Orchestrator',
    description: 'Manages distributed systems and network intelligence',
    status: 'active',
    is_default: true,
    is_public: true,
    created_at: '2024-01-10T14:20:00Z',
    updated_at: '2024-01-10T14:20:00Z',
    icon_name: 'network',
    icon_color: '#FF00FF',
    icon_background: 'linear-gradient(135deg, #FF00FF, #AA00FF)',
    tags: ['Network', 'IoT', 'Infrastructure'],
    capabilities: ['Network Management', 'Load Balancing', 'Security'],
    marketplace_published_at: '2024-01-12T00:00:00Z',
    download_count: 892,
    metadata: {
      is_suna_default: false,
      centrally_managed: false,
      restrictions: {
        system_prompt_editable: true,
        tools_editable: true,
        name_editable: true,
        mcps_editable: true
      }
    }
  },
  {
    agent_id: 'dt_003',
    name: 'Quantum Processor',
    description: 'High-performance computing for complex simulations',
    status: 'training',
    is_default: false,
    is_public: false,
    created_at: '2024-01-20T09:15:00Z',
    updated_at: '2024-01-20T09:15:00Z',
    icon_name: 'cpu',
    icon_color: '#00FF00',
    icon_background: 'linear-gradient(135deg, #00FF00, #00AAFF)',
    tags: ['Quantum', 'Compute', 'Simulation'],
    capabilities: ['Quantum Computing', 'Simulation', 'Optimization'],
    metadata: {
      is_suna_default: false,
      centrally_managed: false,
      restrictions: {
        system_prompt_editable: true,
        tools_editable: true,
        name_editable: true,
        mcps_editable: true
      }
    }
  }
];

const mockTemplates = [
  {
    template_id: 'tpl_001',
    name: 'Cognitive Analyzer Pro',
    description: 'Enterprise-grade cognitive analysis template',
    tags: ['AI', 'Analytics', 'Enterprise'],
    created_at: '2024-01-15T10:30:00Z',
    is_public: true,
    download_count: 1247,
    icon_name: 'brain',
    icon_color: '#00FFFF',
    icon_background: 'linear-gradient(135deg, #00FFFF, #0077FF)'
  },
  {
    template_id: 'tpl_002',
    name: 'Network Orchestrator Lite',
    description: 'Lightweight network management template',
    tags: ['Network', 'IoT', 'Management'],
    created_at: '2024-01-10T14:20:00Z',
    is_public: false,
    download_count: 892,
    icon_name: 'network',
    icon_color: '#FF00FF',
    icon_background: 'linear-gradient(135deg, #FF00FF, #AA00FF)'
  }
];
const filterOptions = [
  { value: 'all', label: 'All Digital Twins' },
  { value: 'templates', label: 'Templates' },
];

// Neon Background Component
const NeonBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Neural Nodes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute transform animate-float"
          style={{
            left: `${15 + (i * 15)}%`,
            top: `${20 + (Math.sin(i) * 25)}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${6 + (i % 3)}s`
          }}
        >
          <div className={cn(
            "w-4 h-4 rounded-full border-2",
            i % 3 === 0 ? "border-cyan-400 shadow-[0_0_10px_#00FFFF]" :
            i % 3 === 1 ? "border-purple-400 shadow-[0_0_10px_#FF00FF]" :
            "border-green-400 shadow-[0_0_10px_#00FF00]"
          )} />
        </div>
      ))}
    </div>
  );
};

export const MyAgentsTab = ({
  agentsSearchQuery,
  setAgentsSearchQuery,
  agentsLoading,
  agents,
  agentsPagination,
  viewMode,
  onCreateAgent,
  onEditAgent,
  onDeleteAgent,
  onToggleDefault,
  onClearFilters,
  deleteAgentMutation,
  isDeletingAgent,
  setAgentsPage,
  agentsPageSize,
  onAgentsPageSizeChange,
  myTemplates,
  templatesLoading,
  templatesError,
  templatesActioningId,
  templatesPagination,
  templatesPage,
  setTemplatesPage,
  templatesPageSize,
  onTemplatesPageSizeChange,
  templatesSearchQuery,
  setTemplatesSearchQuery,
  onPublish,
  onUnpublish,
  getTemplateStyling,
  onPublishAgent,
  publishingAgentId
}: MyAgentsTabProps) => {
  const [agentFilter, setAgentFilter] = useState<AgentFilter>('all');
  const [simulatedAgents] = useState(mockDigitalTwins);
  const [simulatedTemplates] = useState(mockTemplates);

  const templateAgentsCount = useMemo(() => {
    return simulatedTemplates?.length || 0;
  }, [simulatedTemplates]);

  const handleClearFilters = () => {
    setAgentFilter('all');
    onClearFilters();
  };

  // Simulate actions
  const handleSimulatedPublish = (template: any) => {
    console.log('Publishing template:', template.name);
    // Simulate API call
    setTimeout(() => {
      alert(`Template "${template.name}" published successfully!`);
    }, 1000);
  };

  const handleSimulatedUnpublish = (templateId: string, templateName: string) => {
    console.log('Unpublishing template:', templateName);
    // Simulate API call
    setTimeout(() => {
      alert(`Template "${templateName}" unpublished successfully!`);
    }, 1000);
  };

  const handleSimulatedEdit = (agentId: string) => {
    console.log('Editing agent:', agentId);
    // Simulate edit action
    setTimeout(() => {
      alert(`Editing Digital Twin: ${agentId}`);
    }, 500);
  };

  const handleSimulatedDelete = (agentId: string) => {
    console.log('Deleting agent:', agentId);
    // Simulate delete action
    setTimeout(() => {
      alert(`Digital Twin ${agentId} deleted successfully!`);
    }, 1000);
  };

  const handleSimulatedToggleDefault = (agentId: string, currentDefault: boolean) => {
    console.log('Toggling default for:', agentId, 'Current:', currentDefault);
    // Simulate toggle action
    setTimeout(() => {
      alert(`Default status updated for ${agentId}`);
    }, 500);
  };

  const renderTemplates = () => {
    return (
      <>
        {templatesLoading ? (
          <LoadingState viewMode={viewMode} />
        ) : templatesError ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/30">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <p className="text-red-400 font-semibold">Failed to load templates</p>
            <p className="text-red-300/70 text-sm mt-2">Please try again later</p>
          </div>
        ) : !simulatedTemplates || simulatedTemplates.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mb-6 border border-cyan-400/30">
              <Globe className="h-10 w-10 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-cyan-100">No published templates yet</h3>
            <p className="text-cyan-200/70 mb-8 max-w-md mx-auto">
              Publish your digital twins to the marketplace to share them with the community and track their usage across the network.
            </p>
            <button 
              onClick={() => handleSimulatedPublish({ name: 'Sample Template' })}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              Publish First Template
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {simulatedTemplates.map((template) => {
                const isActioning = templatesActioningId === template.template_id;
                return (
                  <div key={template.template_id} className="relative">
                    <UnifiedAgentCard
                      variant="template"
                      data={{
                        id: template.template_id,
                        name: template.name,
                        tags: template.tags,
                        created_at: template.created_at,
                        template_id: template.template_id,
                        is_public: template.is_public,
                        download_count: template.download_count,
                        icon_name: template.icon_name,
                        icon_color: template.icon_color,
                        icon_background: template.icon_background,
                      }}
                      state={{
                        isActioning: isActioning,
                      }}
                      actions={{
                        onPrimaryAction: template.is_public 
                          ? () => handleSimulatedUnpublish(template.template_id, template.name)
                          : () => handleSimulatedPublish(template),
                        onSecondaryAction: template.is_public ? () => {} : undefined,
                      }}
                    />
                    {/* Neon Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                );
              })}
            </div>
            {templatesPagination && (
              <Pagination
                currentPage={templatesPagination.current_page}
                totalPages={templatesPagination.total_pages}
                totalItems={templatesPagination.total_items}
                pageSize={templatesPageSize}
                onPageChange={setTemplatesPage}
                onPageSizeChange={onTemplatesPageSizeChange}
                isLoading={templatesLoading}
                showPageSizeSelector={true}
                showJumpToPage={true}
                showResultsInfo={true}
              />
            )}
          </>
        )}
      </>
    );
  };

  return (
    <div className="space-y-6 mt-8 flex flex-col min-h-full relative">
      {/* Neon Background */}
      <NeonBackground />
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <SearchBar
            placeholder="Search digital twins..."
            value={agentsSearchQuery}
            onChange={setAgentsSearchQuery}
          />
          <div className="flex items-center gap-3">
            <Select value={agentFilter} onValueChange={(value: AgentFilter) => setAgentFilter(value)}>
              <SelectTrigger className="w-[200px] h-12 rounded-xl border-cyan-400/30 bg-gray-800/50 text-cyan-100">
                <SelectValue placeholder="Filter digital twins" />
              </SelectTrigger>
              <SelectContent className='rounded-xl border border-cyan-400/20 bg-gray-900'>
                {filterOptions.map((filter) => (
                  <SelectItem key={filter.value} className='rounded-lg text-cyan-100 hover:bg-cyan-500/20' value={filter.value}>
                    <div className="flex items-center gap-2">
                      {filter.value === 'all' ? <Brain className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                      {filter.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex-1">
          {agentFilter === 'templates' ? (
            renderTemplates()
          ) : (
            <>
              {agentsLoading ? (
                <LoadingState viewMode={viewMode} />
              ) : simulatedAgents.length === 0 ? (
                <EmptyState
                  hasAgents={(agentsPagination?.total_items || 0) > 0}
                  onCreateAgent={onCreateAgent}
                  onClearFilters={handleClearFilters}
                />
              ) : (
                <AgentsGrid
                  agents={simulatedAgents}
                  onEditAgent={handleSimulatedEdit}
                  onDeleteAgent={handleSimulatedDelete}
                  onToggleDefault={handleSimulatedToggleDefault}
                  deleteAgentMutation={deleteAgentMutation}
                  isDeletingAgent={isDeletingAgent}
                  onPublish={onPublishAgent}
                  publishingId={publishingAgentId}
                />
              )}
              
              {agentsPagination && (
                <Pagination
                  currentPage={agentsPagination.current_page}
                  totalPages={agentsPagination.total_pages}
                  totalItems={agentsPagination.total_items}
                  pageSize={agentsPageSize}
                  onPageChange={setAgentsPage}
                  onPageSizeChange={onAgentsPageSizeChange}
                  isLoading={agentsLoading}
                  showPageSizeSelector={true}
                  showJumpToPage={true}
                  showResultsInfo={true}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

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
      transform: translateY(-8px) rotate(120deg) scale(1.05); 
    }
    66% { 
      transform: translateY(-4px) rotate(240deg) scale(0.95); 
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