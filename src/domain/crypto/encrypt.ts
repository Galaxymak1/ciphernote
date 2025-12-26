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