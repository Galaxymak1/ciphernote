import type {SyncRecord} from "./types.ts";
import {db} from "./client.ts";
import {STORES, SYNC_KEY} from "./schema.ts";

export async function saveSync(sync: SyncRecord){
    await db.put(STORES.SYNC, sync,SYNC_KEY)
}
export async function getSync(){
    return db.get(STORES.SYNC,SYNC_KEY)
}

