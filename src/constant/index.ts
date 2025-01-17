export const Tokens = ["BTC", "ETH", "SOL"] as const;

export type TokenType = typeof Tokens[number];