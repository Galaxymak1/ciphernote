import {getEntry as getEntryRecord, saveEntry} from "../db/entries.store.ts";
import {encryptBytes} from "../crypto/encrypt.ts";
import {serializeJson} from "./serialize.ts";
import {deserializeJson} from "./deserialize.ts";
import {decryptBytes} from "../crypto/decrypt.ts";
import {Vault} from "../vault/vault.ts";
import type {PlainEntry} from "../../types/types.ts";
import type {EntryRecord} from "../db/types.ts";

export class EntriesService {
    private vault: Vault;
    constructor(vault: Vault) {
        this.vault = vault;
    }

    async createEntry(data:PlainEntry) {
        const key = this.vault.getMasterKey()

        const encrypted = await encryptBytes(key, serializeJson(data.value))
        const entry :EntryRecord = {
            id : crypto.randomUUID(),
            ciphertext:encrypted.ciphertext,
            iv:encrypted.iv,
            updatedAt: Date.now(),
            type:data.type
        }
        await saveEntry(entry)
    }

    async getEntry(id: string) {
        const record = await getEntryRecord(id)
        if (!record) {
            throw new Error("No record found")
        }
        const key = this.vault.getMasterKey()
        return deserializeJson(
            await decryptBytes(key, record.ciphertext, record.iv)
        )
    }
}
