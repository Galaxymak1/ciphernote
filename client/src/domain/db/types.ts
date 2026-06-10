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
    expiresAt?: number
    type: string
    name: string
}

export interface VaultEntryMeta {
    id: string
    name: string
    type: string
    updatedAt: number
    expiresAt?: number
}
