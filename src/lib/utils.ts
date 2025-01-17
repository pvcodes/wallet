import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const copyToClipboard = (text: string) => {
	navigator.clipboard.writeText(text);
};

export const truncateString = (str: string) => {
	if (str.length <= 13) return str;
	return `${str.slice(0, 6)}...${str.slice(-4)}`;
};
