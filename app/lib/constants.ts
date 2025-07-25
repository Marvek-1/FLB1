export const MIN_DONATION_AMOUNT = "0.01"

export enum TransactionStatus {
  NONE = "none",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

export const NETWORKS = {
  BNB_CHAIN: {
    chainId: 56,
    chainIdHex: "0x38",
    name: "BNB Smart Chain",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    blockExplorer: "https://bscscan.com",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
  },
  CELO_MAINNET: {
    chainId: 42220,
    chainIdHex: "0xa4ec",
    name: "Celo Mainnet",
    rpcUrl: "https://forno.celo.org",
    blockExplorer: "https://celoscan.io",
    nativeCurrency: {
      name: "CELO",
      symbol: "CELO",
      decimals: 18,
    },
  },
  CELO_ALFAJORES: {
    chainId: 44787,
    chainIdHex: "0xaef3",
    name: "Celo Alfajores Testnet",
    rpcUrl: "https://alfajores-forno.celo-testnet.org",
    blockExplorer: "https://alfajores.celoscan.io",
    nativeCurrency: {
      name: "CELO",
      symbol: "CELO",
      decimals: 18,
    },
  },
}

// LOCKED CONTRACT ADDRESS - DO NOT CHANGE
export const FLB_TOKEN_ADDRESSES = {
  CELO_MAINNET: "0x0000000000000000000000000000000000000000", // Not deployed yet
  CELO_ALFAJORES: "0xF72630157FF7136d9DE264ec794A0f876A5FA30a", // FINAL TESTNET CONTRACT - LOCKED
}

// Genesis airdrop addresses
export const GENESIS_VALIDATORS = [
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
]

// Donation Router Contract Addresses
export const DONATION_ROUTER_ADDRESSES = {
  CELO_MAINNET: "0x0000000000000000000000000000000000000000",
  CELO_ALFAJORES: "0x0000000000000000000000000000000000000000",
}

// Health Actors Registry Contract Addresses
export const HEALTH_ACTORS_REGISTRY_ADDRESSES = {
  CELO_MAINNET: "0x0000000000000000000000000000000000000000",
  CELO_ALFAJORES: "0x0000000000000000000000000000000000000000",
}

// Test wallet addresses for airdrop testing
export const TEST_ADDRESSES = [
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
]

// Contract deployment history
export const CONTRACT_DEPLOYMENT_HISTORY = [
  {
    address: "0xF72630157FF7136d9DE264ec794A0f876A5FA30a",
    network: "alfajores",
    deployedAt: "2024-01-XX",
    status: "ACTIVE - LOCKED",
    note: "Final testnet contract - all flows locked to this address",
  },
  {
    address: "0xa56650bdD45de03032066a046DEb5ae861301752",
    network: "alfajores",
    status: "deprecated",
  },
  {
    address: "0x729EdEbbeaf38112B13a184976A91C0fc9126c30",
    network: "alfajores",
    status: "deprecated",
  },
]

// Feature flags for testnet activation
export const FEATURES = {
  WALLET_CONNECT: true,
  TOKEN_TRANSFERS: true,
  VALIDATOR_ONBOARDING: true,
  GENESIS_AIRDROP: true,
  IDENTITY_VERIFICATION: true,
  PROVERB_VALIDATION: true,
  MOSTAR_AI: true,
  LEARN_EARN: true,
}

// Testnet activation constants
export const TESTNET_CONFIG = {
  GENESIS_SUPPLY: "1000000000000000000000100", // 1 billion + 100 FLB
  MIN_VALIDATOR_STAKE: "100",
  AIRDROP_AMOUNT: "100",
  PROVERB_REWARD: "25",
  LEARN_EARN_REWARD: "50",
}
