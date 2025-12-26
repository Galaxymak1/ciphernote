export async function generateMasterKey(): Promise<CryptoKey> {
    return crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    )
}
// domain/crypto/deriveKEK.ts
export async function deriveKEK(
    passphrase: string,
    salt: ArrayBuffer
): Promise<CryptoKey> {
    const baseKey = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(passphrase),
        "PBKDF2",
        false,
        ["deriveKey"]
    )

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt : salt,
            iterations: 310_000,
            hash: "SHA-256"
        },
        baseKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    )
}
