"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import toast from 'react-hot-toast';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  TrendingUp,
  Trophy,
  Users,
  Star,
  Plus,
  Coins,
  User,
  Clock,
  Zap
} from 'lucide-react';

interface Post {
  id: string;
  author: {
    username: string;
    faucetScore: number;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  dripReward: number;
}

interface User {
  username: string;
  faucetScore: number;
  rank: number;
  totalEarned: number;
  postsCount: number;
  followersCount: number;
}

const samplePosts: Post[] = [
  {
    id: '1',
    author: { username: 'CryptoWhale', faucetScore: 2847 },
    content: 'Just claimed from the new DeFi vault! 🚀 The APY is insane! #FaucetChain #DeFi',
    timestamp: '2 min ago',
    likes: 24,
    comments: 8,
    shares: 3,
    isLiked: false,
    dripReward: 5
  },
  {
    id: '2',
    author: { username: 'NFTCollector', faucetScore: 1923 },
    content: 'My new NFT badge collection is growing! 💎 The FaucetChain ecosystem rewards are amazing.',
    timestamp: '15 min ago',
    likes: 42,
    comments: 12,
    shares: 7,
    isLiked: true,
    dripReward: 3
  },
  {
    id: '3',
    author: { username: 'BlockchainDev', faucetScore: 3421 },
    content: 'The AI agent just optimized my faucet strategy. This platform is the future! 🤖⚡',
    timestamp: '1 hour ago',
    likes: 67,
    comments: 23,
    shares: 15,
    isLiked: false,
    dripReward: 8
  }
];

const topUsers: User[] = [
  { username: 'CryptoKing', faucetScore: 5000, rank: 1, totalEarned: 25000, postsCount: 234, followersCount: 1200 },
  { username: 'DefiMaster', faucetScore: 4750, rank: 2, totalEarned: 22500, postsCount: 189, followersCount: 980 },
  { username: 'NFTGuru', faucetScore: 4200, rank: 3, totalEarned: 18900, postsCount: 156, followersCount: 850 },
  { username: 'BlockchainBae', faucetScore: 3800, rank: 4, totalEarned: 16700, postsCount: 143, followersCount: 720 },
  { username: 'FaucetHunter', faucetScore: 3500, rank: 5, totalEarned: 15200, postsCount: 128, followersCount: 650 }
];

export default function SocialFi() {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [newPost, setNewPost] = useState('');
  const [userStats] = useState({
    faucetScore: 1337,
    rank: 42,
    dripBalance: 89,
    weeklyEarnings: 156
  });

  console.log("SocialFi component rendered");

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newLikedState = !post.isLiked;
        if (newLikedState) {
          toast.success(`+${post.dripReward} DRIP earned!`);
        }
        
        return {
          ...post,
          isLiked: newLikedState,
          likes: post.likes + (newLikedState ? 1 : -1)
        };
      }
      return post;
    }));
  };

  const handleShare = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      toast.success('+2 DRIP earned for sharing!');
      setPosts(prev => prev.map(p => 
        p.id === postId ? { ...p, shares: p.shares + 1 } : p
      ));
    }
  };

  const createPost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: { username: 'You', faucetScore: userStats.faucetScore },
      content: newPost,
      timestamp: 'now',
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      dripReward: 5
    };

    setPosts(prev => [post, ...prev]);
    setNewPost('');
    toast.success('+10 DRIP earned for posting!');
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) return { color: 'bg-yellow-500', icon: Trophy };
    if (rank <= 10) return { color: 'bg-gray-400', icon: Star };
    return { color: 'bg-bronze-500', icon: User };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold glow-text">SocialFi</h1>
          <p className="text-muted-foreground">Earn DRIP tokens through social interaction</p>
        </div>
        <Badge variant="outline" className="bg-accent/10">
          <Coins className="w-3 h-3 mr-1" />
          {userStats.dripBalance} DRIP
        </Badge>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cyber-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{userStats.faucetScore}</div>
            <div className="text-sm text-muted-foreground">FaucetScore</div>
          </CardContent>
        </Card>
        <Card className="cyber-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">#{userStats.rank}</div>
            <div className="text-sm text-muted-foreground">Global Rank</div>
          </CardContent>
        </Card>
        <Card className="cyber-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{userStats.dripBalance}</div>
            <div className="text-sm text-muted-foreground">DRIP Balance</div>
          </CardContent>
        </Card>
        <Card className="cyber-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">+{userStats.weeklyEarnings}</div>
            <div className="text-sm text-muted-foreground">This Week</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          {/* Create Post */}
          <Card className="cyber-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create Post
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Share something with the FaucetChain community..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Earn 10 DRIP for posting + engagement rewards
                </div>
                <Button 
                  onClick={createPost}
                  disabled={!newPost.trim()}
                  className="bg-faucet-gradient hover:opacity-90"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Post & Earn
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="cyber-border hover:neon-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Post Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{post.author.username[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{post.author.username}</span>
                            <Badge variant="outline" className="text-xs">
                              {post.author.faucetScore} FS
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {post.timestamp}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        +{post.dripReward} DRIP
                      </Badge>
                    </div>

                    {/* Post Content */}
                    <p className="text-foreground">{post.content}</p>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`gap-2 ${post.isLiked ? 'text-red-500' : ''}`}
                        >
                          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="gap-2">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => handleShare(post.id)}
                        >
                          <Share2 className="w-4 h-4" />
                          {post.shares}
                        </Button>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Earn {post.dripReward} DRIP per interaction
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Leaderboard */}
          <Card className="cyber-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Top Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {topUsers.map((user) => {
                    const rankBadge = getRankBadge(user.rank);
                    const RankIcon = rankBadge.icon;
                    
                    return (
                      <div key={user.username} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full ${rankBadge.color} flex items-center justify-center`}>
                            <RankIcon className="w-3 h-3 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{user.username}</div>
                            <div className="text-xs text-muted-foreground">
                              {user.faucetScore} FS
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">#{user.rank}</div>
                          <div className="text-xs text-green-500">
                            {user.totalEarned} DRIP
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Activity Stats */}
          <Card className="cyber-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Community Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Active Users</span>
                <span className="font-semibold">1,247</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm">Daily Posts</span>
                <span className="font-semibold">2,834</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm">DRIP Distributed</span>
                <span className="font-semibold">45,678</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm">Engagement Rate</span>
                <span className="font-semibold text-green-500">94.2%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}