import {db} from "./client.ts";
import {STORES, VAULT_KEY} from "./schema.ts";
import type {VaultRecord} from "./types.ts";

export const getVault = async () => {
    return await db.get(STORES.VAULT,VAULT_KEY)
}

export const setVault = async (vault : VaultRecord) => {
    await db.put(STORES.VAULT,vault, VAULT_KEY)
}