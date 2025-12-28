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
    salt: Uint8Array,
    iterations:number
): Promise<CryptoKey> {
    if (passphrase.length < 1) {
        throw new Error("Passphrase missing")
    }
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
            salt : salt as unknown as ArrayBuffer,
            iterations: iterations,
            hash: "SHA-256"
        },
        baseKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    )
}
