import {
    getAllEntries,
    getEntry as getEntryRecord,
    saveEntry,
    deleteEntry as deleteEntryRecord,
    getEntry
} from "../db/entries.store.ts";
import {encryptBytes} from "../crypto/encrypt.ts";

import {decryptBytes} from "../crypto/decrypt.ts";
import type { PlainEntry} from "../../types/types.ts";
import type {EntryRecord, VaultEntryMeta} from "../db/types.ts";
import {serializeString} from "./serialize.ts";
import {deserializeString} from "./deserialize.ts";

export class EntriesService {
    private readonly masterKey: CryptoKey | null = null;
    constructor(masterKey: CryptoKey | null = null) {
        this.masterKey = masterKey;
    }

    async createEntry(data: PlainEntry): Promise<string> {
        if (!data.name || !data.type) {
            throw new Error("Missing name or type")
        }
        if (!this.masterKey){
            throw new Error("Missing key")
        }

        const encrypted = await encryptBytes(
            this.masterKey,
            serializeString(data.value)
        )

        const entry: EntryRecord = {
            id: crypto.randomUUID(),
            ciphertext: encrypted.ciphertext,
            iv: encrypted.iv,
            updatedAt: Date.now(),
            type: data.type,
            name: data.name,
            ...(data.expiresAt !== undefined && { expiresAt: data.expiresAt })
        }

        await saveEntry(entry)
        return entry.id
    }


    async updateEntry(id: string, data: PlainEntry): Promise<void> {
        const record = await getEntryRecord(id)
        if (!record) {
            throw new Error("Entry not found")
        }
        if (!this.masterKey){
            throw new Error("Missing key")
        }
        const encrypted = await encryptBytes(
            this.masterKey,
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

    async getEntry(id: string): Promise<EntryRecord> {
        const record = await getEntry(id)
        if (!record) {
            throw new Error("Entry not found")
        }
        return record
    }



    async listEntries(): Promise<VaultEntryMeta[]> {
        const records = await getAllEntries()

        return records.map(r => ({
            id: r.id,
            name: r.name,
            type: r.type,
            updatedAt: r.updatedAt,
            expiresAt: r.expiresAt,
        }))
    }

    async listAllEntries(): Promise<EntryRecord[]> {
        const records = await getAllEntries()

        return records
    }



    async getDecryptedValue(id: string): Promise<string> {
        const record = await getEntryRecord(id)
        if (!record) {
            throw new Error("Entry not found")
        }

        if (!this.masterKey){
            throw new Error("Missing key")
        }
        const plaintext = await decryptBytes(
            this.masterKey,
            record.ciphertext,
            record.iv
        )

        return deserializeString(plaintext)
    }

    async deleteEntry(id: string): Promise<void> {
        await deleteEntryRecord(id)
    }
}

