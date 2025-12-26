export interface EncryptedPayload {
    iv: Uint8Array,
    ciphertext: ArrayBuffer
}