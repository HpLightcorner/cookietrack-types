/*!
 * CookieTrack Types
 * MIT License
 * Copyright (c) 2022 Ncookie & Trevor Richard
 * See LICENSE for more details
 */

/* ========================================================================================================================================================================= */

// Basic Types:
export type Chain = 'eth' | 'bsc' | 'poly' | 'ftm' | 'avax' | 'one' | 'sol' | 'terra' | 'cronos'| 'pulsechain';
export type ChainID = 1 | 56 | 137 | 250 | 43114 | 1666600000;
export type URL = `https://${string}`;
export type Address = `0x${string}`;
export type SolAddress = string;
export type TerraAddress = `terra1${string}`;
export type TokenType = 'nativeToken' | 'token' | 'lpToken' | 'debt' | 'xToken';
export type TokenStatus = 'none' | 'staked' | 'liquidity' | 'lent' | 'borrowed' | 'unclaimed';
export type TXType = 'transfer' | 'approve' | 'revoke';
export type Hash = `0x${string}`;

// Records:
export const ChainEndpoint: Record<Chain, string> = {
    eth: "ethereum",
    bsc: "bsc",
    poly: "polygon",
    ftm: "fantom",
    avax: "avalanche",
    one: "harmony",
    sol: "solana",
    terra: "terra",
    cronos: "cronos",
    pulsechain: "pulsechain"
};

/* ========================================================================================================================================================================= */

// Token Interfaces:
export interface BaseToken {
    symbol: string
    address: Address | SolAddress | TerraAddress
    balance: number
}
export interface PricedToken extends BaseToken {
    price: number
    logo: URL
}
export interface OwnedToken extends BaseToken {
    type: TokenType
    chain: Chain
    location: string
    status: TokenStatus
    owner: Address | SolAddress | TerraAddress
}
export interface NativeToken extends OwnedToken, PricedToken {
    type: 'nativeToken'
}
export interface Token extends OwnedToken, PricedToken {
    type: 'token'
}
export interface LPToken extends OwnedToken {
    type: 'lpToken'
    token0: PricedToken
    token1: PricedToken
}
export interface DebtToken extends OwnedToken, PricedToken {
    type: 'debt'
}
export interface XToken extends OwnedToken {
    type: 'xToken'
    logo: URL
    underlyingToken: PricedToken
}

// Token Type Guards:
export function isNativeToken(token: OwnedToken): token is NativeToken {
    return token.type === 'nativeToken';
}
export function isToken(token: OwnedToken): token is Token {
    return token.type === 'token';
}
export function isLPToken(token: OwnedToken): token is LPToken {
    return token.type === 'lpToken';
}
export function isDebtToken(token: OwnedToken): token is DebtToken {
    return token.type === 'debt';
}
export function isXToken(token: OwnedToken): token is XToken {
    return token.type === 'xToken';
}

/* ========================================================================================================================================================================= */

// Transaction Interfaces:
export interface SimpleTX {
    wallet: Address
    chain: Chain
    hash: Hash
    time: number
    direction: 'in' | 'out'
    fee: number
}
export interface DetailedTX extends SimpleTX {
    type: TXType
    token: TXToken
    nativeToken: string
}
export interface ApprovalTX extends DetailedTX {
    type: 'approve' | 'revoke'
}
export interface TransferTX extends DetailedTX {
    type: 'transfer'
    from: Address
    to: Address
    value: number
    contract: boolean
}
export interface TaxApprovalTX extends ApprovalTX {
    token: TXToken
    nativeTokenPrice: number
}
export interface TaxTransferTX extends TransferTX {
    token: TaxTXToken
    nativeTokenPrice: number
}
export interface TXToken {
    address: Address
    symbol: string
    logo: URL
}
export interface TaxTXToken extends TXToken {
    price: number
}

// Transaction Type Guards:
export function isApprovalTX(tx: DetailedTX): tx is ApprovalTX {
    return (tx.type === 'approve' || tx.type === 'revoke');
}
export function isTransferTX(tx: DetailedTX): tx is TransferTX {
    return tx.type === 'transfer';
}

/* ========================================================================================================================================================================= */

// ABI Interfaces:
export interface ABI {
    constant: true
    inputs: (ABIIO | ABITupleIO)[]
    name: string
    outputs: (ABIIO | ABITupleIO)[]
    type: 'function'
}
export interface ABIIO {
    name: string
    type: string
}
export interface ABITupleIO {
    type: 'tuple[]'
    components: ABIIO[]
}

/* ========================================================================================================================================================================= */

// Chain Data Interface:
export interface ChainData {
    id: ChainID
    token: string
    cgID: string
    nativeID: string
    wrappedToken: Address
    usdc: Address
    usdcDecimals: number
    inch: boolean
    paraswap: boolean
}

/* ========================================================================================================================================================================= */

// Chain Token Data Interface:
export interface BaseChainTokenData {
    logos: LogoData[]
}
export interface ChainTokenData extends BaseChainTokenData {
    tokens: TokenData[]
    blacklist: Address[]
}
export interface SolChainTokenData extends BaseChainTokenData {
    tokens: SolTokenData[]
    blacklist: SolAddress[]
}
export interface TerraChainTokenData extends BaseChainTokenData {
    tokens: TerraTokenData[]
    blacklist: TerraAddress[]
}
export interface TokenData {
    address: Address
    symbol: string
    logo: URL
    decimals: number
}
export interface SolTokenData {
    address: SolAddress
    symbol: string
    logo: URL
    decimals: number
}
export interface TerraTokenData {
    address: TerraAddress
    symbol: string
    logo: URL
    decimals: number
}
export interface LogoData {
    symbol: string
    logo: URL
}

/* ========================================================================================================================================================================= */

// API Response Interface:
export interface APIResponse {
    status: 'ok' | 'error'
    data: any[]
    request: string
}