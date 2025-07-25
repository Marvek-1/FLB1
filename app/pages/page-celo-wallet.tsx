"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Wallet, Send, Receive, History, Settings, AlertCircle, CheckCircle, Copy } from "lucide-react"
import { useWallet } from "@/hooks/useWallet"
import { toast } from "@/app/components/hooks/use-toast"

export default function CeloWalletPage() {
  const { connected, address, balance, chainId, connectWallet, disconnect, switchNetwork } = useWallet()
  const [sendAmount, setSendAmount] = useState("")
  const [sendAddress, setSendAddress] = useState("")
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  const isOnCelo = chainId === 42220 || chainId === 44787
  const networkName = chainId === 42220 ? "Celo Mainnet" : chainId === 44787 ? "Celo Alfajores" : "Unknown"

  const handleConnect = async () => {
    try {
      await connectWallet()
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to Celo wallet",
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet",
        variant: "destructive",
      })
    }
  }

  const handleSend = async () => {
    if (!sendAmount || !sendAddress) {
      toast({
        title: "Invalid Input",
        description: "Please enter amount and recipient address",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // In a real implementation, this would send the transaction
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate transaction
      
      toast({
        title: "Transaction Sent",
        description: `Sent ${sendAmount} CELO to ${sendAddress.slice(0, 6)}...${sendAddress.slice(-4)}`,
      })
      
      setSendAmount("")
      setSendAddress("")
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Failed to send transaction",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  if (!connected) {
    return (
      <div className="min-h-screen bg-dusk py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-ash-gray/30 border border-flame/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-flame to-pulse rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Connect Your Celo Wallet</CardTitle>
              <p className="text-gray-300">Connect your wallet to access Celo blockchain features</p>
            </CardHeader>
            <CardContent className="text-center">
              <Button onClick={handleConnect} className="flame-button w-full max-w-sm">
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dusk py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading text-white mb-4">
            Celo <span className="text-flame">Wallet</span>
          </h1>
          <p className="text-gray-300 text-lg">Manage your CELO and FLB tokens</p>
        </div>

        {/* Wallet Status */}
        <Card className="bg-ash-gray/30 border border-flame/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-white">Wallet Status</span>
              <Badge className={isOnCelo ? "bg-green-600" : "bg-yellow-600"}>
                {isOnCelo ? "Connected to Celo" : "Switch to Celo"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Network</p>
                <p className="text-white font-medium">{networkName}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Address</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-white font-mono text-sm">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </p>
                  <Button variant="ghost" size="sm" onClick={copyAddress}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <Button variant="outline" onClick={disconnect} size="sm">
                  Disconnect
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-ash-gray/30 border border-flame/20">
            <CardHeader>
              <CardTitle className="text-white">CELO Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-flame mb-2">
                {balance.celo} CELO
              </div>
              <p className="text-gray-400 text-sm">Native Celo token</p>
            </CardContent>
          </Card>

          <Card className="bg-ash-gray/30 border border-pulse/20">
            <CardHeader>
              <CardTitle className="text-white">FLB Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-pulse mb-2">
                {balance.flb} FLB
              </div>
              <p className="text-gray-400 text-sm">Flameborn tokens</p>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Actions */}
        <Tabs defaultValue="send" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="send">Send</TabsTrigger>
            <TabsTrigger value="receive">Receive</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="send">
            <Card className="bg-ash-gray/30 border border-flame/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Tokens
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient" className="text-white">Recipient Address</Label>
                  <Input
                    id="recipient"
                    placeholder="0x..."
                    value={sendAddress}
                    onChange={(e) => setSendAddress(e.target.value)}
                    className="flame-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-white">Amount (CELO)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.0"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    className="flame-input"
                  />
                </div>
                <Button 
                  onClick={handleSend} 
                  disabled={loading || !sendAmount || !sendAddress}
                  className="flame-button w-full"
                >
                  {loading ? "Sending..." : "Send Transaction"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="receive">
            <Card className="bg-ash-gray/30 border border-pulse/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Receive className="w-5 h-5" />
                  Receive Tokens
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-300">Share this address to receive tokens</p>
                <div className="bg-white p-4 rounded-lg">
                  <div className="w-32 h-32 bg-gray-200 mx-auto mb-4 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 text-sm">QR Code</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 bg-dusk p-3 rounded-lg">
                  <code className="text-white font-mono text-sm break-all">{address}</code>
                  <Button variant="ghost" size="sm" onClick={copyAddress}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="bg-ash-gray/30 border border-guardian/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Transaction History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <History className="w-16 w-16 text-gray-400 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-400">No transactions yet</p>
                  <p className="text-gray-500 text-sm mt-2">Your transaction history will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {!isOnCelo && (
          <Card className="bg-yellow-900/20 border border-yellow-600/30 mt-8">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-yellow-200 font-medium">Switch to Celo Network</p>
                  <p className="text-yellow-300 text-sm">Connect to Celo Mainnet or Alfajores testnet for full functionality</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => switchNetwork("alfajores")}
                  className="ml-auto"
                >
                  Switch Network
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
