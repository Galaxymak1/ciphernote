export interface PlainEntry  {
    type?: string
    value: string
    name?: string
    expiresAt?: number
}

export type EntryMeta = {
    id: string
    name: string
    type: string
    updatedAt: number
}

export type VaultStatus =
    | "loading"
    | "no-vault"
    | "locked"
    | "unlocked"
