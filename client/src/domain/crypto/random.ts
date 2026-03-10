import {loadWordList} from "../../utils/helpers.ts";

export async function generatePassphrase(
    wordCount = 6
): Promise<string> {
    const WORDS = await loadWordList()
    if (WORDS.length < 2048) {
        throw new Error("Wordlist too small")
    }

    const random = new Uint32Array(wordCount)
    crypto.getRandomValues(random)

    const words = Array.from(random, (n) =>
        WORDS[n % WORDS.length]
    )

    return words.join("-")
}

export function generateSalt(): Uint8Array {
    return crypto.getRandomValues(new Uint8Array(16))
}
