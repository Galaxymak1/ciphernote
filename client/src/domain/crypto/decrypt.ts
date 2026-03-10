
export async function decryptBytes(
    masterKey: CryptoKey,
    cipherText: ArrayBuffer,
    iv: Uint8Array
): Promise<ArrayBuffer> {

    return crypto.subtle.decrypt(
        { name: "AES-GCM", iv:iv  as unknown as BufferSource },
        masterKey,
        cipherText
    )
}

export async function unwrapMasterKey(
    kek: CryptoKey,
    wrappedKey: ArrayBuffer,
    iv: Uint8Array
): Promise<CryptoKey> {
    const raw = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv  as unknown as BufferSource },
        kek,
        wrappedKey
    )

    return crypto.subtle.importKey(
        "raw",
        raw,
        "AES-GCM",
        false,
        ["encrypt", "decrypt"]
    )
}
