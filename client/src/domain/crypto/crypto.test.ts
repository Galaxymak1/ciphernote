import { describe, it, expect } from "vitest"

import { generateMasterKey, deriveKEK } from "./kdf"
import { encryptBytes, wrapMasterKey } from "./encrypt"
import { decryptBytes, unwrapMasterKey } from "./decrypt"
import { generateSalt } from "./random"

const enc = (s: string) => new TextEncoder().encode(s)
const dec = (b: ArrayBuffer) => new TextDecoder().decode(b)

const KDF_ITERATIONS = 10_000

describe("encryptBytes / decryptBytes", () => {
    it("round-trips plaintext through AES-GCM", async () => {
        const key = await generateMasterKey()
        const plaintext = "super-secret-api-key-12345"

        const { iv, ciphertext } = await encryptBytes(key, enc(plaintext))
        const decrypted = await decryptBytes(key, ciphertext, iv)

        expect(dec(decrypted)).toBe(plaintext)
    })

    it("round-trips an empty string", async () => {
        const key = await generateMasterKey()
        const { iv, ciphertext } = await encryptBytes(key, enc(""))
        expect(dec(await decryptBytes(key, ciphertext, iv))).toBe("")
    })

    it("produces a fresh 12-byte IV and never emits plaintext as ciphertext", async () => {
        const key = await generateMasterKey()
        const plaintext = "do-not-leak-me"

        const a = await encryptBytes(key, enc(plaintext))
        const b = await encryptBytes(key, enc(plaintext))

        expect(a.iv.byteLength).toBe(12)
        // Random IV => same plaintext encrypts to different ciphertext each time.
        expect(new Uint8Array(a.ciphertext)).not.toEqual(new Uint8Array(b.ciphertext))
        // The ciphertext must not contain the raw plaintext bytes.
        expect(dec(a.ciphertext)).not.toContain(plaintext)
    })

    it("fails to decrypt when the ciphertext is tampered with", async () => {
        const key = await generateMasterKey()
        const { iv, ciphertext } = await encryptBytes(key, enc("integrity-matters"))

        const tampered = new Uint8Array(ciphertext)
        tampered[0] ^= 0xff // flip a byte -> GCM auth tag check must fail

        await expect(decryptBytes(key, tampered.buffer, iv)).rejects.toThrow()
    })

    it("fails to decrypt with a different key", async () => {
        const key = await generateMasterKey()
        const otherKey = await generateMasterKey()
        const { iv, ciphertext } = await encryptBytes(key, enc("wrong-key-test"))

        await expect(decryptBytes(otherKey, ciphertext, iv)).rejects.toThrow()
    })
})

describe("deriveKEK", () => {
    it("derives the same key for the same passphrase + salt + iterations", async () => {
        const salt = generateSalt()
        const kek1 = await deriveKEK("correct horse battery staple", salt, KDF_ITERATIONS)
        const kek2 = await deriveKEK("correct horse battery staple", salt, KDF_ITERATIONS)

        // The derived KEKs must be functionally identical: a payload wrapped with
        // one must unwrap with the other.
        const master = await generateMasterKey()
        const { wrappedKey, iv } = await wrapMasterKey(kek1, master)
        await expect(unwrapMasterKey(kek2, wrappedKey, iv)).resolves.toBeDefined()
    })

    it("rejects an empty passphrase", async () => {
        await expect(deriveKEK("", generateSalt(), KDF_ITERATIONS)).rejects.toThrow(
            /passphrase/i
        )
    })
})

describe("wrapMasterKey / unwrapMasterKey (vault flow)", () => {
    it("unlocks the master key with the correct passphrase and decrypts data", async () => {
        const passphrase = "a-strong-passphrase"
        const salt = generateSalt()

        // --- setup: create a vault ---
        const masterKey = await generateMasterKey()
        const kek = await deriveKEK(passphrase, salt, KDF_ITERATIONS)
        const { wrappedKey, iv } = await wrapMasterKey(kek, masterKey)

        // Encrypt an entry with the original master key.
        const secret = "ghp_exampleGitHubTokenValue"
        const entry = await encryptBytes(masterKey, enc(secret))

        // --- unlock: re-derive KEK from passphrase, unwrap, decrypt ---
        const kekAgain = await deriveKEK(passphrase, salt, KDF_ITERATIONS)
        const unwrapped = await unwrapMasterKey(kekAgain, wrappedKey, iv)
        const decrypted = await decryptBytes(unwrapped, entry.ciphertext, entry.iv)

        expect(dec(decrypted)).toBe(secret)
    })

    it("fails to unwrap the master key with the wrong passphrase", async () => {
        const salt = generateSalt()
        const masterKey = await generateMasterKey()
        const kek = await deriveKEK("right-passphrase", salt, KDF_ITERATIONS)
        const { wrappedKey, iv } = await wrapMasterKey(kek, masterKey)

        const wrongKek = await deriveKEK("wrong-passphrase", salt, KDF_ITERATIONS)
        await expect(unwrapMasterKey(wrongKek, wrappedKey, iv)).rejects.toThrow()
    })

    it("fails to unwrap when the salt differs (wrong KDF input)", async () => {
        const masterKey = await generateMasterKey()
        const kek = await deriveKEK("same-passphrase", generateSalt(), KDF_ITERATIONS)
        const { wrappedKey, iv } = await wrapMasterKey(kek, masterKey)

        const kekDifferentSalt = await deriveKEK(
            "same-passphrase",
            generateSalt(),
            KDF_ITERATIONS
        )
        await expect(
            unwrapMasterKey(kekDifferentSalt, wrappedKey, iv)
        ).rejects.toThrow()
    })
})

describe("generateSalt", () => {
    it("returns 16 random bytes that differ between calls", () => {
        const a = generateSalt()
        const b = generateSalt()
        expect(a.byteLength).toBe(16)
        expect(b.byteLength).toBe(16)
        expect(a).not.toEqual(b)
    })
})
