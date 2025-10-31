'use client';

import * as React from 'react';
import Link from 'next/link';
import { Bot, Menu, House, Zap, ChevronRight, Database, Brain, Blocks, Cpu,  } from 'lucide-react';

import { NavUserWithTeams } from '@/components/sidebar/nav-user-with-teams';
import { KortixLogo } from '@/components/sidebar/kortix-logo';
import { CTACard } from '@/components/sidebar/cta';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
  
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { useDocumentModalStore } from '@/lib/stores/use-document-modal-store';

// Blockchain 3D Background Component
const Blockchain3DBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Blockchain Cubes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 transform animate-float"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${15 + (Math.sin(i) * 30)}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${6 + (i % 4)}s`
          }}
        >
          <div className={cn(
            "w-full h-full border-2 transform rotate-45 transition-all duration-1000 hover:rotate-180 hover:scale-150",
            i % 3 === 0 ? "border-cyan-400 shadow-[0_0_15px_#00FFFF]" :
            i % 3 === 1 ? "border-purple-400 shadow-[0_0_15px_#FF00FF]" :
            "border-green-400 shadow-[0_0_15px_#00FF00]"
          )}></div>
        </div>
      ))}

      {/* Blockchain Chain Links */}
      <div className="absolute top-1/3 right-10 transform -translate-y-1/2">
        <div className="flex space-x-1 animate-pulse">
          <div className="w-2 h-4 bg-cyan-400 shadow-[0_0_8px_#00FFFF] rounded-sm"></div>
          <div className="w-2 h-4 bg-purple-400 shadow-[0_0_8px_#FF00FF] rounded-sm"></div>
          <div className="w-2 h-4 bg-cyan-400 shadow-[0_0_8px_#00FFFF] rounded-sm"></div>
        </div>
      </div>

      {/* Data Flow Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

// Blockchain Info Card Component
const BlockchainInfoCard = () => (
  <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-4 mb-3 group hover:border-cyan-400/40 transition-all duration-300">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg">
        <Blocks className="w-4 h-4 text-white" />
      </div>
      <h3 className="font-semibold text-cyan-300 text-sm">Blockchain Network</h3>
    </div>
    <p className="text-cyan-200/60 text-xs leading-relaxed">
      Powered by decentralized AI agents and secure blockchain infrastructure
    </p>
    <div className="flex items-center gap-2 mt-2">
      <div className="flex space-x-1">
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
      </div>
      <span className="text-green-400 text-xs font-medium">Live</span>
    </div>
  </div>
);

// Data Training Card Component
const DataTrainingCard = () => (
  <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-sm border border-purple-400/20 rounded-xl p-4 group hover:border-purple-400/40 transition-all duration-300">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg">
        <Cpu className="w-4 h-4 text-white" />
      </div>
      <h3 className="font-semibold text-purple-300 text-sm">AI Training Data</h3>
    </div>
    <p className="text-purple-200/60 text-xs leading-relaxed">
      Real-time data processing and model training across decentralized nodes
    </p>
    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center gap-2">
        <Database className="w-3 h-3 text-cyan-400" />
        <span className="text-cyan-400 text-xs">2.4M+ Records</span>
      </div>
      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
    </div>
  </div>
);

function FloatingMobileMenuButton() {
  const { setOpenMobile, openMobile } = useSidebar();
  const isMobile = useIsMobile();

  if (!isMobile || openMobile) return null;

  return (
    <div className="fixed top-6 left-4 z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setOpenMobile(true)}
            size="icon"
            className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 text-white shadow-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation shadow-[0_0_20px_rgba(0,255,255,0.3)]"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-black/90 backdrop-blur-sm border border-cyan-400/20">
          Open Blockchain Menu
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { state, setOpen, setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar: string;
    isAdmin?: boolean;
  }>({
    name: 'Loading...',
    email: 'loading@example.com',
    avatar: '',
    isAdmin: false,
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showNewAgentDialog, setShowNewAgentDialog] = useState(false);
  const { isOpen: isDocumentModalOpen } = useDocumentModalStore();

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, searchParams, isMobile, setOpenMobile]);

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .in('role', ['admin', 'super_admin']);
        const isAdmin = roleData && roleData.length > 0;

        setUser({
          name:
            data.user.user_metadata?.name ||
            data.user.email?.split('@')[0] ||
            'User',
          email: data.user.email || '',
          avatar: data.user.user_metadata?.avatar_url || '',
          isAdmin: isAdmin,
        });
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isDocumentModalOpen) return;

      if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
        event.preventDefault();
        setOpen(!state.startsWith('expanded'));
        window.dispatchEvent(
          new CustomEvent('sidebar-left-toggled', {
            detail: { expanded: !state.startsWith('expanded') },
          }),
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state, setOpen, isDocumentModalOpen]);

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0 bg-gradient-to-b from-black/95 via-purple-900/10 to-cyan-900/10 backdrop-blur-sm [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] relative overflow-hidden"
      {...props}
    >
      {/* Blockchain 3D Background */}
      <Blockchain3DBackground />
      
      <SidebarHeader className="px-2 py-2 relative z-10">
        <div className="flex h-[40px] items-center px-1 relative">
          <Link href="/dashboard" className="flex-shrink-0" onClick={() => isMobile && setOpenMobile(false)}>
            <div className="relative">
              <KortixLogo size={24} />
              <div className="absolute -inset-1 bg-cyan-400/20 rounded-full blur-sm"></div>
            </div>
          </Link>
          {state !== 'collapsed' && (
            <div className="ml-2 transition-all duration-200 ease-in-out whitespace-nowrap">
            </div>
          )}
          <div className="ml-auto flex items-center gap-2">
            {state !== 'collapsed' && !isMobile && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarTrigger className="h-8 w-8 bg-black/40 backdrop-blur-sm border border-cyan-400/20 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all duration-200" />
                </TooltipTrigger>
                <TooltipContent className="bg-black/90 backdrop-blur-sm border border-cyan-400/20">
                  Toggle sidebar (CMD+B)
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] relative z-10">
        <SidebarGroup>
          {/* Blockchain Info Cards */}
          {state !== 'collapsed' && (
            <div className="px-2 mb-4 space-y-2">
              <BlockchainInfoCard />
              <DataTrainingCard />
            </div>
          )}

          
          <Link href="/dashboard">
            <SidebarMenuButton
              className={cn('touch-manipulation mt-1 bg-black/40 backdrop-blur-sm border border-cyan-400/20 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all duration-200', {
                'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 font-medium shadow-[0_0_15px_rgba(0,255,255,0.2)]': pathname === '/dashboard',
              })}
              onClick={() => {
                if (isMobile) setOpenMobile(false);
              }}
            >
              <House className="h-4 w-4 mr-1" />
              <span className="flex items-center justify-between w-full">
                dashboard
              </span>
            </SidebarMenuButton>
          </Link>
          <Link href="/triggers">
            <SidebarMenuButton
              className={cn('touch-manipulation mt-1 bg-black/40 backdrop-blur-sm border border-cyan-400/20 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all duration-200', {
                'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 font-medium shadow-[0_0_15px_rgba(0,255,255,0.2)]': pathname === '/triggers',
              })}
              onClick={() => {
                if (isMobile) setOpenMobile(false);
              }}
            >
              <Brain className="h-4 w-4 mr-1" />
              <span className="flex items-center justify-between w-full">
                Spatial Intelligence
              </span>
            </SidebarMenuButton>
          </Link>
          
          <Link href="/knowledge">
            <SidebarMenuButton
              className={cn('touch-manipulation mt-1 bg-black/40 backdrop-blur-sm border border-cyan-400/20 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all duration-200', {
                'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 font-medium shadow-[0_0_15px_rgba(0,255,255,0.2)]': pathname === '/knowledge',
              })}
              onClick={() => {
                if (isMobile) setOpenMobile(false);
              }}
            >
              <Database className="h-4 w-4 mr-1" />
              <span className="flex items-center justify-between w-full">
                market data

              </span>
            </SidebarMenuButton>
          </Link>
          
          {(
            <SidebarMenu>
              <Collapsible
                defaultOpen={true}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="Agents"
                      className="bg-black/40 backdrop-blur-sm border border-cyan-400/20 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all duration-200"
                      onClick={() => {
                        if (state === 'collapsed') {
                          setOpen(true);
                        }
                      }}
                    >
                      <Bot className="h-4 w-4 mr-1" />
                      <span>Digital Twins</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem data-tour="my-agents">
                        <SidebarMenuSubButton className={cn('pl-3 touch-manipulation bg-black/30 backdrop-blur-sm border border-cyan-400/10 hover:border-cyan-400/30 hover:bg-cyan-500/10 transition-all duration-200', {
                          'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 font-medium shadow-[0_0_10px_rgba(0,255,255,0.2)]': pathname === '/agents' && (searchParams.get('tab') === 'my-agents' || searchParams.get('tab') === null),
                        })} asChild>
                          <Link href="/agents?tab=my-agents" onClick={() => isMobile && setOpenMobile(false)}>
                            <span>My Twins</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                     
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          )}
        </SidebarGroup>
        
      </SidebarContent>
      
      {state !== 'collapsed' && (
        <div className="px-3 py-2 relative z-10">
        </div>
      )}
      
      <SidebarFooter className="relative z-10">
        {state === 'collapsed' && (
          <div className="mt-2 flex justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarTrigger className="h-8 w-8 bg-black/40 backdrop-blur-sm border border-cyan-400/20 hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all duration-200" />
              </TooltipTrigger>
              <TooltipContent className="bg-black/90 backdrop-blur-sm border border-cyan-400/20">
                Expand sidebar (CMD+B)
              </TooltipContent>
            </Tooltip>
          </div>
        )}
        <NavUserWithTeams user={user} />
      </SidebarFooter>
      <SidebarRail />
      
    </Sidebar>
  );
}

// Export the floating button so it can be used in the layout
export { FloatingMobileMenuButton };

// Global styles for animations
const styles = `
  @keyframes float {
    0%, 100% { 
      transform: translateY(0) rotate(0deg) scale(1); 
    }
    33% { 
      transform: translateY(-15px) rotate(120deg) scale(1.05); 
    }
    66% { 
      transform: translateY(-8px) rotate(240deg) scale(0.95); 
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
