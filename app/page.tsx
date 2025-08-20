"use client";

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import DashboardOverview from '@/components/dashboard-overview';
import FaucetLayer from '@/components/faucet-layer';
import AIAgent from '@/components/ai-agent';
import SocialFi from '@/components/socialfi';

// Lazy load components for better performance
const DeFiHub = () => (
  <div className="flex items-center justify-center h-96 text-center">
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">DeFi Hub - Coming Soon</h2>
      <p className="text-muted-foreground">Staking, yield farming, and lending protocols</p>
    </div>
  </div>
);

const NFTMarketplace = () => (
  <div className="flex items-center justify-center h-96 text-center">
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">NFT Marketplace - Coming Soon</h2>
      <p className="text-muted-foreground">Trade achievement badges and profile NFTs</p>
    </div>
  </div>
);

const Governance = () => (
  <div className="flex items-center justify-center h-96 text-center">
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">DAO Governance - Coming Soon</h2>
      <p className="text-muted-foreground">Vote on proposals and shape the future of PingaChain</p>
    </div>
  </div>
);

const Analytics = () => (
  <div className="flex items-center justify-center h-96 text-center">
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Analytics Dashboard - Coming Soon</h2>
      <p className="text-muted-foreground">Network statistics and performance metrics</p>
    </div>
  </div>
);

export default function Home() {
  const [currentModule, setCurrentModule] = useState('dashboard');

  console.log("Main app rendered with module:", currentModule);

  const renderModule = () => {
    switch (currentModule) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'faucet':
        return <FaucetLayer />;
      case 'ai-agent':
        return <AIAgent />;
      case 'social':
        return <SocialFi />;
      case 'defi':
        return <DeFiHub />;
      case 'nft-marketplace':
        return <NFTMarketplace />;
      case 'governance':
        return <Governance />;
      case 'analytics':
        return <Analytics />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        currentModule={currentModule} 
        onModuleChange={setCurrentModule}
      />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          {renderModule()}
        </div>
      </main>
    </div>
  );
}
