'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React, { useEffect, useState } from 'react'
import { TypographyMuted, TypographyP } from "@/components/ui/Typography"
import { Button } from "@/components/ui/button"
import { useMnemonic, useWalletActions } from "@/stores/useWalletStore"
import SeedInput from "@/components/phrase-input"
// import { deriveWallets } from "@/lib/wallet"
import { useRouter } from "next/navigation"
import copy from 'clipboard-copy';
import { toast } from "sonner"



export default function SeedsPage() {

    const mnemonic = useMnemonic()
    const { setMnemonic } = useWalletActions()
    const router = useRouter()

    // if new wallet, the phrases would be prefilled else 12 empty inputs 
    const [phrases, setPhrase] = useState<string[]>(mnemonic.length > 0 ? mnemonic?.split(" ") : Array(12).fill(''))

    useEffect(() => {
        if (mnemonic.length > 1) {
            const phrases = mnemonic?.split(" ");
            setPhrase(phrases)

        }
    }, [mnemonic])

    // if new wallet, then type would be create else importing wallet type would be add
    const type = mnemonic.length > 0 ? 'CREATE' : 'ADD'

    const handleSeedChange = (index: number, newValue: string) => {
        const words = newValue.trim().split(/\s+/);
        if (words.length === 12) {
            setPhrase(words);
        } else {
            const updatedPhrases = [...phrases];
            updatedPhrases[index] = newValue;
            setPhrase(updatedPhrases);
        }
    };

    const handleCopyClipboard = () => {
        copy(mnemonic)
        toast('Copied to clipboard')

    }

    const handleAddAndVerifySeeds = () => {
        // TODO
        setMnemonic(phrases.join(" "))
    }

    const showPublicAddress = async () => {
        if (type === 'CREATE') router.push('/wallet')
        // TODO
        // try {
        //     const aa = await deriveWallets(mnemonic)
        //     .log(aa, 67890)
        //     setWalletsBulk(aa)
        //     router.push('/wallet')
        // } catch (error) {

        // }
    }

    return (
        <div className="m-2 lg:w-8/12 lg:mx-auto pt-4 lg:mt-48">
            <Card>
                {mnemonic}
                <CardHeader>
                    <CardTitle>Configure Phrases</CardTitle>
                    <CardDescription>{type === 'CREATE' ? 'Save' : 'Enter'} your phrases</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {phrases.map((phrase, index) => (
                        <SeedInput
                            key={`phrase-${index}`}
                            index={index + 1}
                            value={phrase}
                            disabled={type === 'CREATE'}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSeedChange(index, e.target.value)}
                        />
                    ))}
                </CardContent>
                <CardFooter className={mnemonic ? 'justify-end' : 'justify-between'}>
                    {!mnemonic && <TypographyMuted>Paste whole 12 words in any input box</TypographyMuted>}
                    <TypographyP>
                        {type === 'CREATE' && <Button className="mr-2" onClick={showPublicAddress}>Proceed</Button>}
                        <Button
                            variant={type === 'CREATE' ? 'outline' : 'default'}
                            onClick={type === 'CREATE' ? handleCopyClipboard : handleAddAndVerifySeeds}
                        >
                            {type === 'CREATE' ? 'Copy to Clipboard' : 'Verify and add wallet'}
                        </Button>
                    </TypographyP>
                </CardFooter>
            </Card>
        </div>
    )
}