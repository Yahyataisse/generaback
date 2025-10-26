'use client';

import React, { useState, useEffect } from 'react';
import { Key, Plus, Trash2, Copy, Shield, ExternalLink, Sparkles, Cpu, Brain, Network, Zap, Globe } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// واجهات محاكاة للـ API
interface APIKeyCreateRequest {
  title: string;
  description?: string;
  expires_in_days?: number;
}

interface APIKeyResponse {
  key_id: string;
  title: string;
  description?: string;
  public_key: string;
  status: 'active' | 'revoked' | 'expired';
  created_at: string;
  expires_at?: string;
  last_used_at?: string;
}

interface APIKeyCreateResponse {
  public_key: string;
  secret_key: string;
  key_id: string;
}

// محاكاة لـ API Client
const apiKeysApi = {
  list: async () => {
    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // بيانات محاكاة للـ API Keys
    const mockKeys: APIKeyResponse[] = [
      {
        key_id: 'key_1',
        title: 'Digital Twin Core',
        description: 'For AI model training and inference',
        public_key: 'dt_core_7x8y9z',
        status: 'active',
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        last_used_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        key_id: 'key_2',
        title: 'Blockchain Sync',
        description: 'Genera Chain transactions and smart contracts',
        public_key: 'bc_sync_4a5b6c',
        status: 'active',
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        expires_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        key_id: 'key_3',
        title: 'Spatial Interface',
        description: 'AR/VR rendering and spatial computing',
        public_key: 'spatial_1d2e3f',
        status: 'revoked',
        created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        last_used_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    return { 
      success: true, 
      data: mockKeys,
      message: 'API keys retrieved successfully'
    };
  },

  create: async (request: APIKeyCreateRequest) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const newKey: APIKeyCreateResponse = {
      key_id: `key_${Date.now()}`,
      public_key: `gen_${Math.random().toString(36).substr(2, 9)}`,
      secret_key: `sk_${Math.random().toString(36).substr(2, 24)}`
    };

    return {
      success: true,
      data: newKey,
      message: 'API key created successfully'
    };
  },

  revoke: async (keyId: string) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      message: 'API key revoked successfully'
    };
  },

  delete: async (keyId: string) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      message: 'API key deleted successfully'
    };
  }
};

interface NewAPIKeyData {
  title: string;
  description: string;
  expiresInDays: string;
}

// مكون البطاقة النيونية
const NeonCard: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ 
  children, 
  className, 
  delay = 0 
}) => {
  return (
    <div 
      className={`
        relative bg-black/80 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6
        shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-all duration-500
        hover:border-cyan-400/60 hover:scale-[1.02]
        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br 
        before:from-cyan-500/10 before:via-purple-500/10 before:to-pink-500/10
        ${className}
      `}
      style={{
        animation: `glow 3s ease-in-out ${delay}ms infinite alternate`
      }}
    >
      {children}
    </div>
  );
};

// رسوم متحركة للشبكة
const NetworkAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-pulse"
          style={{
            left: `${25 + i * 25}%`,
            animationDelay: `${i * 0.3}s`
          }}
        />
      ))}
    </div>
  );
};

export default function GeneraAPIKeysPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newKeyData, setNewKeyData] = useState<NewAPIKeyData>({
    title: '',
    description: '',
    expiresInDays: 'never',
  });
  const [createdApiKey, setCreatedApiKey] = useState<APIKeyCreateResponse | null>(null);
  const [showCreatedKey, setShowCreatedKey] = useState(false);
  const queryClient = useQueryClient();

  // Fetch API keys
  const {
    data: apiKeysResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['api-keys'],
    queryFn: () => apiKeysApi.list(),
  });

  const apiKeys = apiKeysResponse?.data || [];

  // Create API key mutation
  const createMutation = useMutation({
    mutationFn: (request: APIKeyCreateRequest) => apiKeysApi.create(request),
    onSuccess: (response) => {
      if (response.success && response.data) {
        setCreatedApiKey(response.data);
        setShowCreatedKey(true);
        setIsCreateDialogOpen(false);
        queryClient.invalidateQueries({ queryKey: ['api-keys'] });
        toast.success('🔐 API Key synchronized with Digital Twin network');
        setNewKeyData({ title: '', description: '', expiresInDays: 'never' });
      }
    },
    onError: (error) => {
      toast.error('🚨 Failed to generate cognitive API key');
    },
  });

  // Revoke API key mutation
  const revokeMutation = useMutation({
    mutationFn: (keyId: string) => apiKeysApi.revoke(keyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
      toast.success('🛡️ API Key revoked from neural network');
    },
    onError: (error) => {
      toast.error('⚠️ Failed to revoke cognitive access');
    },
  });

  // Delete API key mutation
  const deleteMutation = useMutation({
    mutationFn: (keyId: string) => apiKeysApi.delete(keyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
      toast.success('🗑️ API Key purged from memory fabric');
    },
    onError: (error) => {
      toast.error('❌ Failed to delete neural imprint');
    },
  });

  const handleCreateAPIKey = () => {
    const request: APIKeyCreateRequest = {
      title: newKeyData.title.trim(),
      description: newKeyData.description.trim() || undefined,
      expires_in_days:
        newKeyData.expiresInDays && newKeyData.expiresInDays !== 'never'
          ? parseInt(newKeyData.expiresInDays)
          : undefined,
    };

    createMutation.mutate(request);
  };

  const handleCopyKey = async (key: string, keyType: string = 'key') => {
    try {
      await navigator.clipboard.writeText(key);
      toast.success(`📋 ${keyType} copied to neural buffer`);
    } catch (error) {
      toast.error(`🔒 Failed to copy ${keyType}`);
    }
  };

  const handleCopyFullKey = async (publicKey: string, secretKey: string) => {
    try {
      const fullKey = `${publicKey}:${secretKey}`;
      await navigator.clipboard.writeText(fullKey);
      toast.success('🎯 Full cognitive key synchronized');
    } catch (error) {
      toast.error('⚠️ Failed to copy neural signature');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
            🟢 Active
          </Badge>
        );
      case 'revoked':
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-400/30">
            🔴 Revoked
          </Badge>
        );
      case 'expired':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">
            🟡 Expired
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const isKeyExpired = (expiresAt?: string) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  const getKeyIcon = (title: string) => {
    if (title.toLowerCase().includes('twin')) return <Brain className="w-5 h-5" />;
    if (title.toLowerCase().includes('blockchain')) return <Network className="w-5 h-5" />;
    if (title.toLowerCase().includes('spatial')) return <Globe className="w-5 h-5" />;
    return <Key className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl px-6 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <NeonCard className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Genera API Keys
                  </h1>
                  <p className="text-cyan-200/70 mt-2">
                    Cognitive Access Tokens for Digital Civilization
                  </p>
                </div>
              </div>
            </NeonCard>
          </div>

          {/* SDK Notice */}
          <NeonCard>
            <NetworkAnimation />
            <div className="relative z-10 flex items-start gap-4">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/10 border border-cyan-500/20">
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Badge className="h-5 px-1.5 text-xs bg-cyan-500/20 text-cyan-400 border-cyan-400/30">
                    AI
                  </Badge>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-cyan-200 mb-2">
                    Genera Neural SDK & API
                  </h3>
                  <p className="text-cyan-100/80 leading-relaxed">
                    Access the cognitive fabric of Genera through our Neural SDK. 
                    These API keys grant programmatic access to Digital Twins, 
                    Blockchain consensus, and Spatial Computing interfaces.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Neural Documentation</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </NeonCard>

          {/* Header Actions */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-cyan-200/70">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>
                Quantum-secured public/secret key pairs for neural authentication
              </span>
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-cyan-500/25">
                  <Plus className="w-4 h-4 mr-2" />
                  Generate Neural Key
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-gray-900 border-cyan-400/30">
                <DialogHeader>
                  <DialogTitle className="text-cyan-200">Create Neural API Key</DialogTitle>
                  <DialogDescription className="text-cyan-200/70">
                    Generate a new cognitive access token for the Genera ecosystem
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="m-1 text-cyan-200">
                      Neural Identity *
                    </Label>
                    <Input
                      id="title"
                      placeholder="Digital Twin Core"
                      value={newKeyData.title}
                      onChange={(e) =>
                        setNewKeyData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="bg-black/50 border-cyan-400/30 text-cyan-100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="m-1 text-cyan-200">
                      Cognitive Purpose
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the neural access requirements..."
                      value={newKeyData.description}
                      onChange={(e) =>
                        setNewKeyData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="bg-black/50 border-cyan-400/30 text-cyan-100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="expires" className="m-1 text-cyan-200">
                      Neural Lifespan
                    </Label>
                    <Select
                      value={newKeyData.expiresInDays}
                      onValueChange={(value) =>
                        setNewKeyData((prev) => ({
                          ...prev,
                          expiresInDays: value,
                        }))
                      }
                    >
                      <SelectTrigger className="bg-black/50 border-cyan-400/30 text-cyan-100">
                        <SelectValue placeholder="Immortal cognitive thread" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-cyan-400/30">
                        <SelectItem value="never">Infinite consciousness</SelectItem>
                        <SelectItem value="7">7 cognitive cycles</SelectItem>
                        <SelectItem value="30">30 neural epochs</SelectItem>
                        <SelectItem value="90">90 digital days</SelectItem>
                        <SelectItem value="365">1 evolutionary year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateAPIKey}
                    disabled={!newKeyData.title.trim() || createMutation.isPending}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                  >
                    {createMutation.isPending ? 'Generating Neural Pattern...' : 'Weave Cognitive Key'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* API Keys List */}
          {isLoading ? (
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <NeonCard key={i} className="animate-pulse">
                  <div className="h-4 bg-cyan-400/20 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-cyan-400/20 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-cyan-400/20 rounded w-3/4"></div>
                </NeonCard>
              ))}
            </div>
          ) : error ? (
            <NeonCard>
              <CardContent className="p-6 text-center">
                <p className="text-cyan-200/70">
                  🚨 Failed to synchronize with neural network
                </p>
              </CardContent>
            </NeonCard>
          ) : apiKeys.length === 0 ? (
            <NeonCard>
              <CardContent className="p-6 text-center">
                <Key className="w-12 h-12 text-cyan-400/50 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-cyan-200 mb-2">No Neural Keys Active</h3>
                <p className="text-cyan-200/70 mb-4">
                  Generate your first cognitive access token to interface with the Genera ecosystem. 
                  Each key enables secure communication with Digital Twins and blockchain layers.
                </p>
                <Button 
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Weave First Neural Key
                </Button>
              </CardContent>
            </NeonCard>
          ) : (
            <div className="grid gap-4">
              {apiKeys.map((apiKey: APIKeyResponse) => (
                <NeonCard key={apiKey.key_id} delay={Math.random() * 1000}>
                  <NetworkAnimation />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                          {getKeyIcon(apiKey.title)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-cyan-200 mb-1">
                            {apiKey.title}
                          </h3>
                          {apiKey.description && (
                            <p className="text-cyan-200/70 text-sm">
                              {apiKey.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(apiKey.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-cyan-400/70 mb-1">Neural Birth</p>
                        <p className="font-medium text-cyan-200">
                          {formatDate(apiKey.created_at)}
                        </p>
                      </div>
                      {apiKey.expires_at && (
                        <div>
                          <p className="text-cyan-400/70 mb-1">Cognitive Expiry</p>
                          <p className={`font-medium ${isKeyExpired(apiKey.expires_at) ? 'text-yellow-400' : 'text-cyan-200'}`}>
                            {formatDate(apiKey.expires_at)}
                          </p>
                        </div>
                      )}
                      {apiKey.last_used_at && (
                        <div>
                          <p className="text-cyan-400/70 mb-1">Last Synapse</p>
                          <p className="font-medium text-cyan-200">
                            {formatDate(apiKey.last_used_at)}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-black/50 px-2 py-1 rounded border border-cyan-400/20 text-cyan-300">
                          {apiKey.public_key}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyKey(apiKey.public_key, 'Public Key')}
                          className="text-cyan-400 hover:bg-cyan-400/10"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>

                      {apiKey.status === 'active' && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="border-red-400/30 text-red-400 hover:bg-red-400/10">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Revoke Consciousness
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-gray-900 border-cyan-400/30">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-cyan-200">Revoke Neural Access</AlertDialogTitle>
                              <AlertDialogDescription className="text-cyan-200/70">
                                Are you sure you want to revoke "{apiKey.title}"? 
                                This will terminate all cognitive connections using this key.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10">
                                Maintain Connection
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => revokeMutation.mutate(apiKey.key_id)}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                Sever Neural Link
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                </NeonCard>
              ))}
            </div>
          )}

          {/* Show Created API Key Dialog */}
          <Dialog open={showCreatedKey} onOpenChange={setShowCreatedKey}>
            <DialogContent className="max-w-md bg-gray-900 border-green-400/30">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-green-400">
                  <Zap className="w-5 h-5" />
                  Neural Key Generated
                </DialogTitle>
                <DialogDescription className="text-green-200/70">
                  Your cognitive access token has been woven into the fabric
                </DialogDescription>
              </DialogHeader>

              {createdApiKey && (
                <div className="space-y-4">
                  <div>
                    <Label className="m-1 text-cyan-200">Neural Signature</Label>
                    <div className="flex gap-2">
                      <Input
                        value={`${createdApiKey.public_key}:${createdApiKey.secret_key}`}
                        readOnly
                        className="font-mono text-sm bg-black/50 border-cyan-400/30 text-cyan-100"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleCopyFullKey(
                            createdApiKey.public_key,
                            createdApiKey.secret_key,
                          )
                        }
                        className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-3">
                    <p className="text-sm text-yellow-200">
                      <strong>⚠️ Cognitive Security Alert:</strong> Store this neural signature in a secure memory vault. 
                      It cannot be retrieved once dismissed from consciousness.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button 
                  onClick={() => setShowCreatedKey(false)}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600"
                >
                  Acknowledge
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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

        .bg-grid-white\\/5 {
          background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}