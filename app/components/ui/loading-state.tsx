import { Loader2 } from "lucide-react"

interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-12">
      <Loader2 className="h-8 w-8 md:h-10 md:w-10 animate-spin text-flame-red mb-2 md:mb-4" />
      <p className="text-sm md:text-base text-gray-400">{message}</p>
    </div>
  )
}
