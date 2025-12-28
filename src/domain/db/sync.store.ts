import type {SyncRecord} from "./types.ts";
import {db} from "./client.ts";
import {STORES} from "./schema.ts";

export async function saveSync(sync: SyncRecord){
    await db.put(STORES.SYNC, sync)
}

export async function listSync(){
    return db.getAll(STORES.SYNC)
}