"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { 
  Bot, 
  Brain, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Activity,
  Zap,
  MessageSquare,
  Settings,
  BarChart3,
  Target,
  Cpu
} from 'lucide-react';

interface AIAction {
  id: string;
  type: 'optimization' | 'alert' | 'suggestion' | 'analysis';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  timestamp: string;
}

interface AIMetric {
  label: string;
  value: string;
  change: string;
  icon: any;
}

const aiActions: AIAction[] = [
  {
    id: '1',
    type: 'optimization',
    title: 'Optimize Faucet Cooldown',
    description: 'Reduce main faucet cooldown by 2 hours based on user engagement patterns',
    impact: 'high',
    status: 'pending',
    timestamp: '2 min ago'
  },
  {
    id: '2',
    type: 'alert',
    title: 'Suspicious Activity Detected',
    description: 'Multiple claims from similar IP addresses detected',
    impact: 'high',
    status: 'pending',
    timestamp: '15 min ago'
  },
  {
    id: '3',
    type: 'suggestion',
    title: 'New Partnership Opportunity',
    description: 'Found high-yield DeFi protocol for treasury investment',
    impact: 'medium',
    status: 'approved',
    timestamp: '1 hour ago'
  },
  {
    id: '4',
    type: 'analysis',
    title: 'Weekly Performance Report',
    description: 'User engagement increased by 24% this week',
    impact: 'low',
    status: 'completed',
    timestamp: '3 hours ago'
  }
];

const aiMetrics: AIMetric[] = [
  {
    label: 'Network Efficiency',
    value: '94.2%',
    change: '+2.1%',
    icon: Cpu
  },
  {
    label: 'Fraud Prevention',
    value: '99.7%',
    change: '+0.3%',
    icon: AlertTriangle
  },
  {
    label: 'Yield Optimization',
    value: '12.4%',
    change: '+1.8%',
    icon: TrendingUp
  },
  {
    label: 'User Satisfaction',
    value: '4.8/5',
    change: '+0.2',
    icon: Target
  }
];

export default function AIAgent() {
  const [actions, setActions] = useState<AIAction[]>(aiActions);
  const [aiStatus, setAiStatus] = useState('active');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      message: 'Hello! I\'m FaucetAI, your autonomous agent. I\'m currently monitoring the network and optimizing operations.',
      timestamp: new Date().toISOString()
    }
  ]);

  console.log("AI Agent component rendered");

  const handleActionResponse = (actionId: string, response: 'approve' | 'reject') => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: response === 'approve' ? 'approved' : 'rejected' }
        : action
    ));

    const action = actions.find(a => a.id === actionId);
    if (action) {
      toast.success(`Action ${response}d: ${action.title}`);
      console.log(`AI action ${response}d:`, action);
    }
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: chatInput,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        message: generateAIResponse(chatInput),
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const generateAIResponse = (input: string) => {
    const responses = [
      "I'm analyzing the network data and will provide optimization suggestions shortly.",
      "Based on current patterns, I recommend increasing the social rewards by 15%.",
      "The blockchain is performing optimally. Current TPS: 2,847.",
      "I've detected some interesting yield farming opportunities in the DeFi space.",
      "Network security is at 99.7% efficiency. All systems nominal."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'optimization': return Settings;
      case 'alert': return AlertTriangle;
      case 'suggestion': return Brain;
      case 'analysis': return BarChart3;
      default: return Bot;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold glow-text">AI Agent</h1>
          <p className="text-muted-foreground">Autonomous blockchain governance and optimization</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-500/10 text-green-500">
            <Activity className="w-3 h-3 mr-1 animate-pulse" />
            {aiStatus === 'active' ? 'Active' : 'Standby'}
          </Badge>
          <Badge variant="outline" className="bg-primary/10">
            <Bot className="w-3 h-3 mr-1" />
            FaucetAI v2.1
          </Badge>
        </div>
      </div>

      {/* AI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="cyber-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.label}
                    </p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-xs text-green-500">
                      {metric.change} vs last week
                    </p>
                  </div>
                  <Icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Actions & Recommendations */}
        <Card className="cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              AI Actions & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {actions.map((action) => {
                  const Icon = getActionIcon(action.type);
                  return (
                    <div key={action.id} className="p-4 border border-border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span className="font-medium">{action.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getImpactColor(action.impact)}`}
                          >
                            {action.impact} impact
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {action.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {action.timestamp}
                        </span>
                        
                        {action.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleActionResponse(action.id, 'reject')}
                            >
                              Reject
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-faucet-gradient hover:opacity-90"
                              onClick={() => handleActionResponse(action.id, 'approve')}
                            >
                              Approve
                            </Button>
                          </div>
                        )}
                        
                        {action.status === 'approved' && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* AI Chat Interface */}
        <Card className="cyber-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Chat with FaucetAI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-3">
                {chatMessages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="flex gap-2">
              <Input
                placeholder="Ask FaucetAI anything..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
              />
              <Button 
                onClick={sendChatMessage}
                className="bg-faucet-gradient hover:opacity-90"
              >
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Performance */}
      <Card className="cyber-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            AI System Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>CPU Usage</span>
                <span>23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Memory Usage</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Network Load</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}