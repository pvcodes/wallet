import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Copy, Trash } from "lucide-react"
import { copyToClipboard, truncateString } from "@/lib/utils"
import { Wallet } from "@/interface"
import { TypographyP } from "./ui/Typography"

const InfoSection = ({ label, value }: { label: string, value: string }) => (
    <div className="flex items-center justify-between">
        <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="font-mono">{truncateString(value)}</p>
        </div>
        <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(value)}
            className="ml-2"
        >
            <Copy className="h-4 w-4" />
        </Button>
    </div>
)


interface AddressProps {
    wallet: Wallet,
    index: number

}

export default function Address({ wallet, index }: AddressProps) {
    const handleRemoveWallet = () => {
        // TODO
    }
    return (
        <Card key={wallet.address}>
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <TypographyP>Wallet {index + 1}: {wallet.address}</TypographyP>
                    <Button variant='outline' size='sm' onClick={handleRemoveWallet}>
                        <Trash className="h-2 w-2" />
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <InfoSection label="Public Key" value={wallet.publicKey} />
                    <InfoSection label="Private Key" value={wallet.privateKey} />
                </div>
            </CardContent>
        </Card>
    )
}