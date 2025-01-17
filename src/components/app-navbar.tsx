'use client'
import {
    NavigationMenu,
    // NavigationMenuContent,
    NavigationMenuItem,
    // NavigationMenuLink,
    NavigationMenuList,
    // NavigationMenuTrigger,
    // navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { TypographyH3 } from "./ui/Typography"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useMnemonic } from "@/stores/useWalletStore"

export default function AppNavbar() {

    const router = useRouter()
    // const pathName = usePathname()
    const mnemonic = useMnemonic()
    // const { clearWallets } = useWalletActions()

    const handleClearWallets = () => {

    }

    const handleAddWallet = () => {
        router.push('/seeds')
    }

    return (
        <div className="flex justify-between border-b p-2">
            <Button className="remove-all" onClick={() => router.push('/')}><TypographyH3>PiWallet</TypographyH3></Button>
            <NavigationMenu>
                <NavigationMenuList>
                    {/* <NavigationMenuItem>
                        <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="p-2 min-w-10">
                                <p>hello</p>
                                <div>
                                    <Link href={'#'}>linke</Link>
                                </div>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem> */}
                    <NavigationMenuItem className="text-sm">
                        {/* {!mnemonic ? <> */}
                        {/* </> : && <Button onClick={() => router.push('/seeds')} disabled={pathName === '/seeds'}>New</Button>} */}

                        <Button
                            variant={mnemonic ? 'destructive' : 'default'}
                            onClick={mnemonic ? handleClearWallets : handleAddWallet}
                            // disabled={pathName === '/seeds' || !mnemonic}
                            disabled={true}
                        >
                            {mnemonic ? 'Remove all wallets' : 'Add new wallet'}
                        </Button>

                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

        </div>
    )
}

