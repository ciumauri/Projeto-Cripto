"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import toast from 'react-hot-toast';
import { 
  Droplets, 
  Clock, 
  Coins, 
  Target, 
  CheckCircle,
  Timer,
  Zap,
  Users,
  Gift
} from 'lucide-react';

interface FaucetData {
  id: string;
  name: string;
  token: string;
  amount: number;
  cooldown: number;
  timeLeft: number;
  requirements?: string[];
  type: 'basic' | 'social' | 'mission';
  status: 'available' | 'cooldown' | 'completed';
}

const faucetData: FaucetData[] = [
  {
    id: 'main-faucet',
    name: 'Main FAUCET Faucet',
    token: 'FAUCET',
    amount: 100,
    cooldown: 24 * 60 * 60 * 1000, // 24 hours
    timeLeft: 0,
    type: 'basic',
    status: 'available'
  },
  {
    id: 'social-drip',
    name: 'Social DRIP Faucet',
    token: 'DRIP',
    amount: 10,
    cooldown: 4 * 60 * 60 * 1000, // 4 hours
    timeLeft: 2 * 60 * 60 * 1000, // 2 hours left
    requirements: ['Follow @FaucetChain', 'Like recent post'],
    type: 'social',
    status: 'cooldown'
  },
  {
    id: 'mission-bonus',
    name: 'Daily Mission Bonus',
    token: 'FAUCET',
    amount: 50,
    cooldown: 24 * 60 * 60 * 1000,
    timeLeft: 0,
    requirements: ['Complete 3 social interactions', 'Hold 1 NFT'],
    type: 'mission',
    status: 'available'
  }
];

const missions = [
  {
    id: 'daily-login',
    title: 'Daily Login',
    description: 'Login every day for a week',
    reward: '500 FAUCET',
    progress: 85,
    completed: false
  },
  {
    id: 'social-butterfly',
    title: 'Social Butterfly',
    description: 'Get 10 likes on your posts',
    reward: '200 DRIP',
    progress: 60,
    completed: false
  },
  {
    id: 'nft-collector',
    title: 'NFT Collector',
    description: 'Own 5 different NFTs',
    reward: 'Exclusive Badge',
    progress: 100,
    completed: true
  }
];

export default function FaucetLayer() {
  const [faucets, setFaucets] = useState<FaucetData[]>(faucetData);
  const [claiming, setClaiming] = useState<string | null>(null);

  console.log("Faucet Layer component rendered");

  useEffect(() => {
    const interval = setInterval(() => {
      setFaucets(prev => prev.map(faucet => {
        if (faucet.timeLeft > 0) {
          const newTimeLeft = Math.max(0, faucet.timeLeft - 1000);
          return {
            ...faucet,
            timeLeft: newTimeLeft,
            status: newTimeLeft === 0 ? 'available' : 'cooldown'
          };
        }
        return faucet;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeLeft = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const claimFaucet = async (faucetId: string) => {
    setClaiming(faucetId);
    console.log("Claiming faucet:", faucetId);
    
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFaucets(prev => prev.map(faucet => {
        if (faucet.id === faucetId) {
          toast.success(`Successfully claimed ${faucet.amount} ${faucet.token}!`);
          return {
            ...faucet,
            timeLeft: faucet.cooldown,
            status: 'cooldown'
          };
        }
        return faucet;
      }));
    } catch (error) {
      toast.error('Failed to claim faucet. Please try again.');
      console.error("Faucet claim error:", error);
    } finally {
      setClaiming(null);
    }
  };

  const getFaucetIcon = (type: string) => {
    switch (type) {
      case 'social': return Users;
      case 'mission': return Target;
      default: return Droplets;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold glow-text">Faucet Layer</h1>
          <p className="text-muted-foreground">Claim your tokens and complete missions</p>
        </div>
        <Badge variant="outline" className="bg-primary/10">
          <Droplets className="w-3 h-3 mr-1" />
          {faucets.filter(f => f.status === 'available').length} Available
        </Badge>
      </div>

      <Tabs defaultValue="faucets" className="space-y-6">
        <TabsList className="cyber-border">
          <TabsTrigger value="faucets">Active Faucets</TabsTrigger>
          <TabsTrigger value="missions">Daily Missions</TabsTrigger>
          <TabsTrigger value="external">External Faucets</TabsTrigger>
        </TabsList>

        <TabsContent value="faucets" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {faucets.map((faucet) => {
              const Icon = getFaucetIcon(faucet.type);
              const canClaim = faucet.status === 'available';
              
              return (
                <Card key={faucet.id} className={`cyber-border transition-all duration-300 ${canClaim ? 'hover:neon-glow' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Icon className="w-5 h-5" />
                        {faucet.name}
                      </CardTitle>
                      <Badge variant={canClaim ? "default" : "secondary"}>
                        {faucet.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">
                        {faucet.amount}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {faucet.token} tokens
                      </div>
                    </div>

                    {faucet.requirements && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Requirements:</div>
                        {faucet.requirements.map((req, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {req}
                          </div>
                        ))}
                      </div>
                    )}

                    {faucet.timeLeft > 0 ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Cooldown</span>
                          <span className="font-mono">{formatTimeLeft(faucet.timeLeft)}</span>
                        </div>
                        <Progress 
                          value={((faucet.cooldown - faucet.timeLeft) / faucet.cooldown) * 100} 
                          className="h-2"
                        />
                      </div>
                    ) : (
                      <Button
                        className="w-full bg-faucet-gradient hover:opacity-90"
                        onClick={() => claimFaucet(faucet.id)}
                        disabled={claiming === faucet.id}
                      >
                        {claiming === faucet.id ? (
                          <>
                            <Timer className="w-4 h-4 mr-2 animate-spin" />
                            Claiming...
                          </>
                        ) : (
                          <>
                            <Droplets className="w-4 h-4 mr-2" />
                            Claim Now
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="missions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {missions.map((mission) => (
              <Card key={mission.id} className="cyber-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      {mission.title}
                    </CardTitle>
                    {mission.completed && (
                      <Badge variant="default" className="bg-green-500/20 text-green-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {mission.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{mission.progress}%</span>
                    </div>
                    <Progress value={mission.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Gift className="w-4 h-4 text-yellow-500" />
                      <span>Reward: {mission.reward}</span>
                    </div>
                    
                    {mission.completed ? (
                      <Button size="sm" variant="outline" disabled>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Claimed
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        disabled={mission.progress < 100}
                        className="bg-faucet-gradient hover:opacity-90"
                      >
                        <Gift className="w-4 h-4 mr-1" />
                        Claim
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="external" className="space-y-6">
          <Card className="cyber-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                External Faucet Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 space-y-4">
                <Clock className="w-16 h-16 mx-auto text-muted-foreground" />
                <h3 className="text-lg font-semibold">Coming Soon</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Integração com faucets externos através da FaucetBridge API. 
                  Conecte sua conta para acessar centenas de faucets parceiros.
                </p>
                <Button variant="outline" disabled>
                  Connect External Faucets
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}