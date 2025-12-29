import {getAllEntries, getEntry as getEntryRecord, saveEntry, deleteEntry as deleteEntryRecord} from "../db/entries.store.ts";
import {encryptBytes} from "../crypto/encrypt.ts";

import {decryptBytes} from "../crypto/decrypt.ts";
import {Vault} from "../vault/vault.ts";
import type {EntryMeta, PlainEntry} from "../../types/types.ts";
import type {EntryRecord} from "../db/types.ts";
import {serializeString} from "./serialize.ts";
import {deserializeString} from "./deserialize.ts";

export class EntriesService {
    private vault: Vault

    constructor(vault: Vault) {
        this.vault = vault
    }

    async createEntry(data: PlainEntry): Promise<string> {
        if (!data.name || !data.type) {
            throw new Error("Missing name or type")
        }

        const key = this.vault.getMasterKey()

        const encrypted = await encryptBytes(
            key,
            serializeString(data.value)
        )

        const entry: EntryRecord = {
            id: crypto.randomUUID(),
            ciphertext: encrypted.ciphertext,
            iv: encrypted.iv,
            updatedAt: Date.now(),
            type: data.type,
            name: data.name
        }

        await saveEntry(entry)
        return entry.id
    }


    async updateEntry(id: string, data: PlainEntry): Promise<void> {
        const record = await getEntryRecord(id)
        if (!record) {
            throw new Error("Entry not found")
        }

        const key = this.vault.getMasterKey()

        const encrypted = await encryptBytes(
            key,
            serializeString(data.value)
        )

        const updated: EntryRecord = {
            ...record,
            ciphertext: encrypted.ciphertext,
            iv: encrypted.iv,
            updatedAt: Date.now(),
            name: data.name ?? record.name,
            type: data.type ?? record.type
        }

        await saveEntry(updated)
    }



    async listEntries(): Promise<EntryMeta[]> {
        const records = await getAllEntries()

        return records.map(r => ({
            id: r.id,
            name: r.name,
            type: r.type,
            updatedAt: r.updatedAt
        }))
    }



    async getDecryptedValue(id: string): Promise<string> {
        const record = await getEntryRecord(id)
        if (!record) {
            throw new Error("Entry not found")
        }

        const key = this.vault.getMasterKey()

        const plaintext = await decryptBytes(
            key,
            record.ciphertext,
            record.iv
        )

        return deserializeString(plaintext)
    }

    async deleteEntry(id: string): Promise<void> {
        await deleteEntryRecord(id)
    }
}

