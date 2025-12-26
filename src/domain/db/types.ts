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
}

export type SyncRecord = {
    id: string
    lastSyncedAt: number
}
