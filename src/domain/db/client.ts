// domain/db/client.ts
import {DB_NAME, DB_VERSION, STORES, VAULT_KEY} from "./schema"
import type { VaultRecord, EntryRecord, SyncRecord } from "./types"
import {type DBSchema, openDB} from "idb";

interface SecureNotesDB extends DBSchema {
    vault: {
        key: string
        value: VaultRecord
    }
    entries: {
        key: string
        value: EntryRecord
        indexes: { "by-updatedAt": number }
    }
    sync: {
        key: string
        value: SyncRecord
    }
}

export const db = await openDB<SecureNotesDB>(
    DB_NAME,
    DB_VERSION,
    {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORES.VAULT)) {
                db.createObjectStore(STORES.VAULT, {
                    keyPath: VAULT_KEY
                })
            }

            if (!db.objectStoreNames.contains(STORES.ENTRIES)) {
                const store = db.createObjectStore(STORES.ENTRIES, {
                    keyPath: "id"
                })
                store.createIndex("by-updatedAt", "updatedAt")
            }

            if (!db.objectStoreNames.contains(STORES.SYNC)) {
                db.createObjectStore(STORES.SYNC)
            }
        }
    }
)
