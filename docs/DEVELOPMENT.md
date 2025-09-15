# 🛠️ Guia de Desenvolvimento - FaucetChain

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- **Node.js**: 18.0 ou superior
- **npm**: 9.0 ou superior
- **Git**: 2.30 ou superior
- **PostgreSQL**: 14.0 ou superior (para desenvolvimento local)
- **Redis**: 6.0 ou superior (para cache)

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/Projeto-Cripto.git
cd Projeto-Cripto
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env.local
```

4. **Configure o banco de dados**

```bash
# Instalar PostgreSQL (Ubuntu/Debian)
sudo apt-get install postgresql postgresql-contrib

# Criar banco de dados
sudo -u postgres createdb faucetchain_dev

# Executar migrações
npm run db:migrate
```

5. **Configure o Redis**

```bash
# Instalar Redis (Ubuntu/Debian)
sudo apt-get install redis-server

# Iniciar Redis
sudo systemctl start redis-server
```

6. **Execute o projeto**

```bash
npm run dev
```

## Estrutura do Projeto

```
Projeto-Cripto/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   │   ├── auth/                # Autenticação
│   │   ├── faucet/              # Faucet endpoints
│   │   ├── ai/                  # AI Agent endpoints
│   │   ├── social/              # SocialFi endpoints
│   │   ├── defi/                # DeFi endpoints
│   │   ├── nft/                 # NFT endpoints
│   │   └── analytics/           # Analytics endpoints
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx               # Layout raiz
│   └── page.tsx                 # Página principal
├── components/                   # Componentes React
│   ├── ui/                      # Componentes UI base (shadcn/ui)
│   ├── auth/                    # Componentes de autenticação
│   ├── faucet/                  # Componentes de faucet
│   ├── ai/                      # Componentes de IA
│   ├── social/                  # Componentes sociais
│   ├── defi/                    # Componentes DeFi
│   ├── nft/                     # Componentes NFT
│   └── common/                  # Componentes comuns
├── lib/                         # Utilitários e configurações
│   ├── auth.ts                  # Configuração de autenticação
│   ├── db.ts                    # Configuração do banco
│   ├── redis.ts                 # Configuração do Redis
│   ├── blockchain.ts            # Configuração blockchain
│   ├── ai.ts                    # Configuração IA
│   └── utils.ts                 # Utilitários gerais
├── hooks/                       # Custom hooks
├── types/                       # Definições TypeScript
├── services/                    # Serviços de negócio
├── middleware/                  # Middleware customizado
├── tests/                       # Testes
│   ├── unit/                    # Testes unitários
│   ├── integration/             # Testes de integração
│   └── e2e/                     # Testes end-to-end
├── docs/                        # Documentação
├── scripts/                     # Scripts de build/deploy
└── public/                      # Arquivos estáticos
```

## Padrões de Código

### TypeScript

- **Sempre use tipagem explícita**
- **Evite `any` - use `unknown` quando necessário**
- **Use interfaces para objetos complexos**
- **Use enums para valores constantes**

```typescript
// ✅ Bom
interface User {
  id: string;
  walletAddress: string;
  username: string;
  faucetScore: number;
}

// ❌ Ruim
const user: any = { ... };

// ✅ Bom
enum FaucetType {
  BASIC = 'basic',
  SOCIAL = 'social',
  MISSION = 'mission'
}
```

### React Components

- **Use functional components com hooks**
- **Prefira composição sobre herança**
- **Use TypeScript para props**
- **Implemente error boundaries**

```typescript
// ✅ Bom
interface FaucetCardProps {
  faucet: Faucet;
  onClaim: (faucetId: string) => void;
  isClaiming: boolean;
}

export function FaucetCard({ faucet, onClaim, isClaiming }: FaucetCardProps) {
  const handleClaim = useCallback(() => {
    onClaim(faucet.id);
  }, [faucet.id, onClaim]);

  return <Card className="cyber-border">{/* Component content */}</Card>;
}
```

### API Routes

- **Use middleware para validação**
- **Implemente tratamento de erros consistente**
- **Use schemas de validação (Zod)**
- **Documente endpoints**

```typescript
// ✅ Bom
import { z } from "zod";
import { withAuth } from "@/middleware/auth";
import { validateBody } from "@/middleware/validation";

const claimFaucetSchema = z.object({
  faucetId: z.string().uuid(),
  signature: z.string().min(1),
  message: z.string().min(1),
});

export default withAuth(
  validateBody(claimFaucetSchema)(
    async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        const { faucetId, signature, message } = req.body;

        // Business logic
        const result = await faucetService.claimFaucet(
          req.user.id,
          faucetId,
          signature,
          message
        );

        res.status(200).json({
          success: true,
          data: result,
        });
      } catch (error) {
        logger.error("Faucet claim failed", error);
        res.status(500).json({
          success: false,
          error: {
            code: "INTERNAL_ERROR",
            message: "Failed to claim faucet",
          },
        });
      }
    }
  )
);
```

## Scripts de Desenvolvimento

### Scripts Disponíveis

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "db:migrate": "prisma migrate dev",
    "db:seed": "prisma db seed",
    "db:reset": "prisma migrate reset",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

### Comandos Úteis

```bash
# Desenvolvimento
npm run dev                    # Inicia servidor de desenvolvimento
npm run build                  # Build para produção
npm run start                  # Inicia servidor de produção

# Qualidade de código
npm run lint                   # Executa ESLint
npm run lint:fix               # Corrige problemas de lint
npm run type-check             # Verifica tipos TypeScript
npm run format                 # Formata código com Prettier

# Testes
npm run test                   # Executa testes unitários
npm run test:watch             # Executa testes em modo watch
npm run test:coverage          # Executa testes com cobertura
npm run test:e2e               # Executa testes E2E

# Banco de dados
npm run db:migrate             # Executa migrações
npm run db:seed                # Popula banco com dados de teste
npm run db:reset               # Reseta banco de dados
```

## Configuração de Ferramentas

### ESLint

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### Prettier

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Testes

### Configuração do Vitest

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "tests/", "**/*.d.ts", "**/*.config.*"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
```

### Exemplo de Teste Unitário

```typescript
// tests/unit/components/FaucetCard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { FaucetCard } from "@/components/faucet/FaucetCard";
import { Faucet } from "@/types/faucet";

const mockFaucet: Faucet = {
  id: "test-faucet",
  name: "Test Faucet",
  token: "FAUCET",
  amount: 100,
  cooldown: 3600,
  timeLeft: 0,
  type: "basic",
  status: "available",
};

describe("FaucetCard", () => {
  it("renders faucet information correctly", () => {
    const mockOnClaim = vi.fn();

    render(
      <FaucetCard
        faucet={mockFaucet}
        onClaim={mockOnClaim}
        isClaiming={false}
      />
    );

    expect(screen.getByText("Test Faucet")).toBeInTheDocument();
    expect(screen.getByText("100 FAUCET")).toBeInTheDocument();
  });

  it("calls onClaim when claim button is clicked", () => {
    const mockOnClaim = vi.fn();

    render(
      <FaucetCard
        faucet={mockFaucet}
        onClaim={mockOnClaim}
        isClaiming={false}
      />
    );

    const claimButton = screen.getByRole("button", { name: /claim/i });
    fireEvent.click(claimButton);

    expect(mockOnClaim).toHaveBeenCalledWith("test-faucet");
  });
});
```

### Exemplo de Teste de Integração

```typescript
// tests/integration/api/faucet.test.ts
import { createMocks } from "node-mocks-http";
import handler from "@/app/api/faucet/claim";
import { faucetService } from "@/services/faucet";

vi.mock("@/services/faucet");

describe("/api/faucet/claim", () => {
  it("should claim faucet successfully", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        faucetId: "test-faucet",
        signature: "0x...",
        message: "test message",
      },
      headers: {
        authorization: "Bearer valid-token",
      },
    });

    const mockResult = {
      claimId: "claim-123",
      amount: 100,
      token: "FAUCET",
    };

    vi.mocked(faucetService.claimFaucet).mockResolvedValue(mockResult);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      success: true,
      data: mockResult,
    });
  });
});
```

## Debugging

### Configuração do VS Code

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### Logging

```typescript
// lib/logger.ts
import winston from "winston";

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

export default logger;
```

## Performance

### Otimizações do Next.js

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["example.com"],
    formats: ["image/webp", "image/avif"],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Lazy Loading

```typescript
// components/LazyComponents.tsx
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FaucetLayer = lazy(() => import("@/components/faucet-layer"));
const AIAgent = lazy(() => import("@/components/ai-agent"));
const SocialFi = lazy(() => import("@/components/socialfi"));

export function LazyFaucetLayer() {
  return (
    <Suspense fallback={<Skeleton className="h-96" />}>
      <FaucetLayer />
    </Suspense>
  );
}
```

## Deploy

### Vercel (Recomendado)

1. **Conecte o repositório ao Vercel**
2. **Configure as variáveis de ambiente**
3. **Configure o build command**: `npm run build`
4. **Configure o output directory**: `.next`

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

## Contribuição

### Fluxo de Trabalho

1. **Crie uma branch para sua feature**

```bash
git checkout -b feature/nova-funcionalidade
```

2. **Faça suas alterações**
3. **Execute os testes**

```bash
npm run test
npm run lint
npm run type-check
```

4. **Commit suas mudanças**

```bash
git add .
git commit -m "feat: adiciona nova funcionalidade"
```

5. **Push para a branch**

```bash
git push origin feature/nova-funcionalidade
```

6. **Abra um Pull Request**

### Padrões de Commit

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona sistema de autenticação
fix: corrige bug no claim de faucet
docs: atualiza documentação da API
style: formatação de código
refactor: refatora componente FaucetCard
test: adiciona testes para AI Agent
chore: atualiza dependências
```

### Code Review

- **Revise pelo menos 2 pessoas**
- **Teste localmente antes de aprovar**
- **Verifique se os testes passam**
- **Confirme se a documentação está atualizada**

## Troubleshooting

### Problemas Comuns

#### Erro de Conexão com Banco

```bash
# Verificar se PostgreSQL está rodando
sudo systemctl status postgresql

# Verificar conexão
psql -h localhost -U postgres -d faucetchain_dev
```

#### Erro de Cache Redis

```bash
# Verificar se Redis está rodando
sudo systemctl status redis-server

# Limpar cache
redis-cli FLUSHALL
```

#### Problemas de Build

```bash
# Limpar cache do Next.js
rm -rf .next

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

#### Erro de Tipos TypeScript

```bash
# Verificar tipos
npm run type-check

# Regenerar tipos
npm run db:generate
```

### Logs de Debug

```bash
# Executar com debug
DEBUG=* npm run dev

# Logs específicos
DEBUG=faucetchain:* npm run dev
```

---

_Para mais informações, consulte a [documentação completa](README.md) ou entre em contato com a equipe de desenvolvimento._
