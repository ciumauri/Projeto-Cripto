# 🚀 FaucetChain - Next-Gen Faucet Blockchain Ecosystem

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

> **FaucetChain** é a primeira blockchain ecosystem projetada especificamente para Web3 faucets, integrando IA autônoma, DeFi, SocialFi e governança DAO em uma plataforma unificada.

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Arquitetura](#-arquitetura)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [API Reference](#-api-reference)
- [Contribuição](#-contribuição)
- [Roadmap](#-roadmap)
- [Licença](#-licença)

## 🌟 Visão Geral

FaucetChain é uma plataforma revolucionária que combina:

- **🎯 Faucet Layer**: Sistema inteligente de distribuição de tokens
- **🤖 AI Agent**: Agente autônomo para governança e otimização
- **💎 DeFi Hub**: Protocolos de staking, yield farming e lending
- **👥 SocialFi**: Rede social gamificada com recompensas
- **🖼️ NFT Marketplace**: Trading de achievement badges e profile NFTs
- **🗳️ DAO Governance**: Sistema de votação descentralizado
- **📊 Analytics**: Dashboard completo de métricas e performance

## 🏗️ Arquitetura

### Arquitetura Geral

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[Next.js App Router]
        B[React Components]
        C[Tailwind CSS + shadcn/ui]
        D[Framer Motion]
    end

    subgraph "State Management"
        E[React Hooks]
        F[Context API]
        G[Local Storage]
    end

    subgraph "Backend Services"
        H[API Routes]
        I[Database Layer]
        J[Blockchain Integration]
        K[AI Services]
    end

    subgraph "External Integrations"
        L[Web3 Wallets]
        M[Blockchain Networks]
        N[Social APIs]
        O[DeFi Protocols]
    end

    A --> B
    B --> C
    B --> D
    B --> E
    E --> F
    F --> G
    A --> H
    H --> I
    H --> J
    H --> K
    J --> L
    J --> M
    K --> N
    K --> O
```

### Fluxo de Dados

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant D as Database
    participant B as Blockchain
    participant AI as AI Agent

    U->>F: Interação
    F->>A: Request
    A->>D: Query/Update
    A->>B: Transaction
    A->>AI: Analysis
    AI->>A: Response
    A->>F: Response
    F->>U: Update UI
```

## 🚀 Funcionalidades

### 🎯 Faucet Layer

- **Multi-token Support**: Suporte para FAUCET, DRIP e outros tokens
- **Smart Cooldowns**: Sistema inteligente de cooldown baseado em IA
- **Mission System**: Missões diárias e semanais com recompensas
- **External Integration**: Integração com faucets externos via API
- **Anti-fraud**: Sistema avançado de detecção de fraudes
- **Proof of Claim Consensus**: Consenso inovador baseado em claims válidos

### 🤖 AI Agent (FaucetAI)

- **Autonomous Governance**: Governança autônoma da rede
- **Performance Optimization**: Otimização automática de parâmetros
- **Fraud Detection**: Detecção em tempo real de atividades suspeitas
- **Yield Optimization**: Otimização de yields em protocolos DeFi
- **Chat Interface**: Interface de chat para interação com usuários

### 💎 DeFi Hub

- **Staking Pools**: Pools de staking com diferentes APYs
- **Yield Farming**: Protocolos de yield farming automatizados
- **Lending/Borrowing**: Sistema de empréstimos descentralizado
- **Liquidity Mining**: Mineração de liquidez com recompensas
- **Cross-chain**: Suporte para múltiplas blockchains

### 👥 SocialFi

- **Gamified Social**: Rede social com sistema de gamificação
- **DRIP Rewards**: Recompensas em DRIP por interações sociais
- **Leaderboards**: Rankings globais e por categoria
- **Achievement System**: Sistema de conquistas e badges
- **Community Features**: Features de comunidade (posts, likes, shares)

### 🖼️ NFT Marketplace

- **Achievement NFTs**: NFTs de conquistas únicas
- **Profile Customization**: Personalização de perfis com NFTs
- **Trading System**: Sistema de trading peer-to-peer
- **Rarity System**: Sistema de raridade e valorização
- **Cross-platform**: Compatibilidade com marketplaces externos

### 🗳️ DAO Governance

- **Proposal System**: Sistema de propostas da comunidade
- **Voting Mechanism**: Mecanismo de votação ponderado
- **Treasury Management**: Gestão do tesouro da DAO
- **Delegation**: Sistema de delegação de votos
- **Transparency**: Transparência total nas decisões

### 📊 Analytics Dashboard

- **Network Metrics**: Métricas em tempo real da rede
- **User Analytics**: Analytics detalhados de usuários
- **Performance Tracking**: Acompanhamento de performance
- **Revenue Analytics**: Analytics de receita e TVL
- **Custom Reports**: Relatórios personalizáveis

## 🛠️ Tecnologias

### Frontend

- **Next.js 15.2.4**: Framework React com App Router
- **TypeScript 5.0**: Tipagem estática
- **Tailwind CSS 3.4.17**: Framework CSS utilitário
- **shadcn/ui**: Componentes UI modernos
- **Framer Motion 12.6.3**: Animações fluidas
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de schemas

### Backend

- **Next.js API Routes**: API routes integradas
- **Node.js**: Runtime JavaScript
- **TypeScript**: Tipagem estática no backend

### UI/UX

- **Radix UI**: Componentes primitivos acessíveis
- **Lucide React**: Ícones modernos
- **React Hot Toast**: Notificações toast
- **Sonner**: Sistema de notificações avançado
- **React Resizable Panels**: Painéis redimensionáveis

### Blockchain & Web3

- **Web3.js/Ethers.js**: Interação com blockchain
- **WalletConnect**: Conexão com carteiras
- **MetaMask Integration**: Integração com MetaMask
- **Substrate Framework**: Framework para blockchain customizada
- **Polkadot Integration**: Integração como parachain
- **Proof of Claim Consensus**: Consenso inovador para faucets

### Desenvolvimento

- **ESLint**: Linting de código
- **Prettier**: Formatação de código
- **Vitest**: Framework de testes
- **Testing Library**: Utilitários de teste

## 📁 Estrutura do Projeto

```
Projeto-Cripto/
├── app/                          # App Router (Next.js 13+)
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx               # Layout raiz
│   └── page.tsx                 # Página principal
├── components/                   # Componentes React
│   ├── ui/                      # Componentes UI base
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...                  # Outros componentes UI
│   ├── ai-agent.tsx             # Componente do AI Agent
│   ├── dashboard-overview.tsx   # Dashboard principal
│   ├── faucet-layer.tsx         # Camada de faucets
│   ├── sidebar.tsx              # Barra lateral
│   └── socialfi.tsx             # Componente SocialFi
├── hooks/                       # Custom hooks
│   └── use-toast.ts
├── lib/                         # Utilitários e configurações
│   └── utils.ts
├── public/                      # Arquivos estáticos
├── components.json              # Configuração shadcn/ui
├── next.config.js               # Configuração Next.js
├── package.json                 # Dependências e scripts
├── postcss.config.js            # Configuração PostCSS
├── tailwind.config.ts           # Configuração Tailwind
└── tsconfig.json                # Configuração TypeScript
```

### Detalhamento dos Componentes

#### 🎯 Core Components

**`app/page.tsx`**

- Componente principal da aplicação
- Gerencia o estado global dos módulos
- Implementa lazy loading de componentes
- Sistema de roteamento interno

**`components/sidebar.tsx`**

- Navegação principal da aplicação
- Sistema de colapso/expansão
- Indicadores de status em tempo real
- Badges de funcionalidades

**`components/dashboard-overview.tsx`**

- Dashboard principal com métricas
- Cards de estatísticas em tempo real
- Ações rápidas
- Resumo do portfólio
- Atividades recentes

#### 🚰 Faucet Components

**`components/faucet-layer.tsx`**

- Sistema completo de faucets
- Múltiplos tipos de faucets (básico, social, missão)
- Sistema de cooldown inteligente
- Missões diárias e semanais
- Integração com faucets externos

#### 🤖 AI Components

**`components/ai-agent.tsx`**

- Interface do agente de IA
- Sistema de ações e recomendações
- Chat interface com FaucetAI
- Métricas de performance da IA
- Sistema de aprovação de ações

#### 👥 Social Components

**`components/socialfi.tsx`**

- Rede social gamificada
- Sistema de posts e interações
- Leaderboard global
- Sistema de recompensas DRIP
- Estatísticas da comunidade

## 🚀 Instalação

### Pré-requisitos

- Node.js 18.0 ou superior
- npm ou yarn
- Git

### Passos de Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/Projeto-Cripto.git
cd Projeto-Cripto
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env.local
```

4. **Execute o projeto**

```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**

```
http://localhost:3000
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/faucetchain"

# Blockchain
NEXT_PUBLIC_RPC_URL="https://mainnet.infura.io/v3/YOUR_PROJECT_ID"
NEXT_PUBLIC_CHAIN_ID="1"

# AI Services
OPENAI_API_KEY="your_openai_api_key"
AI_SERVICE_URL="https://api.faucetchain.ai"

# Social APIs
TWITTER_API_KEY="your_twitter_api_key"
DISCORD_BOT_TOKEN="your_discord_bot_token"

# Security
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

# External Services
REDIS_URL="redis://localhost:6379"
```

### Configuração do Banco de Dados

1. **PostgreSQL** (Recomendado)

```bash
# Instalar PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Criar banco de dados
createdb faucetchain

# Executar migrações
npm run db:migrate
```

2. **MongoDB** (Alternativa)

```bash
# Instalar MongoDB
sudo apt-get install mongodb

# Iniciar serviço
sudo systemctl start mongodb
```

### Configuração do Redis (Cache)

```bash
# Instalar Redis
sudo apt-get install redis-server

# Iniciar Redis
sudo systemctl start redis-server
```

## 🎮 Uso

### Primeiro Acesso

1. **Conectar Carteira**

   - Clique em "Connect Wallet" no dashboard
   - Selecione sua carteira (MetaMask, WalletConnect, etc.)
   - Autorize a conexão

2. **Explorar Faucets**

   - Navegue para "Faucet Layer"
   - Visualize faucets disponíveis
   - Complete missões para desbloquear recompensas

3. **Interagir com IA**

   - Acesse "AI Agent"
   - Chat com FaucetAI
   - Aprove/rejeite ações sugeridas

4. **Participar do SocialFi**
   - Vá para "SocialFi"
   - Crie posts e interaja
   - Ganhe DRIP tokens

### Funcionalidades Principais

#### 🎯 Faucet Layer

```typescript
// Exemplo de claim de faucet
const claimFaucet = async (faucetId: string) => {
  const response = await fetch("/api/faucet/claim", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ faucetId }),
  });
  return response.json();
};
```

#### 🤖 AI Agent

```typescript
// Exemplo de interação com IA
const sendMessageToAI = async (message: string) => {
  const response = await fetch("/api/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return response.json();
};
```

#### 👥 SocialFi

```typescript
// Exemplo de criação de post
const createPost = async (content: string) => {
  const response = await fetch("/api/social/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  return response.json();
};
```

## 🌐 Integração Polkadot

### Consenso Proof of Claim

O FaucetChain implementa um consenso inovador chamado **Proof of Claim (POC)** que é otimizado especificamente para o ecossistema de faucets:

- **Validação de Claims**: Validadores verificam claims de faucet
- **Proof of Work**: Sistema de prova de trabalho para claims
- **Staking de Validadores**: Validadores fazem stake para participar
- **Cross-chain Bridge**: Integração com outras blockchains via Polkadot

### Setup Rápido

```bash
# Executar setup automático
./scripts/setup-polkadot.sh

# Navegar para projeto blockchain
cd ../faucetchain-blockchain

# Build e deploy
./build.sh
./deploy-testnet.sh
```

### Documentação Completa

- 📖 [Guia de Integração Polkadot](docs/POLKADOT_INTEGRATION.md)
- 🚀 [Quick Start Polkadot](docs/QUICK_START_POLKADOT.md)
- 🏗️ [Arquitetura Técnica](docs/ARCHITECTURE.md)

## 📚 API Reference

### Endpoints Principais

#### Faucet API

```typescript
// GET /api/faucet/list
// Retorna lista de faucets disponíveis

// POST /api/faucet/claim
// Body: { faucetId: string }
// Claim tokens de um faucet

// GET /api/faucet/missions
// Retorna missões disponíveis

// POST /api/faucet/missions/complete
// Body: { missionId: string }
// Completa uma missão
```

#### AI Agent API

```typescript
// GET /api/ai/status
// Retorna status do agente de IA

// POST /api/ai/chat
// Body: { message: string }
// Envia mensagem para o AI Agent

// GET /api/ai/actions
// Retorna ações pendentes

// POST /api/ai/actions/approve
// Body: { actionId: string, approved: boolean }
// Aprova/rejeita ação da IA
```

#### SocialFi API

```typescript
// GET /api/social/posts
// Retorna posts do feed

// POST /api/social/posts
// Body: { content: string }
// Cria novo post

// POST /api/social/posts/:id/like
// Like em um post

// GET /api/social/leaderboard
// Retorna leaderboard
```

#### User API

```typescript
// GET /api/user/profile
// Retorna perfil do usuário

// PUT /api/user/profile
// Body: { username: string, avatar: string }
// Atualiza perfil

// GET /api/user/stats
// Retorna estatísticas do usuário
```

### Schemas de Dados

#### User Schema

```typescript
interface User {
  id: string;
  walletAddress: string;
  username: string;
  avatar?: string;
  faucetScore: number;
  dripBalance: number;
  totalEarned: number;
  rank: number;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Faucet Schema

```typescript
interface Faucet {
  id: string;
  name: string;
  token: string;
  amount: number;
  cooldown: number;
  requirements?: string[];
  type: "basic" | "social" | "mission";
  status: "available" | "cooldown" | "completed";
}
```

#### Post Schema

```typescript
interface Post {
  id: string;
  authorId: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  dripReward: number;
  createdAt: Date;
}
```

## 🤝 Contribuição

### Como Contribuir

1. **Fork o projeto**
2. **Crie uma branch para sua feature**

```bash
git checkout -b feature/nova-funcionalidade
```

3. **Commit suas mudanças**

```bash
git commit -m 'Adiciona nova funcionalidade'
```

4. **Push para a branch**

```bash
git push origin feature/nova-funcionalidade
```

5. **Abra um Pull Request**

### Padrões de Código

- **TypeScript**: Use tipagem estática
- **ESLint**: Siga as regras de linting
- **Prettier**: Formatação automática
- **Conventional Commits**: Use padrão de commits
- **Testes**: Escreva testes para novas funcionalidades

### Estrutura de Commits

```
feat: adiciona nova funcionalidade
fix: corrige bug específico
docs: atualiza documentação
style: formatação de código
refactor: refatoração de código
test: adiciona ou corrige testes
chore: tarefas de manutenção
```

## 🗺️ Roadmap

### Fase 1 - Fundação (Q1 2024)

- [x] Estrutura base do projeto
- [x] Componentes UI fundamentais
- [x] Sistema de navegação
- [ ] Sistema de autenticação
- [ ] Integração com carteiras Web3

### Fase 2 - Core Features (Q2 2024)

- [ ] Sistema de faucets funcional
- [ ] AI Agent básico
- [ ] SocialFi implementado
- [ ] Banco de dados configurado
- [ ] API routes completas

### Fase 3 - DeFi Integration (Q3 2024)

- [ ] DeFi Hub funcional
- [ ] Staking pools
- [ ] Yield farming
- [ ] NFT Marketplace
- [ ] Cross-chain support

### Fase 4 - Advanced Features (Q4 2024)

- [ ] DAO Governance
- [ ] Analytics Dashboard
- [ ] Mobile App
- [ ] Advanced AI features
- [ ] Enterprise features

### Fase 5 - Scale & Optimize (Q1 2025)

- [ ] Performance optimization
- [ ] Security audit
- [ ] Mainnet launch
- [ ] Community features
- [ ] Partnership integrations

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

- **Discord**: [FaucetChain Community](https://discord.gg/faucetchain)
- **Twitter**: [@FaucetChain](https://twitter.com/faucetchain)
- **Email**: support@faucetchain.com
- **Documentação**: [docs.faucetchain.com](https://docs.faucetchain.com)

## 🙏 Agradecimentos

- Comunidade Web3
- Contribuidores open source
- Parceiros e investidores
- Usuários beta testers

---

**FaucetChain** - Revolucionando o ecossistema de faucets Web3 🚀

_Última atualização: Janeiro 2024_
