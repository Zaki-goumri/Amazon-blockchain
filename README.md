# Amazon Blockchain

> A decentralized platform leveraging blockchain technology to manage and authenticate Amazon orders, ensuring transparency, security, and trust.

📄 **Conception Document**: [Until be ready](#conception-document)

---

## 🚀 Overview

**Amazon Blockchain** integrates blockchain technology with traditional e-commerce platforms to manage and authenticate orders. By utilizing decentralized networks, it ensures that all transactions are secure, transparent, and tamper-proof. This platform allows both sellers and buyers to interact in a trustless environment while benefiting from the core advantages of blockchain: transparency, immutability, and security.

---

## 🧱 Tech Stack

- **Blockchain**: Ethereum (Solidity for smart contracts)
- **Smart Contract Framework**: [Hardhat](https://hardhat.org/)
- **Testing**: [Mocha](https://mochajs.org/)
---

## 🛠️ Getting Started

### Prerequisites

- Node.js
- Docker (for containerized deployment)
- Ethereum testnet (Sepolia, Rinkeby, etc.) for contract deployment

### Setup

```bash
# Clone the repository
git clone https://github.com/Zaki-goumri/amazon-blockchain.git
cd amazon-blockchain
# Deploy smart contracts
cd blockchain
npx hardhat run scripts/deploy.js --network sepolia

```
## 🌐 Blockchain Integration
- Smart Contracts: Manage and authenticate orders via Ethereum smart contracts. These contracts are responsible for transaction verification, ensuring that each order placed on the platform is securely recorded on the blockchain.

- Transaction Tracking: All transactions, including order placements and status updates, are recorded and verified on the blockchain. This provides a transparent, immutable history of all interactions with the platform.

- Order Management: Orders are created and managed directly on the blockchain, with smart contracts ensuring the integrity and authenticity of the order information. Each order's status is tracked on-chain.

## 📘 What I've learnt

- Integrating blockchain technology with traditional e-commerce systems

- Smart contract development with Solidity and Hardhat

- Writing unit and e2e tests for blockchain functionalities
