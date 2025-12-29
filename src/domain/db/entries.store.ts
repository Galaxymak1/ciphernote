import type {EntryRecord} from "./types.ts";
import {db} from "./client.ts";
import {STORES} from "./schema.ts";

export async function saveEntry(entry: EntryRecord) {
    await db.put(STORES.ENTRIES, entry)
}

export async function getEntry(id: string) {
    return db.get(STORES.ENTRIES, id)
}

export async function updateEntry(entry:EntryRecord,id:string) {
    await db.put(STORES.ENTRIES,entry,id)
}

export async function deleteEntry(id: string) {
    await db.delete(STORES.ENTRIES, id)
}

export async function getAllEntries() {
    return db.getAll(STORES.ENTRIES)
}
