import {ContractStatus} from "@/app/component/smart-contracts/contract-status"
export function NetworkSwitcher() {
  const [isOpen, setIsOpen] = useState(false)       
  const { network, switchNetwork } = useWallet()
    
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          {network ? (
            <Badge variant="outline" className="px-1 font-normal">
              {CELO_NETWORKS[network]?.name || "Unknown Network"}
            </Badge>
          ) : (
            <Badge variant="destructive" className="px-1 font-normal">
              <WifiOff className="h-3 w-3 mr-1" />
              Disconnected
            </Badge>
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(CELO_NETWORKS).map(([id, info]) => (
          <DropdownMenuItem 
            key={id}
            onClick={() => switchNetwork(id)}
            className="cursor-pointer"
          >
            {info.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
