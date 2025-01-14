"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupNodeLedger = exports.setupNodeLocal = exports.setupWebLedger = exports.setupCosmostation = exports.setupWebKeplr = void 0;
/**
 * Setup helper functions
 *
 * These are multiple helper function to get quickly started.
 * There are currently 4 different functions to choose from:
 *  (a) Web / Keplr
 *  (b) Web / Ledger
 *  (c) Node / Local Mnemonic
 *  (d) Node / Ledger
 *  (e) Web / Cosmostation
 */
const amino_1 = require("@cosmjs/amino");
const cosmwasm_stargate_1 = require("@cosmjs/cosmwasm-stargate");
const ledger_amino_1 = require("@cosmjs/ledger-amino");
const proto_signing_1 = require("@cosmjs/proto-signing");
const cosmos_client_1 = require("@cosmostation/cosmos-client");
/**
 * (a) Web / Keplr
 * Prompts keplr and returns a signing client after the user
 * gave permissions.
 *
 * @param config
 * @returns SigningCosmWasmClient
 */
async function setupWebKeplr(config) {
    // check browser compatibility
    if (!window.keplr) {
        throw new Error("Keplr is not supported or installed on this browser!");
    }
    // try to enable keplr with given chainId
    await window.keplr.enable(config.chainId).catch(() => {
        throw new Error("Keplr can't connect to this chainId!");
    });
    const { prefix, gasPrice } = config;
    // Setup signer
    const offlineSigner = await window.getOfflineSignerAuto(config.chainId);
    // Init SigningCosmWasmClient client
    const signingClient = await cosmwasm_stargate_1.SigningCosmWasmClient.connectWithSigner(config.rpcEndpoint, offlineSigner, {
        gasPrice,
    });
    return signingClient;
}
exports.setupWebKeplr = setupWebKeplr;
/**
 * (a) Web / Cosmostation
 * Prompts cosmostation and returns a signing client after the user
 * gave permissions.
 *
 * @param config
 * @returns SigningCosmWasmClient
 */
async function setupCosmostation(config) {
    const { prefix, gasPrice } = config;
    // Setup signer
    const offlineSigner = await (0, cosmos_client_1.getOfflineSigner)(config.chainId);
    // Init SigningCosmWasmClient client
    const signingClient = await cosmwasm_stargate_1.SigningCosmWasmClient.connectWithSigner(config.rpcEndpoint, offlineSigner, {
        gasPrice,
    });
    return signingClient;
}
exports.setupCosmostation = setupCosmostation;
/**
 * (b) Web / Ledger
 * Returns a signing client after the user gave permissions.
 *
 * @param config
 * @returns SigningCosmWasmClient
 */
async function setupWebLedger(config, transport) {
    const { prefix, gasPrice } = config;
    const interactiveTimeout = 120000;
    // Prepare ledger
    const ledgerTransport = await transport.create(interactiveTimeout, interactiveTimeout);
    // Setup signer
    const offlineSigner = new ledger_amino_1.LedgerSigner(ledgerTransport, {
        hdPaths: [(0, amino_1.makeCosmoshubPath)(0)],
        prefix: prefix,
    });
    // Init SigningCosmWasmClient client
    const client = await cosmwasm_stargate_1.SigningCosmWasmClient.connectWithSigner(config.rpcEndpoint, offlineSigner, {
        gasPrice,
    });
    const chainId = await client.getChainId();
    if (chainId !== config.chainId) {
        throw Error("Given ChainId doesn't match the clients ChainID!");
    }
    return client;
}
exports.setupWebLedger = setupWebLedger;
/**
 * (c) Node / Local Mnemonic
 * Using a local mnemonic and returns a signing clien
 *
 * @param config
 * @param mnemonic
 * @returns SigningCosmWasmClient
 */
async function setupNodeLocal(config, mnemonic) {
    const { prefix, gasPrice } = config;
    // Setup signer
    const offlineSigner = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix });
    // Init SigningCosmWasmClient client
    const client = await cosmwasm_stargate_1.SigningCosmWasmClient.connectWithSigner(config.rpcEndpoint, offlineSigner, {
        gasPrice,
    });
    const chainId = await client.getChainId();
    if (chainId !== config.chainId) {
        throw Error("Given ChainId doesn't match the clients ChainID!");
    }
    return client;
}
exports.setupNodeLocal = setupNodeLocal;
/**
 * (d) Node / Ledger
 * Returns a signing client after the user gave permissions.
 *
 * @param config
 * @returns SigningCosmWasmClient
 */
async function setupNodeLedger(config, transport) {
    const { prefix, gasPrice } = config;
    const interactiveTimeout = 120000;
    // Prepare ledger
    const ledgerTransport = await transport.create(interactiveTimeout, interactiveTimeout);
    // Setup signer
    const offlineSigner = new ledger_amino_1.LedgerSigner(ledgerTransport, {
        hdPaths: [(0, amino_1.makeCosmoshubPath)(0)],
        prefix: prefix,
    });
    const client = await cosmwasm_stargate_1.SigningCosmWasmClient.connectWithSigner(config.rpcEndpoint, offlineSigner, {
        gasPrice: gasPrice,
    });
    const chainId = await client.getChainId();
    if (chainId !== config.chainId) {
        throw Error("Given ChainId doesn't match the clients ChainID!");
    }
    return client;
}
exports.setupNodeLedger = setupNodeLedger;
