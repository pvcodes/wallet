'use client'
import React, { useState } from 'react'
import { useMnemonic, useWalletActions, useWallets } from '@/stores/useWalletStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Address from '@/components/Address'
import { TypographyH3 } from '@/components/ui/Typography'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createWallet } from '@/lib/wallet'
import { TokenType } from '@/constant'

export default function WalletPage() {
    const router = useRouter()
    const wallets = useWallets()
    const { clearWallets, setWallet } = useWalletActions()
    const tokens: TokenType[] = Object.keys(wallets) as TokenType[]
    const [currTab, setCurrTab] = useState<TokenType>('BTC')
    const mnemonic = useMnemonic()

    const handleAddWallet = async () => {
        const index = (wallets?.[currTab].length + 1).toString()
        const wallet = await createWallet(mnemonic, currTab, index)
        setWallet(currTab, wallet)
        toast(currTab)
        // TODO
    }


    const handleClearAllWallet = () => {
        clearWallets()
        router.push('/')

    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <TypographyH3> Wallet Manager</TypographyH3>
            <Tabs defaultValue={currTab} className="w-full">
                <div className='flex flex-col justify-between items-baseline md:flex-row'>
                    <TabsList className="max-w-max justify-space mb-4">
                        {tokens.map((token) => (
                            <TabsTrigger key={token} value={token} className="min-w-24" onClick={() => setCurrTab(token)}>
                                {token}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <div className='w-full flex justify-end items-center md:w-min md:justify-between'>


                        <Button variant='outline' size='lg' className='mr-2' onClick={handleAddWallet}>
                            <Plus />
                            Add New Wallet
                        </Button>


                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant='destructive'>Remove Wallets</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='w-11/12'>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will remove your all wallets. Make sure you have backup the seed phrase.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction onClick={handleClearAllWallet}>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>



                </div>
                {tokens.map((token) => (
                    <TabsContent key={token} value={token}>
                        <ScrollArea className="h-[600px] pr-4">
                            <div className="grid gap-4">
                                {wallets[token].map((wallet, index) => (
                                    <Address key={`wallet${index}`} wallet={wallet} index={index} token={token} />
                                ))}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}