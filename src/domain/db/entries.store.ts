import type {EntryRecord} from "./types.ts";
import {db} from "./client.ts";
import {STORES} from "./schema.ts";

export async function saveEntry(entry: EntryRecord) {
    await db.put(STORES.ENTRIES, entry)
}

export async function getEntry(id: string) {
    return db.get(STORES.ENTRIES, id)
}

export async function listEntries() {
    return db.getAll(STORES.ENTRIES)
}
