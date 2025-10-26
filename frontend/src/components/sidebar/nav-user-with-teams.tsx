'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BadgeCheck,
  Bell,
  ChevronDown,
  ChevronsUpDown,
  ChevronRight,
  Command,
  CreditCard,
  Key,
  LogOut,
  Plus,
  Settings,
  User,
  AudioWaveform,
  Sun,
  Moon,
  KeyRound,
  Plug,
  Binary,
  Shield,
  DollarSign,
  Users,
  BarChart3,
  FileText,
  Sparkles,
  Palette,
  Rocket,
  Cpu,
  Terminal,
} from 'lucide-react';
import { useAccounts } from '@/hooks/use-accounts';
import NewTeamForm from '@/components/basejump/new-team-form';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createClient } from '@/lib/supabase/client';
import { useTheme } from 'next-themes';
import { isLocalMode } from '@/lib/config';
import { clearUserLocalStorage } from '@/lib/utils/clear-local-storage';
import { BillingModal } from '@/components/billing/billing-modal';

export function NavUserWithTeams({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
    isAdmin?: boolean;
  };
}) {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { data: accounts } = useAccounts();
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [showBillingModal, setShowBillingModal] = React.useState(false);
  const { theme, setTheme } = useTheme();

  // Prepare personal account and team accounts
  const personalAccount = React.useMemo(
    () => accounts?.find((account) => account.personal_account),
    [accounts],
  );
  const teamAccounts = React.useMemo(
    () => accounts?.filter((account) => !account.personal_account),
    [accounts],
  );

  // Create a default list of teams with logos for the UI (will show until real data loads)
  const defaultTeams = [
    {
      name: personalAccount?.name || 'Personal Account',
      logo: Command,
      plan: 'Personal',
      account_id: personalAccount?.account_id,
      slug: personalAccount?.slug,
      personal_account: true,
    },
    ...(teamAccounts?.map((team) => ({
      name: team.name,
      logo: AudioWaveform,
      plan: 'Team',
      account_id: team.account_id,
      slug: team.slug,
      personal_account: false,
    })) || []),
  ];

  // Use the first team or first entry in defaultTeams as activeTeam
  const [activeTeam, setActiveTeam] = React.useState(defaultTeams[0]);

  // Update active team when accounts load
  React.useEffect(() => {
    if (accounts?.length) {
      const currentTeam = accounts.find(
        (account) => account.account_id === activeTeam.account_id,
      );
      if (currentTeam) {
        setActiveTeam({
          name: currentTeam.name,
          logo: currentTeam.personal_account ? Command : AudioWaveform,
          plan: currentTeam.personal_account ? 'Personal' : 'Team',
          account_id: currentTeam.account_id,
          slug: currentTeam.slug,
          personal_account: currentTeam.personal_account,
        });
      } else {
        // If current team not found, set first available account as active
        const firstAccount = accounts[0];
        setActiveTeam({
          name: firstAccount.name,
          logo: firstAccount.personal_account ? Command : AudioWaveform,
          plan: firstAccount.personal_account ? 'Personal' : 'Team',
          account_id: firstAccount.account_id,
          slug: firstAccount.slug,
          personal_account: firstAccount.personal_account,
        });
      }
    }
  }, [accounts, activeTeam.account_id]);

  // Handle team selection
  const handleTeamSelect = (team) => {
    setActiveTeam(team);

    // Navigate to the appropriate dashboard
    if (team.personal_account) {
      router.push('/dashboard');
    } else {
      router.push(`/${team.slug}`);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    // Clear local storage after sign out
    clearUserLocalStorage();
    router.push('/auth');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (!activeTeam) {
    return null;
  }

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-gradient-to-r data-[state=open]:from-cyan-500/10 data-[state=open]:to-purple-500/10 data-[state=open]:border data-[state=open]:border-cyan-400/20 data-[state=open]:text-cyan-50 relative overflow-hidden group"
              >
                {/* Neon glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
                
                <Avatar className="h-8 w-8 rounded-lg border border-cyan-400/30 shadow-lg shadow-cyan-500/20 z-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight z-10">
                  <span className="truncate font-semibold bg-gradient-to-r from-cyan-50 to-purple-50 bg-clip-text text-transparent">
                    {user.name}
                  </span>
                  <span className="truncate text-xs text-cyan-100/70">
                    {user.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 text-cyan-200 z-10" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-64 bg-gray-900/95 backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 rounded-xl overflow-hidden"
              side={isMobile ? 'bottom' : 'top'}
              align="start"
              sideOffset={4}
            >
              {/* Header with user info */}
              <DropdownMenuLabel className="p-0 font-normal bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border-b border-cyan-500/20">
                <div className="flex items-center gap-3 px-3 py-3 text-left text-sm">
                  <Avatar className="h-10 w-10 rounded-xl border border-cyan-400/40 shadow-lg shadow-cyan-500/30">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 text-white font-semibold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-cyan-50">
                      {user.name}
                    </span>
                    <span className="truncate text-xs text-cyan-200/60">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-green-400 shadow-lg shadow-cyan-400/50" />
                </div>
              </DropdownMenuLabel>

              {/* Teams Section */}
              {personalAccount && (
                <>
                  <DropdownMenuLabel className="text-cyan-300/80 text-xs font-semibold px-3 pt-3 pb-2 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-cyan-400" />
                    Personal Account
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    key={personalAccount.account_id}
                    onClick={() =>
                      handleTeamSelect({
                        name: personalAccount.name,
                        logo: Command,
                        plan: 'Personal',
                        account_id: personalAccount.account_id,
                        slug: personalAccount.slug,
                        personal_account: true,
                      })
                    }
                    className="gap-3 p-2 mx-2 mb-1 rounded-lg bg-cyan-500/5 border border-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all duration-200 group"
                  >
                    <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
                      <Command className="size-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-cyan-50">{personalAccount.name}</div>
                      <div className="text-xs text-cyan-300/60">Personal Plan</div>
                    </div>
                    <DropdownMenuShortcut className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded px-2">
                      ⌘1
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </>
              )}

              {teamAccounts?.length > 0 && (
                <>
                  <DropdownMenuLabel className="text-cyan-300/80 text-xs font-semibold px-3 pt-3 pb-2 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-purple-400" />
                    Team Workspaces
                  </DropdownMenuLabel>
                  {teamAccounts.map((team, index) => (
                    <DropdownMenuItem
                      key={team.account_id}
                      onClick={() =>
                        handleTeamSelect({
                          name: team.name,
                          logo: AudioWaveform,
                          plan: 'Team',
                          account_id: team.account_id,
                          slug: team.slug,
                          personal_account: false,
                        })
                      }
                      className="gap-3 p-2 mx-2 mb-1 rounded-lg bg-purple-500/5 border border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all duration-200 group"
                    >
                      <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 border border-purple-400/30 shadow-lg shadow-purple-500/20">
                        <AudioWaveform className="size-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-purple-50">{team.name}</div>
                        <div className="text-xs text-purple-300/60">Team Plan</div>
                      </div>
                      <DropdownMenuShortcut className="bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded px-2">
                        ⌘{index + 2}
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                </>
              )}

              <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent h-px my-1" />

              {/* Quick Actions */}
              

              <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-purple-500/30 to-transparent h-px my-1" />

              {/* API Keys Section */}
              <DropdownMenuGroup className="p-2">
                <DropdownMenuLabel className="text-cyan-300/80 text-xs font-semibold px-1 pt-2 pb-1 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-orange-400" />
                  Developer Tools
                </DropdownMenuLabel>
                
                {/* API Keys Menu Item */}
                <DropdownMenuItem asChild className="gap-3 p-2 rounded-lg hover:bg-orange-500/10 hover:border hover:border-orange-500/20 transition-all duration-200 group">
                  <Link href="/settings/api-keys">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 border border-orange-400/30 shadow-lg shadow-orange-500/20">
                      <Key className="size-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-orange-50">API Keys</div>
                      <div className="text-xs text-orange-300/60">Manage access tokens</div>
                    </div>
                    <Terminal className="size-3 text-orange-400 ml-auto" />
                  </Link>
                </DropdownMenuItem>

                {/* Additional Developer Tools */}
                <DropdownMenuItem asChild className="gap-3 p-2 rounded-lg hover:bg-blue-500/10 hover:border hover:border-blue-500/20 transition-all duration-200">
                  <Link href="/settings/credentials">
                    <Binary className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-100">Genera Ecosystem</span>
                  </Link>
                </DropdownMenuItem>

                
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-blue-500/30 to-transparent h-px my-1" />

              {/* User Settings Section */}
              <DropdownMenuGroup className="p-2">
                {user.isAdmin && (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="gap-3 p-2 rounded-lg hover:bg-cyan-500/10 hover:border hover:border-cyan-500/20 transition-all duration-200">
                      <Shield className="h-4 w-4 text-cyan-400" />
                      <span className="text-cyan-100 font-medium">Admin</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="bg-gray-900/95 backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 rounded-xl">
                        <DropdownMenuItem asChild className="gap-3 p-2 hover:bg-cyan-500/10 rounded-lg">
                          <Link href="/admin/billing">
                            <DollarSign className="h-4 w-4 text-cyan-400" />
                            <span className="text-cyan-100">Billing Management</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                )}
                
                <DropdownMenuItem 
                  onClick={() => setShowBillingModal(true)}
                  className="gap-3 p-2 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10 hover:border hover:border-cyan-500/20 transition-all duration-200 group"
                >
                  <Rocket className="h-4 w-4 text-green-400" />
                  <span className="text-green-100 font-medium">Upgrade Plan</span>
                  <Sparkles className="ml-auto size-3 text-yellow-400" />
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild className="gap-3 p-2 rounded-lg hover:bg-blue-500/10 hover:border hover:border-blue-500/20 transition-all duration-200">
                  <Link href="/settings/transactions">
                    <CreditCard className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-100">Billing & Plans</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="gap-3 p-2 rounded-lg hover:bg-yellow-500/10 hover:border hover:border-yellow-500/20 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Palette className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-100">Theme</span>
                    <div className="ml-auto flex items-center gap-1">
                      <Sun className="h-3 w-3 text-yellow-400 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="h-3 w-3 text-blue-400 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-red-500/30 to-transparent h-px my-1" />
              
              <DropdownMenuItem 
                className="gap-3 p-2 mx-2 my-1 rounded-lg bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 hover:border-red-500/30 text-red-100 hover:text-red-50 transition-all duration-200 group"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 text-red-400" />
                <span className="font-medium">Sign Out</span>
                <div className="ml-auto w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <DialogContent className="sm:max-w-[425px] border border-cyan-500/30 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-cyan-500/20">
        <DialogHeader>
          <DialogTitle className="text-cyan-50 text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Create New Team
          </DialogTitle>
          <DialogDescription className="text-cyan-200/70">
            Create a team workspace to collaborate with others in real-time.
          </DialogDescription>
        </DialogHeader>
        <NewTeamForm />
      </DialogContent>

      {/* Billing Modal */}
      <BillingModal
        open={showBillingModal}
        onOpenChange={setShowBillingModal}
        returnUrl={typeof window !== 'undefined' ? window?.location?.href || '/' : '/'}
      />
    </Dialog>
  );
}