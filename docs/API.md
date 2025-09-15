# 📚 API Documentation - FaucetChain

## Visão Geral

A API do FaucetChain é uma RESTful API construída com Next.js API Routes, fornecendo endpoints para todas as funcionalidades da plataforma. A API segue os princípios de **REST**, **stateless** e **JSON-based communication**.

## Base URL

```
Development: http://localhost:3001/api
Production: https://api.faucetchain.com
```

## Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação. Todos os endpoints protegidos requerem um token válido no header `Authorization`.

### Headers Obrigatórios

```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Obter Token de Autenticação

```http
POST /api/auth/login
Content-Type: application/json

{
  "walletAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  "signature": "0x...",
  "message": "Sign this message to authenticate with FaucetChain"
}
```

**Resposta:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "walletAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
      "username": "cryptouser",
      "faucetScore": 1337,
      "dripBalance": 89.5
    }
  }
}
```

## Rate Limiting

A API implementa rate limiting para prevenir abuso:

- **Endpoints públicos**: 100 requests/minuto por IP
- **Endpoints autenticados**: 1000 requests/minuto por usuário
- **Endpoints de faucet**: 10 requests/minuto por usuário

### Headers de Rate Limit

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Códigos de Status HTTP

| Código | Descrição                               |
| ------ | --------------------------------------- |
| 200    | Sucesso                                 |
| 201    | Criado com sucesso                      |
| 400    | Bad Request - Dados inválidos           |
| 401    | Unauthorized - Token inválido           |
| 403    | Forbidden - Sem permissão               |
| 404    | Not Found - Recurso não encontrado      |
| 429    | Too Many Requests - Rate limit excedido |
| 500    | Internal Server Error                   |

## Estrutura de Resposta

### Resposta de Sucesso

```json
{
  "success": true,
  "data": {
    // Dados da resposta
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_123456789"
  }
}
```

### Resposta de Erro

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados de entrada inválidos",
    "details": [
      {
        "field": "email",
        "message": "Email é obrigatório"
      }
    ]
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_123456789"
  }
}
```

## Endpoints da API

### 🔐 Autenticação

#### POST /api/auth/login

Autentica um usuário usando assinatura de carteira.

**Body:**

```json
{
  "walletAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  "signature": "0x...",
  "message": "Sign this message to authenticate with FaucetChain"
}
```

**Resposta:**

```json
{
  "success": true,
  "data": {
    "token": "jwt_token",
    "user": {
      "id": "uuid",
      "walletAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
      "username": "cryptouser",
      "faucetScore": 1337,
      "dripBalance": 89.5,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  }
}
```

#### POST /api/auth/register

Registra um novo usuário.

**Body:**

```json
{
  "walletAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  "username": "cryptouser",
  "signature": "0x...",
  "message": "Sign this message to register with FaucetChain"
}
```

#### POST /api/auth/refresh

Renova o token de autenticação.

**Headers:** `Authorization: Bearer <token>`

**Resposta:**

```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token"
  }
}
```

#### POST /api/auth/logout

Invalida o token atual.

**Headers:** `Authorization: Bearer <token>`

### 👤 Usuário

#### GET /api/user/profile

Obtém o perfil do usuário autenticado.

**Headers:** `Authorization: Bearer <token>`

**Resposta:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "walletAddress": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "username": "cryptouser",
    "avatar": "https://...",
    "faucetScore": 1337,
    "dripBalance": 89.5,
    "totalEarned": 2500.75,
    "rank": 42,
    "createdAt": "2024-01-01T00:00:00Z",
    "lastActiveAt": "2024-01-15T10:30:00Z"
  }
}
```

#### PUT /api/user/profile

Atualiza o perfil do usuário.

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "username": "newusername",
  "avatar": "https://..."
}
```

#### GET /api/user/stats

Obtém estatísticas detalhadas do usuário.

**Headers:** `Authorization: Bearer <token>`

**Resposta:**

```json
{
  "success": true,
  "data": {
    "totalClaims": 156,
    "totalEarned": 2500.75,
    "weeklyEarnings": 89.5,
    "monthlyEarnings": 350.25,
    "favoriteFaucet": "main-faucet",
    "achievements": [
      {
        "id": "first-claim",
        "name": "First Claim",
        "description": "Made your first faucet claim",
        "earnedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "recentActivity": [
      {
        "type": "faucet_claim",
        "description": "Claimed 100 FAUCET from Main Faucet",
        "amount": 100,
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

### 🚰 Faucet

#### GET /api/faucet/list

Lista todos os faucets disponíveis.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**

- `type` (optional): `basic`, `social`, `mission`
- `status` (optional): `available`, `cooldown`, `completed`

**Resposta:**

```json
{
  "success": true,
  "data": [
    {
      "id": "main-faucet",
      "name": "Main FAUCET Faucet",
      "token": "FAUCET",
      "amount": 100,
      "cooldown": 86400,
      "timeLeft": 0,
      "requirements": [],
      "type": "basic",
      "status": "available",
      "description": "Main faucet for FAUCET tokens"
    },
    {
      "id": "social-drip",
      "name": "Social DRIP Faucet",
      "token": "DRIP",
      "amount": 10,
      "cooldown": 14400,
      "timeLeft": 7200,
      "requirements": ["Follow @FaucetChain", "Like recent post"],
      "type": "social",
      "status": "cooldown",
      "description": "Social faucet for DRIP tokens"
    }
  ]
}
```

#### POST /api/faucet/claim

Claim tokens de um faucet.

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "faucetId": "main-faucet",
  "signature": "0x...",
  "message": "Sign this message to claim faucet"
}
```

**Resposta:**

```json
{
  "success": true,
  "data": {
    "claimId": "uuid",
    "faucetId": "main-faucet",
    "amount": 100,
    "token": "FAUCET",
    "transactionHash": "0x...",
    "claimedAt": "2024-01-15T10:30:00Z",
    "nextClaimAt": "2024-01-16T10:30:00Z"
  }
}
```

#### GET /api/faucet/cooldown/:faucetId

Verifica o cooldown de um faucet específico.

**Headers:** `Authorization: Bearer <token>`

**Resposta:**

```json
{
  "success": true,
  "data": {
    "faucetId": "main-faucet",
    "isAvailable": false,
    "timeLeft": 7200,
    "nextClaimAt": "2024-01-16T10:30:00Z"
  }
}
```

#### GET /api/faucet/missions

Lista missões disponíveis.

**Headers:** `Authorization: Bearer <token>`

**Resposta:**

```json
{
  "success": true,
  "data": [
    {
      "id": "daily-login",
      "title": "Daily Login",
      "description": "Login every day for a week",
      "reward": "500 FAUCET",
      "progress": 85,
      "maxProgress": 100,
      "completed": false,
      "type": "daily",
      "requirements": [
        {
          "type": "login_streak",
          "value": 7,
          "current": 6
        }
      ]
    }
  ]
}
```

#### POST /api/faucet/missions/complete

Completa uma missão.

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "missionId": "daily-login"
}
```

### 🤖 AI Agent

#### GET /api/ai/status

Obtém o status do agente de IA.

**Headers:** `Authorization: Bearer <token>`

**Resposta:**

```json
{
  "success": true,
  "data": {
    "status": "active",
    "version": "2.1",
    "uptime": 86400,
    "lastActivity": "2024-01-15T10:30:00Z",
    "metrics": {
      "networkEfficiency": 94.2,
      "fraudPrevention": 99.7,
      "yieldOptimization": 12.4,
      "userSatisfaction": 4.8
    }
  }
}
```

#### POST /api/ai/chat

Envia mensagem para o AI Agent.

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "message": "What's the current network performance?",
  "context": {
    "userId": "uuid",
    "sessionId": "session_123"
  }
}
```

**Resposta:**

```json
{
  "success": true,
  "data": {
    "response": "The network is performing optimally with 94.2% efficiency. Current TPS is 2,847.",
    "timestamp": "2024-01-15T10:30:00Z",
    "suggestions": [
      "Check your faucet strategy",
      "Consider staking your tokens"
    ]
  }
}
```

#### GET /api/ai/actions

Lista ações pendentes do AI Agent.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**

- `status` (optional): `pending`, `approved`, `rejected`
- `type` (optional): `optimization`, `alert`, `suggestion`, `analysis`

**Resposta:**

```json
{
  "success": true,
  "data": [
    {
      "id": "action_123",
      "type": "optimization",
      "title": "Optimize Faucet Cooldown",
      "description": "Reduce main faucet cooldown by 2 hours based on user engagement patterns",
      "impact": "high",
      "status": "pending",
      "timestamp": "2024-01-15T10:30:00Z",
      "estimatedImpact": {
        "userSatisfaction": "+15%",
        "networkEfficiency": "+5%"
      }
    }
  ]
}
```

#### POST /api/ai/actions/approve

Aprova ou rejeita uma ação do AI Agent.

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "actionId": "action_123",
  "approved": true,
  "reason": "This optimization will improve user experience"
}
```

### 👥 SocialFi

#### GET /api/social/posts

Lista posts do feed social.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**

- `page` (optional): Número da página (default: 1)
- `limit` (optional): Itens por página (default: 20)
- `sort` (optional): `newest`, `popular`, `trending`

**Resposta:**

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "post_123",
        "author": {
          "id": "uuid",
          "username": "cryptouser",
          "avatar": "https://...",
          "faucetScore": 1337
        },
        "content": "Just claimed from the new DeFi vault! 🚀",
        "hashtags": ["#FaucetChain", "#DeFi"],
        "likes": 24,
        "comments": 8,
        "shares": 3,
        "dripReward": 5,
        "isLiked": false,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

#### POST /api/social/posts

Cria um novo post.

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "content": "Just claimed from the new DeFi vault! 🚀 #FaucetChain #DeFi",
  "hashtags": ["#FaucetChain", "#DeFi"]
}
```

**Resposta:**

```json
{
  "success": true,
  "data": {
    "id": "post_123",
    "content": "Just claimed from the new DeFi vault! 🚀 #FaucetChain #DeFi",
    "dripReward": 10,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### POST /api/social/posts/:id/like

Like em um post.

**Headers:** `Authorization: Bearer <token>`

**Resposta:**

```json
{
  "success": true,
  "data": {
    "liked": true,
    "totalLikes": 25,
    "dripReward": 2
  }
}
```

#### POST /api/social/posts/:id/share

Compartilha um post.

**Headers:** `Authorization: Bearer <token>`

**Resposta:**

```json
{
  "success": true,
  "data": {
    "shared": true,
    "totalShares": 4,
    "dripReward": 3
  }
}
```

#### GET /api/social/leaderboard

Obtém o leaderboard global.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**

- `type` (optional): `global`, `weekly`, `monthly`
- `limit` (optional): Número de usuários (default: 50)

**Resposta:**

```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "user": {
          "id": "uuid",
          "username": "CryptoKing",
          "avatar": "https://...",
          "faucetScore": 5000
        },
        "totalEarned": 25000,
        "weeklyEarnings": 1200,
        "postsCount": 234,
        "followersCount": 1200
      }
    ],
    "userRank": {
      "rank": 42,
      "totalEarned": 2500.75,
      "weeklyEarnings": 89.5
    }
  }
}
```

### 💎 DeFi

#### GET /api/defi/pools

Lista pools de staking disponíveis.

**Headers:** `Authorization: Bearer <token>`

**Resposta:**

```json
{
  "success": true,
  "data": [
    {
      "id": "faucet-staking",
      "name": "FAUCET Staking Pool",
      "token": "FAUCET",
      "apy": 12.5,
      "totalStaked": 1000000,
      "minStake": 100,
      "lockPeriod": 30,
      "isActive": true,
      "description": "Stake FAUCET tokens to earn rewards"
    }
  ]
}
```

#### POST /api/defi/stake

Stake tokens em um pool.

**Headers:** `Authorization: Bearer <token>`

**Body:**

```json
{
  "poolId": "faucet-staking",
  "amount": 1000,
  "signature": "0x...",
  "message": "Sign this message to stake tokens"
}
```

#### GET /api/defi/positions

Lista posições de staking do usuário.

**Headers:** `Authorization: Bearer <token>`

**Resposta:**

```json
{
  "success": true,
  "data": [
    {
      "id": "position_123",
      "poolId": "faucet-staking",
      "amount": 1000,
      "stakedAt": "2024-01-01T00:00:00Z",
      "unlockAt": "2024-01-31T00:00:00Z",
      "rewards": 125.5,
      "apy": 12.5
    }
  ]
}
```

### 🖼️ NFT

#### GET /api/nft/collections

Lista coleções de NFTs disponíveis.

**Headers:** `Authorization: Bearer <token>`

**Resposta:**

```json
{
  "success": true,
  "data": [
    {
      "id": "achievement-badges",
      "name": "Achievement Badges",
      "description": "NFTs representing user achievements",
      "totalSupply": 1000,
      "minted": 250,
      "floorPrice": 10.5,
      "volume24h": 150.75
    }
  ]
}
```

#### GET /api/nft/user/:userId

Lista NFTs do usuário.

**Headers:** `Authorization: Bearer <token>`

**Resposta:**

```json
{
  "success": true,
  "data": [
    {
      "id": "nft_123",
      "tokenId": 1,
      "collection": "achievement-badges",
      "name": "Genesis Badge",
      "description": "First user to claim from FaucetChain",
      "image": "https://...",
      "rarity": "legendary",
      "attributes": [
        {
          "trait_type": "Achievement",
          "value": "Genesis"
        }
      ],
      "mintedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 📊 Analytics

#### GET /api/analytics/network

Obtém métricas da rede.

**Headers:** `Authorization: Bearer <token>`

**Resposta:**

```json
{
  "success": true,
  "data": {
    "totalUsers": 18924,
    "activeUsers": 1247,
    "totalClaims": 156789,
    "totalVolume": 2500000,
    "networkEfficiency": 94.2,
    "averageClaimTime": 2.3,
    "topFaucets": [
      {
        "id": "main-faucet",
        "name": "Main FAUCET Faucet",
        "claims": 45000,
        "volume": 4500000
      }
    ]
  }
}
```

#### GET /api/analytics/user/:userId

Obtém analytics do usuário.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**

- `period` (optional): `7d`, `30d`, `90d`, `1y`

**Resposta:**

```json
{
  "success": true,
  "data": {
    "period": "30d",
    "totalEarnings": 350.25,
    "totalClaims": 45,
    "averageClaimAmount": 7.78,
    "favoriteFaucet": "main-faucet",
    "earningsChart": [
      {
        "date": "2024-01-01",
        "earnings": 12.5
      }
    ],
    "claimsChart": [
      {
        "date": "2024-01-01",
        "claims": 3
      }
    ]
  }
}
```

## Webhooks

### Configuração de Webhooks

Para receber notificações em tempo real, configure webhooks:

```http
POST /api/webhooks/configure
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "events": ["faucet.claimed", "post.created", "ai.action.approved"],
  "secret": "your_webhook_secret"
}
```

### Eventos Disponíveis

- `user.registered` - Novo usuário registrado
- `faucet.claimed` - Faucet claim realizado
- `post.created` - Novo post criado
- `post.liked` - Post recebeu like
- `ai.action.approved` - Ação do AI aprovada
- `nft.minted` - NFT mintado
- `defi.staked` - Tokens staked

### Payload do Webhook

```json
{
  "id": "webhook_123",
  "event": "faucet.claimed",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "userId": "uuid",
    "faucetId": "main-faucet",
    "amount": 100,
    "token": "FAUCET"
  }
}
```

## SDKs e Bibliotecas

### JavaScript/TypeScript SDK

```bash
npm install @faucetchain/sdk
```

```typescript
import { FaucetChainSDK } from "@faucetchain/sdk";

const sdk = new FaucetChainSDK({
  apiKey: "your_api_key",
  baseURL: "https://api.faucetchain.com",
});

// Claim faucet
const result = await sdk.faucet.claim("main-faucet");

// Create post
const post = await sdk.social.createPost("Hello FaucetChain!");

// Get user stats
const stats = await sdk.user.getStats();
```

### Python SDK

```bash
pip install faucetchain-sdk
```

```python
from faucetchain import FaucetChainSDK

sdk = FaucetChainSDK(api_key='your_api_key')

# Claim faucet
result = sdk.faucet.claim('main-faucet')

# Create post
post = sdk.social.create_post('Hello FaucetChain!')

# Get user stats
stats = sdk.user.get_stats()
```

## Códigos de Erro

| Código                 | Descrição                     |
| ---------------------- | ----------------------------- |
| `VALIDATION_ERROR`     | Dados de entrada inválidos    |
| `AUTHENTICATION_ERROR` | Token inválido ou expirado    |
| `AUTHORIZATION_ERROR`  | Sem permissão para a operação |
| `RATE_LIMIT_EXCEEDED`  | Rate limit excedido           |
| `FAUCET_COOLDOWN`      | Faucet em cooldown            |
| `INSUFFICIENT_BALANCE` | Saldo insuficiente            |
| `BLOCKCHAIN_ERROR`     | Erro na blockchain            |
| `AI_SERVICE_ERROR`     | Erro no serviço de IA         |
| `EXTERNAL_API_ERROR`   | Erro em API externa           |
| `INTERNAL_ERROR`       | Erro interno do servidor      |

## Limitações e Quotas

### Limites por Usuário

- **Claims por dia**: 10 por faucet
- **Posts por dia**: 50
- **Likes por dia**: 500
- **API calls por minuto**: 1000

### Limites por IP

- **Requests por minuto**: 100 (endpoints públicos)
- **Requests por hora**: 1000

### Limites de Dados

- **Tamanho máximo de post**: 500 caracteres
- **Tamanho máximo de upload**: 10MB
- **Timeout de request**: 30 segundos

## Suporte

Para suporte técnico da API:

- **Email**: api-support@faucetchain.com
- **Discord**: [FaucetChain Developers](https://discord.gg/faucetchain-dev)
- **Documentação**: [docs.faucetchain.com/api](https://docs.faucetchain.com/api)
- **Status Page**: [status.faucetchain.com](https://status.faucetchain.com)

---

_Última atualização: Janeiro 2024_
