'use client';

import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { PricingSection } from '@/components/home/sections/pricing-section';
import { CreditBalanceDisplay, CreditPurchaseModal } from '@/components/billing/credit-purchase';
import { isLocalMode } from '@/lib/config';
import {
    getSubscription,
    createPortalSession,
    cancelSubscription,
    reactivateSubscription,
    SubscriptionStatus,
} from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';
import { useSubscriptionCommitment } from '@/hooks/react-query/subscriptions/use-subscriptions';
import { useQueryClient } from '@tanstack/react-query';
import { subscriptionKeys } from '@/hooks/react-query/subscriptions/keys';
import { Skeleton } from '@/components/ui/skeleton';
import { 
    X, 
    Zap, 
    AlertTriangle, 
    Shield, 
    CheckCircle, 
    RotateCcw, 
    Clock,
    Sparkles,
    Brain,
    Cpu,
    Infinity,
    Crown
} from 'lucide-react';
import { toast } from 'sonner';

interface BillingModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    returnUrl?: string;
    showUsageLimitAlert?: boolean;
}

// 3D Neon Background Component
const Neon3DBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Crown Icons */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute transform animate-float"
          style={{
            left: `${15 + (i * 15)}%`,
            top: `${20 + (Math.sin(i) * 25)}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${8 + (i % 4)}s`
          }}
        >
          <div className={cn(
            "w-6 h-6 rounded-lg flex items-center justify-center border-2 shadow-lg backdrop-blur-sm",
            i % 3 === 0 ? "border-cyan-400 shadow-[0_0_15px_#00FFFF] bg-cyan-400/10" :
            i % 3 === 1 ? "border-purple-400 shadow-[0_0_15px_#FF00FF] bg-purple-400/10" :
            "border-yellow-400 shadow-[0_0_15px_#FFFF00] bg-yellow-400/10"
          )}>
            <Crown className={cn(
              "w-3 h-3",
              i % 3 === 0 ? "text-cyan-400" :
              i % 3 === 1 ? "text-purple-400" :
              "text-yellow-400"
            )} />
          </div>
        </div>
      ))}

      {/* Data Stream Lines */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-0.5 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-yellow-400/20 opacity-40 animate-pulse"
          style={{
            top: `${40 + i * 20}%`,
            left: '0%',
            width: '100%',
            animationDelay: `${i * 0.4}s`
          }}
        />
      ))}

      {/* Quantum Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
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

// 3D Neon Card Component
const Neon3DCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("relative group", className)}>
    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <Card className={cn(
      "relative bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-sm border border-cyan-400/20 rounded-2xl shadow-2xl shadow-cyan-500/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-cyan-500/20",
      "transform-gpu"
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

export function BillingModal({ open, onOpenChange, returnUrl = typeof window !== 'undefined' ? window?.location?.href || '/' : '/', showUsageLimitAlert = false }: BillingModalProps) {
    const { session, isLoading: authLoading } = useAuth();
    const queryClient = useQueryClient();
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionStatus | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isManaging, setIsManaging] = useState(false);
    const [showCreditPurchaseModal, setShowCreditPurchaseModal] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    const {
        data: commitmentInfo,
        isLoading: commitmentLoading,
        error: commitmentError,
        refetch: refetchCommitment
    } = useSubscriptionCommitment(subscriptionData?.subscription?.id || null);

    const fetchSubscriptionData = async () => {
        if (!session) return;

        try {
            setIsLoading(true);
            const data = await getSubscription();
            setSubscriptionData(data);
            setError(null);
            return data;
        } catch (err) {
            console.error('Failed to get subscription:', err);
            setError(err instanceof Error ? err.message : 'Failed to load subscription data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!open || authLoading || !session) return;
        fetchSubscriptionData();
    }, [open, session, authLoading]);

    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatEndDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    // Get the effective cancellation date (could be period end or cancel_at for yearly commitments)
    const getEffectiveCancellationDate = () => {
        if (subscriptionData?.subscription?.cancel_at) {
            // Yearly commitment cancellation - use cancel_at timestamp
            return formatDate(subscriptionData.subscription.cancel_at);
        }
        // Regular cancellation - use current period end
        return formatDate(subscriptionData?.subscription?.current_period_end || 0);
    };

    const handleManageSubscription = async () => {
        try {
            setIsManaging(true);
            const { url } = await createPortalSession({ return_url: returnUrl });
            window.location.href = url;
        } catch (err) {
            console.error('Failed to create portal session:', err);
            setError(err instanceof Error ? err.message : 'Failed to create portal session');
        } finally {
            setIsManaging(false);
        }
    };

    const handleCancel = async () => {
        setIsCancelling(true);
        const originalState = subscriptionData;
        
        try {
            console.log('Cancelling subscription...');
            setShowCancelDialog(false);

            // Optimistic update - show cancelled state immediately
            if (subscriptionData?.subscription) {
                const optimisticState = {
                    ...subscriptionData,
                    subscription: {
                        ...subscriptionData.subscription,
                        cancel_at_period_end: true,
                        ...(commitmentInfo?.has_commitment && commitmentInfo.commitment_end_date ? {
                            cancel_at: Math.floor(new Date(commitmentInfo.commitment_end_date).getTime() / 1000)
                        } : {})
                    }
                };
                setSubscriptionData(optimisticState);
            }

            const response = await cancelSubscription();

            if (response.success) {
                toast.success(response.message);
            } else {
                setSubscriptionData(originalState);
                toast.error(response.message);
            }
        } catch (error: any) {
            console.error('Error cancelling subscription:', error);
            setSubscriptionData(originalState);
            toast.error(error.message || 'Failed to cancel subscription');
        } finally {
            setIsCancelling(false);
        }
    };

    const handleReactivate = async () => {
        setIsCancelling(true);
        const originalState = subscriptionData;
        
        try {
            console.log('Reactivating subscription...');

            // Optimistic update - show active state immediately
            if (subscriptionData?.subscription) {
                const optimisticState = {
                    ...subscriptionData,
                    subscription: {
                        ...subscriptionData.subscription,
                        cancel_at_period_end: false,
                        cancel_at: undefined
                    }
                };
                setSubscriptionData(optimisticState);
            }

            const response = await reactivateSubscription();

            if (response.success) {
                toast.success(response.message);
            } else {
                setSubscriptionData(originalState);
                toast.error(response.message);
            }
        } catch (error: any) {
            console.error('Error reactivating subscription:', error);
            setSubscriptionData(originalState);
            toast.error(error.message || 'Failed to reactivate subscription');
        } finally {
            setIsCancelling(false);
        }
    };

    // Local mode content
    if (isLocalMode()) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black border border-cyan-400/20 rounded-2xl">
                    <Neon3DBackground />
                    <div className="relative z-10">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-center">
                                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                                    Billing & Subscription
                                </span>
                            </DialogTitle>
                        </DialogHeader>
                        <Neon3DCard className="mt-4">
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                                    <Zap className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-cyan-100 mb-2">Experimental Mode Active</h3>
                                <p className="text-cyan-200/70 text-sm">
                                    Running in experimental mode - all premium features are available
                                </p>
                                <div className="mt-4 flex justify-center">
                                    <NeonBadge variant="secondary" className="bg-green-500/20 text-green-300 border-green-400/30">
                                        <Sparkles className="w-3 h-3 mr-1" />
                                        FREE ACCESS
                                    </NeonBadge>
                                </div>
                            </CardContent>
                        </Neon3DCard>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black border border-cyan-400/20 rounded-2xl p-0">
                {/* 3D Neon Background */}
                <Neon3DBackground />
                
                <div className="relative z-10 p-6">
                    <DialogHeader className="text-center mb-6">
                        <DialogTitle className="text-3xl font-bold">
                            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_#00FFFF]">
                                Upgrade Your Cognitive Power
                            </span>
                        </DialogTitle>
                        <DialogDescription className="text-cyan-200/70 text-lg">
                            Unlock advanced capabilities for your digital twins
                        </DialogDescription>
                    </DialogHeader>

                    {/* Experimental Mode Banner */}
                    <Neon3DCard className="mb-6 bg-gradient-to-r from-yellow-500/10 to-cyan-500/10">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                                    <Zap className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-cyan-100 flex items-center gap-3">
                                        <Sparkles className="w-5 h-5 text-yellow-400" />
                                        Experimental Phase Active
                                    </h3>
                                    <p className="text-cyan-200/70">
                                        You're currently in the experimental phase. No payment required - enjoy full access to all cognitive features!
                                    </p>
                                </div>
                                <NeonBadge variant="secondary" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-sm px-4 py-2">
                                    <Crown className="w-4 h-4 mr-1" />
                                    PREMIUM ACCESS
                                </NeonBadge>
                            </div>
                        </CardContent>
                    </Neon3DCard>

                    {/* Pricing Section */}
                    <div className="mb-6">
                        <PricingSection 
                            returnUrl={returnUrl} 
                            showTitleAndTabs={false}
                            onSubscriptionUpdate={() => {
                                setTimeout(() => {
                                    fetchSubscriptionData();
                                }, 500);
                            }}
                        />
                    </div>

                    {error ? (
                        <Neon3DCard className="border-red-400/30">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-400/30">
                                        <AlertTriangle className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-red-300 font-semibold">Connection Error</h4>
                                        <p className="text-red-200/70 text-sm">Failed to load billing status: {error}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Neon3DCard>
                    ) : subscriptionData?.subscription && (
                        <Neon3DCard>
                            <CardHeader>
                                <CardTitle className="text-cyan-100 flex items-center gap-3">
                                    <Brain className="w-6 h-6 text-cyan-400" />
                                    Subscription Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Status Header */}
                                <div className="flex items-center justify-between p-4 bg-cyan-500/10 rounded-xl border border-cyan-400/20">
                                    <div className="flex items-center gap-3">
                                        <span className="text-cyan-100 font-semibold">
                                            {subscriptionData.subscription.cancel_at_period_end || subscriptionData.subscription.cancel_at 
                                                ? 'Plan Status' 
                                                : 'Current Plan'}
                                        </span>
                                        {commitmentInfo?.has_commitment && (
                                            <NeonBadge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                                                {commitmentInfo.months_remaining || 0}mo commitment
                                            </NeonBadge>
                                        )}
                                    </div>
                                    <NeonBadge variant={
                                        subscriptionData.subscription.cancel_at_period_end || subscriptionData.subscription.cancel_at 
                                            ? 'destructive' 
                                            : 'secondary'
                                    } className={
                                        subscriptionData.subscription.cancel_at_period_end || subscriptionData.subscription.cancel_at
                                            ? "bg-red-500/20 text-red-300 border-red-400/30"
                                            : "bg-green-500/20 text-green-300 border-green-400/30"
                                    }>
                                        {subscriptionData.subscription.cancel_at_period_end || subscriptionData.subscription.cancel_at
                                            ? 'Ending ' + getEffectiveCancellationDate()
                                            : 'Active'
                                        }
                                    </NeonBadge>
                                </div>

                                {/* Cancellation Alert */}
                                {(subscriptionData.subscription.cancel_at_period_end || subscriptionData.subscription.cancel_at) && (
                                    <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-400/30 rounded-xl">
                                        <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-red-300 font-medium">Plan Scheduled to End</p>
                                            <p className="text-red-200/70 text-sm mt-1">
                                                {subscriptionData.subscription.cancel_at ? 
                                                    'Your plan is scheduled to end at commitment completion. You can reactivate anytime.' : 
                                                    'Your plan is scheduled to end at period completion. You can reactivate anytime.'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    {!(subscriptionData.subscription.cancel_at_period_end || subscriptionData.subscription.cancel_at) ? (
                                        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                                            <DialogTrigger asChild>
                                                <Button 
                                                    variant="outline" 
                                                    className="flex-1 border-red-400/30 text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all duration-300"
                                                    disabled={isCancelling}
                                                >
                                                    {isCancelling ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="animate-spin h-4 w-4 border border-red-300 border-t-transparent rounded-full" />
                                                            Processing...
                                                        </div>
                                                    ) : (
                                                        commitmentInfo?.has_commitment && !commitmentInfo?.can_cancel 
                                                            ? 'Schedule End' 
                                                            : 'Cancel Plan'
                                                    )}
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-md bg-gradient-to-br from-gray-900 to-black border border-cyan-400/20 rounded-2xl">
                                                <DialogHeader>
                                                    <DialogTitle className="text-cyan-100 text-lg">
                                                        {commitmentInfo?.has_commitment && !commitmentInfo?.can_cancel
                                                            ? 'Schedule Cancellation' 
                                                            : 'Cancel Subscription'}
                                                    </DialogTitle>
                                                    <DialogDescription className="text-cyan-200/70 text-sm">
                                                        {commitmentInfo?.has_commitment && !commitmentInfo?.can_cancel ? (
                                                            <>
                                                                Your subscription will be scheduled to end on{' '}
                                                                {commitmentInfo?.commitment_end_date
                                                                    ? formatEndDate(commitmentInfo.commitment_end_date)
                                                                    : 'your commitment end date'}
                                                                . You'll keep full access until then.
                                                            </>
                                                        ) : (
                                                            <>
                                                                Your subscription will end on{' '}
                                                                {formatDate(subscriptionData.subscription.current_period_end)}. 
                                                                You'll keep access until then.
                                                            </>
                                                        )}
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => setShowCancelDialog(false)}
                                                        disabled={isCancelling}
                                                        className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20"
                                                    >
                                                        Keep Plan
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={handleCancel}
                                                        disabled={isCancelling}
                                                        className="bg-red-500 hover:bg-red-600 text-white"
                                                    >
                                                        {isCancelling ? 'Processing...' : 'Confirm'}
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    ) : (
                                        <Button
                                            variant="default"
                                            onClick={handleReactivate}
                                            disabled={isCancelling}
                                            className="flex-1 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white border-0 transition-all duration-300 hover:scale-105"
                                        >
                                            {isCancelling ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="animate-spin h-4 w-4 border border-white border-t-transparent rounded-full" />
                                                    Processing...
                                                </div>
                                            ) : (
                                                'Reactivate Plan'
                                            )}
                                        </Button>
                                    )}

                                    {/* Manage Subscription Button */}
                                    <Button
                                        onClick={handleManageSubscription}
                                        disabled={isManaging}
                                        variant="outline"
                                        className="flex-1 border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200 transition-all duration-300"
                                    >
                                        {isManaging ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin h-4 w-4 border border-cyan-300 border-t-transparent rounded-full" />
                                                Loading...
                                            </div>
                                        ) : (
                                            <>
                                                <Cpu className="w-4 h-4 mr-2" />
                                                Dashboard
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Neon3DCard>
                    )}
                </div>
                
                {/* Credit Purchase Modal */}
                <CreditPurchaseModal
                    open={showCreditPurchaseModal}
                    onOpenChange={setShowCreditPurchaseModal}
                    currentBalance={subscriptionData?.credit_balance || 0}
                    canPurchase={subscriptionData?.can_purchase_credits || false}
                    onPurchaseComplete={() => {
                        // Refresh subscription data
                        getSubscription().then(setSubscriptionData);
                        setShowCreditPurchaseModal(false);
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}

// Utility function for class names
function cn(...classes: (string | undefined | null | boolean)[]): string {
    return classes.filter(Boolean).join(' ');
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