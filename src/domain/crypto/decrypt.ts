
export async function decryptBytes(masterKey : CryptoKey,cipherText: ArrayBuffer,iv:ArrayBuffer): Promise<ArrayBuffer> {
    const plainTextBytes = await crypto.subtle.decrypt(
        {name: "AES-GCN",iv},
        masterKey,
        cipherText,
    )
    return plainTextBytes
}