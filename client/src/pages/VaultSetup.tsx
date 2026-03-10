import { PassphraseGenerator } from "../components/organisms/PassphraseGenerator"
import { useState } from "react"
import { Vault } from "../domain/vault/vault"
import { useVaultStore } from "../store/vaultStore"
import { AppButton } from "../components/atoms/AppButton"
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/16/solid"
import {useNavigate} from "react-router";

export const VaultSetup = () => {
    const [passphrase, setPassphrase] = useState("")
    const [confirmed, setConfirmed] = useState(false)
    const [copied, setCopied] = useState(false)
    const navigate = useNavigate()

    const setStatus = useVaultStore((s) => s.setStatus)

    async function handleInit() {
        if (!passphrase || !confirmed) return

        const vault = new Vault()
        await vault.init(passphrase)

        setStatus("locked")
        navigate("/unlock", {replace: true})
    }

    async function handleCopy() {
        if (!passphrase) return

        await navigator.clipboard.writeText(passphrase)
        setCopied(true)

        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <div className="md:pt-40 flex flex-col items-center px-20 h-screen gap-2">
            <h1 className="text-3xl lg:text-4xl text-primary font-bold ">
                Initialize your vault
            </h1>
            <h3 className={"pb-10 text-neutral-content text-md"}>You must initialize your vault before storing any secrets.</h3>

            <div className="bg-base-100 flex flex-col p-6 rounded-lg gap-4 max-w-md w-full">

                <PassphraseGenerator onChange={setPassphrase} />

                <div className="flex items-center justify-between mt-2">

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={confirmed}
                            onChange={(e) => setConfirmed(e.target.checked)}
                        />
                        <span className="text-sm">
                            I have securely stored this passphrase
                        </span>
                    </label>

                    <button
                        type="button"
                        onClick={handleCopy}
                        disabled={!passphrase}
                        className="inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm
                                   border-primary bg-primary text-primary-content
                                   hover:brightness-90 disabled:opacity-50 cursor-pointer"
                    >
                        {copied ? (
                            <>
                                <CheckIcon className="h-4 w-4" />
                                Copied
                            </>
                        ) : (
                            <>
                                <ClipboardDocumentIcon className="h-4 w-4" />
                                Copy
                            </>
                        )}
                    </button>
                </div>

                <p className="text-xs opacity-70">
                    * You will not be able to see this passphrase again.
                </p>

                <AppButton
                    disabled={!confirmed}
                    onClick={handleInit}
                    className="btn btn-primary w-full"
                >
                    Initialize vault
                </AppButton>
            </div>
        </div>
    )
}

export default VaultSetup
