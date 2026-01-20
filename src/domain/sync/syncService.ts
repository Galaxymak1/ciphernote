import type {SyncRecord} from "../db/types.ts";
import {getSync} from "../db/sync.store.ts";

export class SyncService {
    async getSync(): Promise<SyncRecord> {
        const record = await getSync()
        if (!record) {
            throw new Error("Entry not found")
        }
        return record
    }
}