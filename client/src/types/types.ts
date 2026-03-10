export interface PlainEntry  {
    type?: string
    value: string
    name?: string
    expiresAt?: number
}


export type VaultStatus =
    | "loading"
    | "no-vault"
    | "locked"
    | "unlocked"
