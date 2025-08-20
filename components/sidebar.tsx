"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Droplets,
  Bot,
  Coins,
  Users,
  ShoppingBag,
  Vote,
  TrendingUp,
  Wallet,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Activity,
  Zap
} from 'lucide-react';

interface SidebarProps {
  currentModule: string;
  onModuleChange: (module: string) => void;
}

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Activity,
    description: 'Overview geral'
  },
  {
    id: 'faucet',
    label: 'Faucet Layer',
    icon: Droplets,
    description: 'Claim tokens',
    badge: 'Live'
  },
  {
    id: 'ai-agent',
    label: 'AI Agent',
    icon: Bot,
    description: 'IA autônoma',
    badge: 'Beta'
  },
  {
    id: 'defi',
    label: 'DeFi Hub',
    icon: Coins,
    description: 'Staking & Yield'
  },
  {
    id: 'social',
    label: 'SocialFi',
    icon: Users,
    description: 'Rede social'
  },
  {
    id: 'nft-marketplace',
    label: 'NFT Market',
    icon: ShoppingBag,
    description: 'Marketplace'
  },
  {
    id: 'governance',
    label: 'Governance',
    icon: Vote,
    description: 'DAO voting'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: TrendingUp,
    description: 'Network stats'
  }
];

export default function Sidebar({ currentModule, onModuleChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  console.log("Sidebar rendered with current module:", currentModule);

  return (
    <div className={cn(
      "relative flex flex-col bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pinga-gradient rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold glow-text">FaucetChain</h1>
              <p className="text-xs text-muted-foreground">Web3 Faucet Ecosystem</p>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentModule === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-12 transition-all duration-200",
                  isActive && "cyber-border neon-glow",
                  isCollapsed && "justify-center"
                )}
                onClick={() => {
                  console.log("Module selected:", item.id);
                  onModuleChange(item.id);
                }}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive ? "text-primary" : "text-muted-foreground"
                )} />
                
                {!isCollapsed && (
                  <>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge variant="outline" className="text-xs bg-primary/10">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.description}
                      </p>
                    </div>
                  </>
                )}
              </Button>
            );
          })}
        </div>
        
        <Separator className="my-4" />
        
        {/* Secondary Actions */}
        <div className="space-y-1 pb-4">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 h-10",
              isCollapsed && "justify-center"
            )}
          >
            <Wallet className="w-4 h-4" />
            {!isCollapsed && <span>Wallet</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 h-10",
              isCollapsed && "justify-center"
            )}
          >
            <Settings className="w-4 h-4" />
            {!isCollapsed && <span>Settings</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 h-10",
              isCollapsed && "justify-center"
            )}
          >
            <HelpCircle className="w-4 h-4" />
            {!isCollapsed && <span>Help</span>}
          </Button>
        </div>
      </ScrollArea>
      
      {/* Status Indicator */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-muted-foreground">Network Online</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Block: #1,337,420
          </div>
        </div>
      )}
    </div>
  );
}