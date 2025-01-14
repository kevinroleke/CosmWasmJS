import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
/**
 * All setup functions are using the same config pattern
 */
interface Config {
    chainId: string;
    rpcEndpoint: string;
    prefix: string;
    gasPrice?: GasPrice;
}
/**
 * (a) Web / Keplr
 * Prompts keplr and returns a signing client after the user
 * gave permissions.
 *
 * @param config
 * @returns SigningCosmWasmClient
 */
export declare function setupWebKeplr(config: Config): Promise<SigningCosmWasmClient>;
/**
 * (a) Web / Cosmostation
 * Prompts cosmostation and returns a signing client after the user
 * gave permissions.
 *
 * @param config
 * @returns SigningCosmWasmClient
 */
export declare function setupCosmostation(config: Config): Promise<SigningCosmWasmClient>;
/**
 * (b) Web / Ledger
 * Returns a signing client after the user gave permissions.
 *
 * @param config
 * @returns SigningCosmWasmClient
 */
export declare function setupWebLedger(config: Config, transport: any): Promise<SigningCosmWasmClient>;
/**
 * (c) Node / Local Mnemonic
 * Using a local mnemonic and returns a signing clien
 *
 * @param config
 * @param mnemonic
 * @returns SigningCosmWasmClient
 */
export declare function setupNodeLocal(config: Config, mnemonic: string): Promise<SigningCosmWasmClient>;
/**
 * (d) Node / Ledger
 * Returns a signing client after the user gave permissions.
 *
 * @param config
 * @returns SigningCosmWasmClient
 */
export declare function setupNodeLedger(config: Config, transport: any): Promise<SigningCosmWasmClient>;
export {};
