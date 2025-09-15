#!/bin/bash

# =================================
# FaucetChain Polkadot Setup Script
# =================================

set -e

echo "🚀 Iniciando setup do FaucetChain para Polkadot..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

# Verificar se é root
if [[ $EUID -eq 0 ]]; then
   error "Este script não deve ser executado como root"
fi

# Verificar sistema operacional
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
else
    error "Sistema operacional não suportado: $OSTYPE"
fi

log "Sistema operacional detectado: $OS"

# =================================
# 1. Instalar Dependências do Sistema
# =================================

log "Instalando dependências do sistema..."

if [[ "$OS" == "linux" ]]; then
    # Ubuntu/Debian
    if command -v apt-get &> /dev/null; then
        sudo apt-get update
        sudo apt-get install -y \
            git \
            clang \
            curl \
            libssl-dev \
            llvm \
            libudev-dev \
            build-essential \
            pkg-config \
            libssl-dev \
            cmake \
            protobuf-compiler
    # CentOS/RHEL/Fedora
    elif command -v yum &> /dev/null; then
        sudo yum update -y
        sudo yum groupinstall -y "Development Tools"
        sudo yum install -y \
            git \
            clang \
            curl \
            openssl-devel \
            llvm \
            systemd-devel \
            cmake \
            protobuf-compiler
    elif command -v dnf &> /dev/null; then
        sudo dnf update -y
        sudo dnf groupinstall -y "Development Tools"
        sudo dnf install -y \
            git \
            clang \
            curl \
            openssl-devel \
            llvm \
            systemd-devel \
            cmake \
            protobuf-compiler
    else
        error "Gerenciador de pacotes não suportado"
    fi
elif [[ "$OS" == "macos" ]]; then
    # Verificar se Homebrew está instalado
    if ! command -v brew &> /dev/null; then
        log "Instalando Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    
    log "Instalando dependências via Homebrew..."
    brew install \
        git \
        clang \
        curl \
        openssl \
        llvm \
        cmake \
        protobuf
fi

# =================================
# 2. Instalar Rust
# =================================

log "Instalando Rust..."

if ! command -v rustc &> /dev/null; then
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source ~/.cargo/env
else
    log "Rust já está instalado: $(rustc --version)"
fi

# Atualizar Rust
rustup update

# Adicionar targets necessários
rustup target add wasm32-unknown-unknown

# =================================
# 3. Instalar Substrate
# =================================

log "Instalando Substrate..."

# Instalar Substrate CLI
cargo install --git https://github.com/paritytech/substrate.git --tag v3.0.0 --force --locked substrate

# Verificar instalação
if command -v substrate &> /dev/null; then
    log "Substrate instalado: $(substrate --version)"
else
    error "Falha na instalação do Substrate"
fi

# =================================
# 4. Instalar Polkadot
# =================================

log "Instalando Polkadot..."

# Instalar Polkadot
cargo install --git https://github.com/paritytech/polkadot.git --tag v0.9.0 --force --locked polkadot

# Verificar instalação
if command -v polkadot &> /dev/null; then
    log "Polkadot instalado: $(polkadot --version)"
else
    error "Falha na instalação do Polkadot"
fi

# =================================
# 5. Instalar Ferramentas Adicionais
# =================================

log "Instalando ferramentas adicionais..."

# Instalar ferramentas de desenvolvimento
cargo install \
    cargo-contract \
    cargo-near \
    wasm-pack \
    wasm-bindgen-cli

# Instalar Node.js (se não estiver instalado)
if ! command -v node &> /dev/null; then
    log "Instalando Node.js..."
    
    if [[ "$OS" == "linux" ]]; then
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        nvm install 18
        nvm use 18
    elif [[ "$OS" == "macos" ]]; then
        brew install node
    fi
fi

# Verificar Node.js
if command -v node &> /dev/null; then
    log "Node.js instalado: $(node --version)"
else
    error "Falha na instalação do Node.js"
fi

# =================================
# 6. Criar Estrutura do Projeto
# =================================

log "Criando estrutura do projeto FaucetChain..."

# Criar diretório do projeto blockchain
BLOCKCHAIN_DIR="../faucetchain-blockchain"
if [ ! -d "$BLOCKCHAIN_DIR" ]; then
    mkdir -p "$BLOCKCHAIN_DIR"
    cd "$BLOCKCHAIN_DIR"
    
    # Criar projeto Substrate
    substrate-node-new faucetchain-node faucetchain-runtime
    
    log "Projeto Substrate criado em: $(pwd)"
    
    # Criar estrutura de pallets
    mkdir -p pallets/{faucet-pallet,consensus-pallet,bridge-pallet}
    
    # Criar arquivos de configuração
    cat > parachain-config.json << EOF
{
  "id": 2000,
  "name": "FaucetChain",
  "description": "FaucetChain - Proof of Claim Consensus",
  "homepage": "https://faucetchain.com",
  "telemetry": [
    {
      "endpoint": "wss://telemetry.polkadot.io/submit/",
      "minimum_difficulty": 1
    }
  ],
  "properties": {
    "tokenDecimals": 18,
    "tokenSymbol": "FAUCET"
  },
  "consensus": {
    "type": "proof-of-claim",
    "validators": 100,
    "minStake": "1000000000000000000000"
  }
}
EOF
    
    # Criar script de build
    cat > build.sh << 'EOF'
#!/bin/bash
set -e

echo "🔨 Building FaucetChain runtime..."

# Build do runtime
cargo build --release

# Gerar WASM do runtime
cargo run --release --bin faucetchain-node -- build-spec --chain=dev > faucetchain-dev.json

# Gerar spec para mainnet
cargo run --release --bin faucetchain-node -- build-spec --chain=mainnet > faucetchain-mainnet.json

echo "✅ Build concluído!"
echo "📁 Arquivos gerados:"
echo "   - faucetchain-dev.json"
echo "   - faucetchain-mainnet.json"
EOF
    
    chmod +x build.sh
    
    # Criar script de teste
    cat > test.sh << 'EOF'
#!/bin/bash
set -e

echo "🧪 Executando testes..."

# Executar testes unitários
cargo test

# Executar testes específicos do consensus
cargo test consensus_pallet

# Executar testes de performance
cargo test --release -- --ignored

echo "✅ Todos os testes passaram!"
EOF
    
    chmod +x test.sh
    
    # Criar script de deploy
    cat > deploy-testnet.sh << 'EOF'
#!/bin/bash
set -e

echo "🚀 Deploying to Rococo testnet..."

# Conectar ao Rococo testnet
./target/release/faucetchain-node \
  --chain=rococo-local \
  --validator \
  --base-path=/tmp/faucetchain \
  --port=30333 \
  --rpc-port=9944 \
  --ws-port=9945 \
  --rpc-cors=all \
  --rpc-methods=Unsafe \
  --unsafe-rpc-external \
  --unsafe-ws-external

echo "✅ Deploy concluído!"
EOF
    
    chmod +x deploy-testnet.sh
    
    cd - > /dev/null
else
    warn "Diretório do projeto blockchain já existe: $BLOCKCHAIN_DIR"
fi

# =================================
# 7. Configurar Ambiente
# =================================

log "Configurando ambiente..."

# Adicionar ao PATH
echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.bashrc
echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.zshrc

# Configurar Rust
echo 'export RUST_BACKTRACE=1' >> ~/.bashrc
echo 'export RUST_BACKTRACE=1' >> ~/.zshrc

# =================================
# 8. Verificar Instalação
# =================================

log "Verificando instalação..."

# Verificar Rust
if command -v rustc &> /dev/null; then
    log "✅ Rust: $(rustc --version)"
else
    error "❌ Rust não encontrado"
fi

# Verificar Cargo
if command -v cargo &> /dev/null; then
    log "✅ Cargo: $(cargo --version)"
else
    error "❌ Cargo não encontrado"
fi

# Verificar Substrate
if command -v substrate &> /dev/null; then
    log "✅ Substrate: $(substrate --version)"
else
    error "❌ Substrate não encontrado"
fi

# Verificar Polkadot
if command -v polkadot &> /dev/null; then
    log "✅ Polkadot: $(polkadot --version)"
else
    error "❌ Polkadot não encontrado"
fi

# Verificar Node.js
if command -v node &> /dev/null; then
    log "✅ Node.js: $(node --version)"
else
    error "❌ Node.js não encontrado"
fi

# =================================
# 9. Próximos Passos
# =================================

log "🎉 Setup concluído com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "1. Navegue para o diretório do projeto blockchain:"
echo "   cd $BLOCKCHAIN_DIR"
echo ""
echo "2. Implemente os pallets do consenso Proof of Claim:"
echo "   - pallets/consensus-pallet/"
echo "   - pallets/faucet-pallet/"
echo "   - pallets/bridge-pallet/"
echo ""
echo "3. Configure o runtime em runtime/src/lib.rs"
echo ""
echo "4. Execute os testes:"
echo "   ./test.sh"
echo ""
echo "5. Faça o build:"
echo "   ./build.sh"
echo ""
echo "6. Deploy no testnet:"
echo "   ./deploy-testnet.sh"
echo ""
echo "📚 Documentação:"
echo "   - Substrate: https://substrate.dev/docs/"
echo "   - Polkadot: https://polkadot.network/docs/"
echo "   - FaucetChain: docs/POLKADOT_INTEGRATION.md"
echo ""
echo "🔗 Links úteis:"
echo "   - Rococo Testnet: https://polkadot.js.org/apps/?rpc=wss://rococo-rpc.polkadot.io"
echo "   - Substrate Tutorials: https://substrate.dev/tutorials/"
echo "   - Polkadot Community: https://polkadot.network/community/"
echo ""

log "Setup do FaucetChain para Polkadot concluído! 🚀"
