import {getVault, setVault} from "../db/vault.store.ts";
import {deriveKEK, generateMasterKey} from "../crypto/kdf.ts";
import {generateSalt} from "../crypto/random.ts";
import {wrapMasterKey} from "../crypto/encrypt.ts";
import {unwrapMasterKey} from "../crypto/decrypt.ts";
import { useVaultStore} from "../../store/vaultStore.ts";

const KDF_ITERATIONS = 310_000

export class Vault {
    async init(passphrase: string) {
        if (await getVault()) {
            throw new Error("Vault already initialized")
        }

        const masterKey = await generateMasterKey()
        const salt = generateSalt()

        const kek = await deriveKEK(passphrase, salt, KDF_ITERATIONS)
        const encryptedMaster = await wrapMasterKey(kek, masterKey)

        await setVault({
            wrappedKey: encryptedMaster.wrappedKey,
            iv: encryptedMaster.iv,
            salt,
            iterations: KDF_ITERATIONS
        })
    }

    async unlock(passphrase: string) {
        const vault = await getVault()
        if (!vault) {
            throw new Error("Vault not initialized")
        }

        try {
            const kek = await deriveKEK(
                passphrase,
                vault.salt,
                vault.iterations
            )

            const masterKey = await unwrapMasterKey(
                kek,
                vault.wrappedKey,
                vault.iv
            )
            useVaultStore.getState().setMasterKey(masterKey)

        } catch {
            throw new Error("Invalid passphrase")
        }
    }

    getMasterKey(): CryptoKey {
        const masterKey = useVaultStore.getState().masterKey
        if (!masterKey) {
            throw new Error("Vault is locked")
        }
        return masterKey
    }

    lock() {
        useVaultStore.getState().clearMasterKey()
    }
}
