import { Tokens, TokenType } from "@/constant";
import { Wallet } from "@/interface";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface WalletState {
	mnemonic: string;
	wallets: Record<TokenType, Wallet[]>;
	actions: {
		setMnemonic: (mnemonic: string) => void;
		clearWallets: () => void;
		setWallet: (token: TokenType, wallet: Wallet) => void;
		setWalletsBulk: (wallets: Record<string, Wallet[]>) => void; // Updated type
	};
}

const useWalletStore = create<WalletState>()(
	devtools(
		persist(
			(set) => ({
				mnemonic: "",
				wallets: Tokens.reduce((acc, token) => {
					acc[token] = [];
					return acc;
				}, {} as Record<TokenType, Wallet[]>),

				// store actions
				actions: {
					setMnemonic: (mnemonic) =>
						set(
							() => ({ mnemonic }),
							undefined, // Updated to false for better performance
							"wallet/setMnemonic"
						),
					setWallet: (token: TokenType, wallet) =>
						set(
							(state) => ({
								wallets: {
									...state.wallets,
									[token]: [...state.wallets[token], wallet],
								},
							}),
							undefined, // Updated to false for better performance
							"wallet/setWallet"
						),
					setWalletsBulk: (wallets) =>
						set(
							() => ({ wallets }),
							undefined,
							"wallet/setWalletsBulk"
						), // Added action name
					clearWallets: () =>
						set(
							() => {
								useWalletStore.persist.clearStorage();
								return {
									mnemonic: "",
									wallets: Tokens.reduce((acc, token) => {
										acc[token] = [];
										return acc;
									}, {} as Record<TokenType, Wallet[]>),
								};
							},
							undefined, // Updated to false for better performance
							"wallet/clearWallets"
						),
				},
			}),
			{
				name: "wallet-storage",
				partialize: (state) => ({
					mnemonic: state.mnemonic,
					wallets: state.wallets,
				}),
				// storage: createJSONStorage(() => sessionStorage),
				// skipHydration: true,
			}
		),
		{ name: "WalletStore" }
	)
);

export const useMnemonic = () => useWalletStore((state) => state.mnemonic);
export const useWallets = () => useWalletStore((state) => state.wallets);
export const useWalletActions = () => useWalletStore((state) => state.actions);

export const rehydrateWalletStore = async () =>
	await useWalletStore.persist.rehydrate();
