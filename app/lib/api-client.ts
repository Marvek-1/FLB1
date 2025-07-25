const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface User {
  id: number
  wallet_address: string
  role: string
  name: string
  location: string
  verification_status: string
  flb_balance: number
  created_at: string
  is_validator: boolean
}

export interface Transaction {
  id: number
  tx_hash: string
  from_address: string
  to_address: string
  amount: number
  tx_type: string
  status: string
  block_height: number
  timestamp: string
}

export interface NetworkStats {
  total_users: number
  total_validators: number
  total_transactions: number
  total_healthcare_actions: number
  total_flb_supply: number
  network_health: string
  ubuntu_score: number
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  async ping() {
    const response = await fetch(`${this.baseUrl}/ping`)
    return response.json()
  }

  async getManifest() {
    const response = await fetch(`${this.baseUrl}/.well-known/manifest.json`)
    return response.json()
  }

  async createUser(userData: {
    wallet_address: string
    role: string
    name: string
    location: string
  }): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.statusText}`)
    }
    return response.json()
  }

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/users`)
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`)
    }
    return response.json()
  }

  async getUser(walletAddress: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${walletAddress}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`)
    }
    return response.json()
  }

  async verifyUser(walletAddress: string) {
    const response = await fetch(`${this.baseUrl}/users/${walletAddress}/verify`, {
      method: "PUT",
    })
    if (!response.ok) {
      throw new Error(`Failed to verify user: ${response.statusText}`)
    }
    return response.json()
  }

  async createTransaction(transactionData: {
    tx_hash: string
    from_address: string
    to_address: string
    amount: number
    tx_type: string
  }) {
    const response = await fetch(`${this.baseUrl}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    })
    if (!response.ok) {
      throw new Error(`Failed to create transaction: ${response.statusText}`)
    }
    return response.json()
  }

  async getTransactions(): Promise<Transaction[]> {
    const response = await fetch(`${this.baseUrl}/transactions`)
    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.statusText}`)
    }
    return response.json()
  }

  async createValidator(validatorData: {
    wallet_address: string
    stake_amount: number
    validator_key: string
  }) {
    const response = await fetch(`${this.baseUrl}/validators`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatorData),
    })
    if (!response.ok) {
      throw new Error(`Failed to create validator: ${response.statusText}`)
    }
    return response.json()
  }

  async getValidators() {
    const response = await fetch(`${this.baseUrl}/validators`)
    if (!response.ok) {
      throw new Error(`Failed to fetch validators: ${response.statusText}`)
    }
    return response.json()
  }

  async sendValidatorHeartbeat(walletAddress: string) {
    const response = await fetch(`${this.baseUrl}/validators/${walletAddress}/heartbeat`, {
      method: "POST",
    })
    if (!response.ok) {
      throw new Error(`Failed to send heartbeat: ${response.statusText}`)
    }
    return response.json()
  }

  async createHealthcareAction(actionData: {
    user_address: string
    action_type: string
    description: string
    impact_score: number
  }) {
    const response = await fetch(`${this.baseUrl}/healthcare-actions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(actionData),
    })
    if (!response.ok) {
      throw new Error(`Failed to create healthcare action: ${response.statusText}`)
    }
    return response.json()
  }

  async getHealthcareActions() {
    const response = await fetch(`${this.baseUrl}/healthcare-actions`)
    if (!response.ok) {
      throw new Error(`Failed to fetch healthcare actions: ${response.statusText}`)
    }
    return response.json()
  }

  async getNetworkStats(): Promise<NetworkStats> {
    const response = await fetch(`${this.baseUrl}/stats`)
    if (!response.ok) {
      throw new Error(`Failed to fetch network stats: ${response.statusText}`)
    }
    return response.json()
  }

  async getFLBPrice() {
    const response = await fetch(`${this.baseUrl}/oracle/price`)
    if (!response.ok) {
      throw new Error(`Failed to fetch FLB price: ${response.statusText}`)
    }
    return response.json()
  }

  async getNetworkOracle() {
    const response = await fetch(`${this.baseUrl}/oracle/network`)
    if (!response.ok) {
      throw new Error(`Failed to fetch network oracle: ${response.statusText}`)
    }
    return response.json()
  }

  async healthCheck() {
    const response = await fetch(`${this.baseUrl}/health`)
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`)
    }
    return response.json()
  }
}

export const apiClient = new ApiClient()
