import type {EncryptedPayload} from "./types.ts";

export async function encryptBytes(masterKey:CryptoKey,plaintextBytes :Uint8Array):Promise<EncryptedPayload>{
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const cipher = await crypto.subtle.encrypt(
        {name: "AES-GCM", iv },
        masterKey,
        plaintextBytes as BufferSource
    );
    return {
        iv: iv,
        ciphertext: cipher
    };
}

export async function wrapMasterKey(
    kek: CryptoKey,
    masterKey: CryptoKey
): Promise<{ wrappedKey: ArrayBuffer; iv: Uint8Array }> {
    const iv = crypto.getRandomValues(new Uint8Array(12))

    const raw = await crypto.subtle.exportKey("raw", masterKey)

    const wrappedKey = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        kek,
        raw
    )

    return { wrappedKey, iv }
}
