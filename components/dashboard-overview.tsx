"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Droplets, 
  Coins, 
  TrendingUp, 
  Users, 
  Activity,
  Zap,
  Bot,
  Wallet
} from 'lucide-react';

const statsCards = [
  {
    title: "Total FAUCET Claimed",
    value: "1,234,567",
    icon: Droplets,
    change: "+12.5%",
    trend: "up"
  },
  {
    title: "Active Faucets",
    value: "42",
    icon: Activity,
    change: "+3",
    trend: "up"
  },
  {
    title: "Community Members",
    value: "18,924",
    icon: Users,
    change: "+1,247",
    trend: "up"
  },
  {
    title: "Total TVL",
    value: "$2.4M",
    icon: Coins,
    change: "+8.2%",
    trend: "up"
  }
];

const recentActivities = [
  {
    id: 1,
    type: "faucet_claim",
    description: "Você reivindicou 100 FAUCET",
    timestamp: "2 min atrás",
    amount: "+100 FAUCET"
  },
  {
    id: 2,
    type: "social_reward",
    description: "Recompensa por like no post #1337",
    timestamp: "15 min atrás",
    amount: "+5 DRIP"
  },
  {
    id: 3,
    type: "staking_reward",
    description: "Recompensa de staking recebida",
    timestamp: "1h atrás",
    amount: "+25 FAUCET"
  },
  {
    id: 4,
    type: "nft_mint",
    description: "NFT Achievement desbloqueado",
    timestamp: "3h atrás",
    amount: "Genesis Badge"
  }
];

export default function DashboardOverview() {
  console.log("Dashboard Overview component rendered");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold glow-text">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to FaucetChain ecosystem</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10">
            <Bot className="w-3 h-3 mr-1" />
            AI Active
          </Badge>
          <Badge variant="outline" className="bg-green-500/10 text-green-500">
            <Activity className="w-3 h-3 mr-1" />
            Online
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="cyber-border hover:neon-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-500 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-faucet-gradient hover:opacity-90 transition-opacity">
              <Droplets className="w-4 h-4 mr-2" />
              Claim Faucet
            </Button>
            <Button variant="outline" className="w-full">
              <Coins className="w-4 h-4 mr-2" />
              Stake FAUCET
            </Button>
            <Button variant="outline" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Join Social
            </Button>
            <Button variant="outline" className="w-full">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </CardContent>
        </Card>

        {/* Portfolio Summary */}
        <Card className="cyber-border">
          <CardHeader>
            <CardTitle>Your Portfolio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">FAUCET Balance</span>
                <span className="font-mono">1,250.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">DRIP Points</span>
                <span className="font-mono">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Staked Amount</span>
                <span className="font-mono">500.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">NFTs Owned</span>
                <span className="font-mono">3</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Next Faucet Claim</span>
                <span className="text-primary">Available</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="cyber-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-green-500">
                    {activity.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}