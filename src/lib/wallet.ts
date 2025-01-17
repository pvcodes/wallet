import * as bip39 from "bip39";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import * as ethers from "ethers";
import * as bitcoin from "bitcoinjs-lib";
import { BIP32Factory } from "bip32";
// import * as ecc from "tiny-secp256k1";
import ecc from "@bitcoinerlab/secp256k1";

import { TokenType } from "@/constant";
import { Wallet } from "@/interface";

const bip32 = BIP32Factory(ecc);

export const generateMnemonic = () => bip39.generateMnemonic();

export const createWallet = async (
	mnemonic: string,
	token: TokenType,
	index: string
) => {
	if (!bip39.validateMnemonic(mnemonic)) {
		throw new Error("Invalid mnemonic phrase");
	}

	const seed = await bip39.mnemonicToSeed(mnemonic);

	switch (token) {
		case "BTC": {
			const path = `m/44'/0'/0'/0/${index}`;
			const root = bip32.fromSeed(seed);
			const child = root.derivePath(path);

			if (!child.privateKey) {
				throw new Error("Failed to generate Bitcoin private key");
			}

			const { address } = bitcoin.payments.p2pkh({
				pubkey: Buffer.from(child.publicKey),
				network: bitcoin.networks.bitcoin,
			});

			return {
				address: address,
				privateKey: Buffer.from(child.privateKey).toString("hex"),
				publicKey: Buffer.from(child.publicKey).toString("hex"),
				path,
			} as Wallet;
		}

		case "ETH": {
			const path = `m/44'/60'/0'/0/${index}`;
			const hdNode = ethers.HDNodeWallet.fromSeed(seed);
			const wallet = hdNode.derivePath(path);

			return {
				address: wallet.address,
				privateKey: wallet.privateKey,
				publicKey: wallet.publicKey,
				path,
			} as Wallet;
		}

		case "SOL": {
			const path = `m/44'/501'/${index}'/0'`;
			const derivedSeed = derivePath(path, seed.toString("hex")).key;
			const keypair = Keypair.fromSeed(derivedSeed);
			const privateKey = Buffer.from(
				keypair.secretKey.slice(0, 32)
			).toString("hex");

			return {
				address: keypair.publicKey.toString(),
				privateKey,
				publicKey: keypair.publicKey.toBuffer().toString("hex"),
				path,
			} as Wallet;
		}

		default:
			throw new Error(`Unsupported token type: ${token}`);
	}
};
// export async function getKeyCreatedBySolanaKeygenFromMnemonic(
// 	mnemonic: string
// ) {
// 	const seed = await bip39.mnemonicToSeed(mnemonic);
// 	const seedBuffer = Buffer.from(seed).toString("hex");

// 	const path44Change = `m/44'/501'/0'/0'`;
// 	const derivedSeed = derivePath(path44Change, seedBuffer).key;
// 	const kp = Keypair.fromSeed(derivedSeed);
// 	// return {
// 	// 	publicKey: kp.publicKey.toBuffer(),
// 	// 	secretKey: kp.secretKey.slice(0, 32),
// 	// };
// 	return kp;
// }

// export const fetchWalletsFromMnemonic = async (mnemonic: string) => {
// 	//
// 	if (!bip39.validateMnemonic(mnemonic)) {
// 		throw new Error("Invalid mnemonic");
// 	}

// 	//
// 	const seed = await bip39.mnemonicToSeed(mnemonic);
// 	const ethHdNode = ethers.HDNodeWallet.fromSeed(seed);
// };

// export async function deriveWallets(mnemonic: string, numWallets = 5) {
// 	// Validate mnemonic
// 	if (!bip39.validateMnemonic(mnemonic)) {
// 		throw new Error("Invalid mnemonic");
// 	}
// 	// Generate seed from mnemonic
// 	const seed = await bip39.mnemonicToSeed(mnemonic);

// 	// Derive Ethereum wallets
// 	const ethWallets = [];
// 	const ethHdNode = ethers.HDNodeWallet.fromSeed(seed);

// 	for (let i = 0; i < numWallets; i++) {
// 		// m/44'/60'/0'/0/i is the standard derivation path for ETH
// 		const path = `m/44'/60'/0'/0/${i}`;
// 		const wallet = ethHdNode.derivePath(path);
// 		ethWallets.push({
// 			address: wallet.address,
// 			privateKey: wallet.privateKey,
// 			path: path,
// 		});
// 	}

// 	// Derive Solana wallets
// 	2;

// 	return {
// 		ETH: ethWallets,
// 		SOL: solWallets,
// 	};
// }
