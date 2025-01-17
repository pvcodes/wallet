'use client'

import { Button } from "@/components/ui/button"
import { TypographyH3, TypographyP } from "@/components/ui/Typography"
import { useMnemonic, useWalletActions } from "@/stores/useWalletStore"
import { generateMnemonic } from "@/lib/wallet"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
// import { useEffect, useState } from "react"

export default function RootPage() {

  const router = useRouter()
  const mnemonic = useMnemonic()
  const { setMnemonic } = useWalletActions()

  const [isCreatingWallet, setIsCreatingWallet] = useState(false)


  useEffect(() => {
    if (mnemonic && !isCreatingWallet) router.push('/wallet')
  }, [mnemonic, isCreatingWallet, router])



  const handleCreateWallet = () => {
    setIsCreatingWallet(true)
    const mnemonic = generateMnemonic()
    setMnemonic(mnemonic)
    router.push('/seeds')
  }

  return (
    <div className="mt-10 lg:mt-72">
      {mnemonic}
      <div className="flex justify-center items-center flex-col">
        <Button className="p-10" onClick={handleCreateWallet}>
          {isCreatingWallet && <Loader2 className="animate-spin" />}
          <TypographyH3>Create a new Wallet</TypographyH3>
        </Button>
        <Button onClick={() => router.push('/seeds')} variant='link'> <TypographyP>Add existing wallet using phrase</TypographyP></Button>
      </div>
    </div>
  )
}