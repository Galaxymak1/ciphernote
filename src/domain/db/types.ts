export type VaultRecord = {
    wrappedKey: ArrayBuffer
    iv: Uint8Array
    salt: Uint8Array
    iterations: number
}

export type EntryRecord = {
    id: string
    ciphertext: ArrayBuffer
    iv: Uint8Array
    updatedAt: number
    type: string
    name: string
}

export type SyncRecord = {
    id: string
    lastSyncedAt: number
}


export interface VaultEntryMeta {
    id: string
    name: string
    type: string
    updatedAt: number
}
