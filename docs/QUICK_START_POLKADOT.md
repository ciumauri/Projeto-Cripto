# 🚀 Quick Start - FaucetChain + Polkadot

## Início Rápido

Este guia te ajudará a integrar rapidamente sua blockchain FaucetChain com consenso Proof of Claim na rede Polkadot.

## ⚡ Setup Automático

### 1. Executar Script de Setup

```bash
# Navegar para o diretório do projeto
cd /home/ciumauri/Repositories/Projeto-Cripto

# Executar script de setup
./scripts/setup-polkadot.sh
```

O script irá:

- ✅ Instalar todas as dependências necessárias
- ✅ Configurar Rust, Substrate e Polkadot
- ✅ Criar estrutura do projeto blockchain
- ✅ Configurar ambiente de desenvolvimento

### 2. Verificar Instalação

```bash
# Verificar se tudo foi instalado corretamente
rustc --version
cargo --version
substrate --version
polkadot --version
node --version
```

## 🏗️ Estrutura do Projeto

Após o setup, você terá:

```
faucetchain-blockchain/
├── Cargo.toml
├── runtime/
│   ├── Cargo.toml
│   └── src/
│       ├── lib.rs
│       ├── faucet.rs
│       ├── consensus.rs
│       └── bridge.rs
├── node/
│   ├── Cargo.toml
│   └── src/
│       └── service.rs
├── pallets/
│   ├── faucet-pallet/
│   ├── consensus-pallet/
│   └── bridge-pallet/
├── build.sh
├── test.sh
├── deploy-testnet.sh
└── parachain-config.json
```

## 🎯 Implementação do Consenso Proof of Claim

### 1. Implementar Pallet de Consenso

```bash
# Navegar para o projeto blockchain
cd ../faucetchain-blockchain

# Criar pallet de consenso
mkdir -p pallets/consensus-pallet/src
```

Copie o código do pallet de consenso do arquivo `docs/POLKADOT_INTEGRATION.md` para:

- `pallets/consensus-pallet/src/lib.rs`
- `pallets/consensus-pallet/Cargo.toml`

### 2. Implementar Pallet de Faucet

```bash
# Criar pallet de faucet
mkdir -p pallets/faucet-pallet/src
```

Copie o código do pallet de faucet para:

- `pallets/faucet-pallet/src/lib.rs`
- `pallets/faucet-pallet/Cargo.toml`

### 3. Configurar Runtime

Edite `runtime/src/lib.rs` para incluir os pallets:

```rust
// Adicionar imports dos pallets
use faucet_pallet;
use consensus_pallet;
use bridge_pallet;

// Configurar pallets no construct_runtime!
construct_runtime!(
    pub enum Runtime where
        Block = Block,
        NodeBlock = opaque::Block,
        UncheckedExtrinsic = UncheckedExtrinsic,
    {
        System: frame_system::{Pallet, Call, Config, Storage, Event<T>},
        Consensus: consensus_pallet::{Pallet, Call, Storage, Event<T>},
        Faucet: faucet_pallet::{Pallet, Call, Storage, Event<T>},
        Bridge: bridge_pallet::{Pallet, Call, Storage, Event<T>},
    }
);
```

## 🧪 Testes

### 1. Executar Testes

```bash
# Executar todos os testes
./test.sh

# Ou manualmente
cargo test
```

### 2. Testes Específicos

```bash
# Testes do consenso
cargo test consensus_pallet

# Testes de performance
cargo test --release -- --ignored
```

## 🔨 Build

### 1. Build do Runtime

```bash
# Build completo
./build.sh

# Ou manualmente
cargo build --release
```

### 2. Gerar Specs

```bash
# Spec para desenvolvimento
cargo run --release --bin faucetchain-node -- build-spec --chain=dev > faucetchain-dev.json

# Spec para mainnet
cargo run --release --bin faucetchain-node -- build-spec --chain=mainnet > faucetchain-mainnet.json
```

## 🚀 Deploy no Testnet

### 1. Conectar ao Rococo

```bash
# Deploy no Rococo testnet
./deploy-testnet.sh
```

### 2. Configurar Parachain

1. Acesse [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss://rococo-rpc.polkadot.io)
2. Conecte sua carteira
3. Navegue para **Parachains** > **Parathreads**
4. Registre sua parachain

### 3. Monitorar Deploy

```bash
# Verificar logs
tail -f /tmp/faucetchain/logs/node.log

# Verificar status
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "system_health", "params":[]}' http://localhost:9944
```

## 🔧 Configuração Avançada

### 1. Configurar Validadores

```bash
# Criar conta de validador
./target/release/faucetchain-node key generate --scheme sr25519 --output-type json

# Adicionar validador ao runtime
# Editar runtime/src/lib.rs
```

### 2. Configurar Telemetria

```bash
# Adicionar telemetria
./target/release/faucetchain-node \
  --telemetry-url "wss://telemetry.polkadot.io/submit/ 0" \
  --validator
```

### 3. Configurar RPC

```bash
# Habilitar RPC seguro
./target/release/faucetchain-node \
  --rpc-external \
  --rpc-cors all \
  --rpc-methods safe
```

## 📊 Monitoramento

### 1. Métricas do Consenso

```typescript
// Frontend - Dashboard de Consenso
import { ConsensusDashboard } from "@/components/ConsensusDashboard";

export default function ConsensusPage() {
  return (
    <div>
      <h1>Consenso Proof of Claim</h1>
      <ConsensusDashboard />
    </div>
  );
}
```

### 2. API de Métricas

```rust
// Implementar endpoint de métricas
#[rpc]
pub trait ConsensusRpc {
    #[rpc(name = "consensus_getMetrics")]
    fn get_metrics(&self) -> Result<ConsensusMetrics, Error>;
}
```

## 🔐 Segurança

### 1. Validação de Claims

- ✅ Verificar assinaturas
- ✅ Validar proof of work
- ✅ Verificar timestamps
- ✅ Implementar rate limiting

### 2. Slashing

- ✅ Penalizar validadores maliciosos
- ✅ Implementar sistema de reputação
- ✅ Configurar thresholds de slashing

## 🆘 Troubleshooting

### Problemas Comuns

#### 1. Erro de Compilação

```bash
# Limpar cache do Cargo
cargo clean

# Atualizar dependências
cargo update

# Rebuild
cargo build --release
```

#### 2. Erro de Conexão

```bash
# Verificar se a porta está livre
netstat -tulpn | grep :9944

# Verificar firewall
sudo ufw status
```

#### 3. Erro de Runtime

```bash
# Verificar logs
tail -f /tmp/faucetchain/logs/node.log

# Verificar configuração
cat faucetchain-dev.json
```

## 📚 Recursos Adicionais

### Documentação

- [Substrate Documentation](https://substrate.dev/docs/)
- [Polkadot Documentation](https://polkadot.network/docs/)
- [FaucetChain Integration Guide](docs/POLKADOT_INTEGRATION.md)

### Comunidade

- [Substrate Community](https://substrate.dev/community/)
- [Polkadot Community](https://polkadot.network/community/)
- [Discord FaucetChain](https://discord.gg/faucetchain)

### Ferramentas

- [Polkadot.js Apps](https://polkadot.js.org/apps/)
- [Substrate Frontend Template](https://github.com/substrate-developer-hub/substrate-front-end-template)
- [Polkadot.js API](https://polkadot.js.org/docs/api/)

## 🎯 Próximos Passos

1. **Implementar Pallets**: Completar implementação dos pallets
2. **Testes**: Executar testes unitários e de integração
3. **Auditoria**: Realizar auditoria de segurança
4. **Deploy Testnet**: Deploy no Rococo testnet
5. **Validação**: Testar com usuários reais
6. **Parachain Auction**: Participar do leilão de parachain
7. **Mainnet Deploy**: Deploy na Polkadot mainnet

---

**Precisa de ajuda?** Entre em contato:

- 📧 Email: support@faucetchain.com
- 💬 Discord: [FaucetChain Community](https://discord.gg/faucetchain)
- 🐛 Issues: [GitHub Issues](https://github.com/faucetchain/issues)
