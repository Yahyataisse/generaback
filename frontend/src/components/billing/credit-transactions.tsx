'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Infinity,
  Plus,
  Minus,
  RefreshCw,
  Info,
  Sparkles,
  Zap,
  Brain,
  Cpu,
  Network,
} from 'lucide-react';
import { useTransactions, useTransactionsSummary } from '@/hooks/react-query/billing/use-transactions';
import { cn } from '@/lib/utils';

interface Props {
  accountId?: string;
}

// 3D Neon Background Component
const Neon3DBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Credit Cubes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute transform animate-float"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${15 + (Math.sin(i) * 30)}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${7 + (i % 4)}s`
          }}
        >
          <div className={cn(
            "w-6 h-6 border-2 transform rotate-45 shadow-lg backdrop-blur-sm",
            i % 4 === 0 ? "border-cyan-400 shadow-[0_0_15px_#00FFFF] bg-cyan-400/10" :
            i % 4 === 1 ? "border-purple-400 shadow-[0_0_15px_#FF00FF] bg-purple-400/10" :
            i % 4 === 2 ? "border-green-400 shadow-[0_0_15px_#00FF00] bg-green-400/10" :
            "border-blue-400 shadow-[0_0_15px_#0088FF] bg-blue-400/10"
          )}>
            <div className="absolute inset-1 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-sm opacity-60"></div>
          </div>
        </div>
      ))}

      {/* Data Stream Lines */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-0.5 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-cyan-400/20 opacity-40 animate-pulse"
          style={{
            top: `${35 + i * 15}%`,
            left: '0%',
            width: '100%',
            animationDelay: `${i * 0.4}s`
          }}
        />
      ))}

      {/* Neural Network Dots */}
      {Array.from({ length: 15 }).map((_, i) => (
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

// 3D Card Component
const Neon3DCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn(
    "relative group",
    className
  )}>
    {/* 3D Shadow Effect */}
    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <Card className={cn(
      "relative bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-sm border border-cyan-400/20 rounded-2xl shadow-2xl shadow-cyan-500/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-cyan-500/20",
      "transform-gpu" // Enable GPU acceleration for 3D effects
    )}>
      {children}
    </Card>
  </div>
);

// Enhanced Badge with Neon Effect
const NeonBadge = ({ children, variant, className }: { children: React.ReactNode; variant: any; className?: string }) => (
  <div className="relative">
    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <Badge 
      variant={variant} 
      className={cn(
        "relative backdrop-blur-sm border transition-all duration-300 group-hover:scale-105",
        className
      )}
    >
      {children}
    </Badge>
  </div>
);

export default function CreditTransactions({ accountId }: Props) {
  const [offset, setOffset] = useState(0);
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const limit = 50;

  const { data, isLoading, error, refetch } = useTransactions(limit, offset, typeFilter);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAmount = (amount: number) => {
    const absAmount = Math.abs(amount);
    const formatted = `$${absAmount.toFixed(2)}`;
    return amount >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  const formatBalance = (balance: number) => {
    return `$${balance.toFixed(2)}`;
  };

  const getTransactionIcon = (type: string, amount: number) => {
    if (amount > 0) {
      return <Plus className="h-4 w-4 text-green-400 drop-shadow-[0_0_8px_#00FF00]" />;
    }
    if (type === 'usage') {
      return <Minus className="h-4 w-4 text-orange-400 drop-shadow-[0_0_8px_#FFA500]" />;
    }
    if (type === 'expired') {
      return <Clock className="h-4 w-4 text-red-400 drop-shadow-[0_0_8px_#FF0000]" />;
    }
    return <Minus className="h-4 w-4 text-red-400 drop-shadow-[0_0_8px_#FF0000]" />;
  };

  const getTransactionBadge = (type: string) => {
    const badges: Record<string, { label: string; variant: any; className: string }> = {
      'tier_grant': { label: 'Tier Grant', variant: 'default', className: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30' },
      'purchase': { label: 'Purchase', variant: 'default', className: 'bg-purple-500/20 text-purple-300 border-purple-400/30' },
      'admin_grant': { label: 'Admin Grant', variant: 'secondary', className: 'bg-green-500/20 text-green-300 border-green-400/30' },
      'promotional': { label: 'Promotional', variant: 'secondary', className: 'bg-blue-500/20 text-blue-300 border-blue-400/30' },
      'usage': { label: 'Usage', variant: 'outline', className: 'bg-orange-500/20 text-orange-300 border-orange-400/30' },
      'refund': { label: 'Refund', variant: 'secondary', className: 'bg-green-500/20 text-green-300 border-green-400/30' },
      'adjustment': { label: 'Adjustment', variant: 'outline', className: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30' },
      'expired': { label: 'Expired', variant: 'destructive', className: 'bg-red-500/20 text-red-300 border-red-400/30' },
    };

    const badge = badges[type] || { label: type, variant: 'outline', className: 'bg-gray-500/20 text-gray-300 border-gray-400/30' };
    return (
      <NeonBadge variant={badge.variant} className={badge.className}>
        {badge.label}
      </NeonBadge>
    );
  };

  const handlePrevPage = () => {
    setOffset(Math.max(0, offset - limit));
  };

  const handleNextPage = () => {
    if (data?.pagination.has_more) {
      setOffset(offset + limit);
    }
  };

  if (isLoading && offset === 0) {
    return (
      <div className="space-y-6 relative">
        <Neon3DBackground />
        <div className="relative z-10">
          <Neon3DCard>
            <CardHeader>
              <CardTitle className="text-cyan-100">Credit Transactions</CardTitle>
              <CardDescription className="text-cyan-200/70">Loading your transaction history...</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full bg-cyan-400/20" />
                ))}
              </div>
            </CardContent>
          </Neon3DCard>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 relative">
        <Neon3DBackground />
        <div className="relative z-10">
          <Neon3DCard>
            <CardHeader>
              <CardTitle className="text-cyan-100">Credit Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive" className="bg-red-500/10 border-red-400/30">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertTitle className="text-red-300">Error</AlertTitle>
                <AlertDescription className="text-red-200/70">
                  {error.message || 'Failed to load transactions'}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Neon3DCard>
        </div>
      </div>
    );
  }

  const currentBalance = data?.current_balance;
  const transactions = data?.transactions || [];

  return (
    <div className="space-y-6 relative min-h-screen">
      {/* 3D Neon Background */}
      <Neon3DBackground />
      
      <div className="relative z-10 space-y-6">
        {/* Experimental Mode Banner */}
        <Neon3DCard className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-cyan-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  Experimental Mode Active
                </h3>
                <p className="text-cyan-200/70 text-sm">
                  You're currently in the experimental phase. No payment required - enjoy full access to all features!
                </p>
              </div>
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                FREE ACCESS
              </Badge>
            </div>
          </CardContent>
        </Neon3DCard>

        {currentBalance && (
          <div className="grid gap-6 md:grid-cols-3">
            {/* Total Balance Card */}
            <Neon3DCard>
              <CardHeader className="pb-4">
                <CardTitle className="text-cyan-100 text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Total Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-400 drop-shadow-[0_0_10px_#00FF00]">
                  {formatBalance(currentBalance.total)}
                </div>
                <p className="text-cyan-200/70 text-sm mt-2">Available credits</p>
              </CardContent>
            </Neon3DCard>

            {/* Expiring Credits Card */}
            <Neon3DCard>
              <CardHeader className="pb-4">
                <CardTitle className="text-cyan-100 text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-400" />
                  Expiring Credits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-400 drop-shadow-[0_0_10px_#FFA500]">
                  {formatBalance(currentBalance.expiring)}
                </div>
                <p className="text-cyan-200/70 text-sm mt-2">Use before expiration</p>
              </CardContent>
            </Neon3DCard>

            {/* Permanent Credits Card */}
            <Neon3DCard>
              <CardHeader className="pb-4">
                <CardTitle className="text-cyan-100 text-lg flex items-center gap-2">
                  <Infinity className="w-5 h-5 text-blue-400" />
                  Permanent Credits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-400 drop-shadow-[0_0_10px_#0088FF]">
                  {formatBalance(currentBalance.non_expiring)}
                </div>
                <p className="text-cyan-200/70 text-sm mt-2">Never expires</p>
              </CardContent>
            </Neon3DCard>
          </div>
        )}

        {/* Transaction History */}
        <Neon3DCard>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-cyan-100 text-2xl flex items-center gap-3">
                  <Brain className="w-6 h-6 text-cyan-400" />
                  Transaction History
                </CardTitle>
                <CardDescription className="text-cyan-200/70">
                  All credit additions and deductions in the cognitive network
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-3">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40 border-cyan-400/30 bg-gray-800/50 text-cyan-100">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent className="border-cyan-400/20 bg-gray-900">
                    <SelectItem value="all" className="text-cyan-100">All Types</SelectItem>
                    <SelectItem value="tier_grant" className="text-cyan-100">Tier Grants</SelectItem>
                    <SelectItem value="usage" className="text-cyan-100">Usage</SelectItem>
                    <SelectItem value="purchase" className="text-cyan-100">Purchases</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-cyan-400/30">
                  <Info className="w-8 h-8 text-cyan-400" />
                </div>
                <p className="text-cyan-200/70">
                  {typeFilter ? `No ${typeFilter} transactions found.` : 'No transactions found.'}
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-lg border border-cyan-400/20 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-800/50">
                      <TableRow className="border-cyan-400/20 hover:bg-cyan-500/10">
                        <TableHead className="w-[180px] text-cyan-300 font-semibold">Date & Time</TableHead>
                        <TableHead className="text-cyan-300 font-semibold">Type</TableHead>
                        <TableHead className="text-cyan-300 font-semibold">Description</TableHead>
                        <TableHead className="text-center text-cyan-300 font-semibold">Credit Type</TableHead>
                        <TableHead className="text-right text-cyan-300 font-semibold">Amount</TableHead>
                        <TableHead className="text-right text-cyan-300 font-semibold">Balance After</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((tx) => (
                        <TableRow key={tx.id} className="group border-cyan-400/10 hover:bg-cyan-500/10 transition-all duration-300">
                          <TableCell className="font-mono text-xs text-cyan-200">
                            {formatDate(tx.created_at)}
                          </TableCell>
                          <TableCell>
                            <div className="group">
                              {getTransactionBadge(tx.type)}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            <div className="flex items-center gap-3">
                              {getTransactionIcon(tx.type, tx.amount)}
                              <span className="text-cyan-200">{tx.description || 'Cognitive Operation'}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {tx.is_expiring !== undefined && (
                              <div className="flex items-center justify-center gap-2">
                                {tx.is_expiring ? (
                                  <>
                                    <Clock className="h-4 w-4 text-orange-400 drop-shadow-[0_0_8px_#FFA500]" />
                                    <span className="text-xs text-orange-300">Expiring</span>
                                  </>
                                ) : (
                                  <>
                                    <Infinity className="h-4 w-4 text-blue-400 drop-shadow-[0_0_8px_#0088FF]" />
                                    <span className="text-xs text-blue-300">Permanent</span>
                                  </>
                                )}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className={cn(
                            "text-right font-mono font-semibold text-lg",
                            tx.amount >= 0 
                              ? "text-green-400 drop-shadow-[0_0_8px_#00FF00]" 
                              : "text-red-400 drop-shadow-[0_0_8px_#FF0000]"
                          )}>
                            {formatAmount(tx.amount)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-cyan-200 font-semibold">
                            {formatBalance(tx.balance_after)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {data?.pagination && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-6 border-t border-cyan-400/20">
                    <p className="text-sm text-cyan-200/70">
                      Showing {offset + 1}-{Math.min(offset + limit, data.pagination.total)} of {data.pagination.total} cognitive transactions
                    </p>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrevPage}
                        disabled={offset === 0}
                        className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20 disabled:opacity-50"
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={!data.pagination.has_more}
                        className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20 disabled:opacity-50"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Neon3DCard>
      </div>
    </div>
  );
}

// Enhanced Global styles for animations
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