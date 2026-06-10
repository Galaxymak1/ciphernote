import { db } from "./client.ts";
import { STORES } from "./schema.ts";

/**
 * Permanently wipes all locally-stored vault data (the wrapped master key and
 * every encrypted entry). Because Ciphernote is zero-knowledge, a forgotten
 * passphrase makes the data unrecoverable — this is the only way back to a
 * clean slate without manually clearing the browser's IndexedDB.
 */
export async function wipeAllData(): Promise<void> {
    await db.clear(STORES.VAULT)
    await db.clear(STORES.ENTRIES)
}
