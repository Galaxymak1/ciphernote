import { PassphraseGenerator } from "../components/organisms/PassphraseGenerator"
import { useState } from "react"
import { Vault } from "../domain/vault/vault"
import { useVaultStore } from "../store/vaultStore"
import { AppButton } from "../components/atoms/AppButton"
import { Brand } from "../components/atoms/Brand"
import { ClipboardDocumentIcon, CheckIcon, ShieldCheckIcon } from "@heroicons/react/16/solid"
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
        <div className="bg-vault min-h-screen flex flex-col items-center justify-center gap-6 px-4 py-12">
            <header className="flex flex-col items-center gap-4 text-center animate-rise">
                <Brand size="lg" />
                <div className="space-y-1">
                    <h1 className="text-3xl lg:text-4xl font-bold">
                        Create your vault
                    </h1>
                    <p className="text-sm text-neutral-content max-w-sm">
                        This passphrase is the only key to your data. Save it
                        somewhere safe — it can never be recovered.
                    </p>
                </div>
            </header>

            <div className="surface flex flex-col p-6 rounded-2xl gap-4 max-w-md w-full shadow-xl shadow-black/20 animate-rise" style={{ animationDelay: "90ms" }}>

                <div className="flex items-center justify-between">
                    <label className="text-xs uppercase tracking-wide text-neutral-content">
                        Generated passphrase
                    </label>
                    <button
                        type="button"
                        onClick={handleCopy}
                        disabled={!passphrase}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium
                                   bg-primary/10 text-primary transition
                                   hover:bg-primary/20 disabled:opacity-40 cursor-pointer"
                    >
                        {copied ? (
                            <>
                                <CheckIcon className="h-3.5 w-3.5" />
                                Copied
                            </>
                        ) : (
                            <>
                                <ClipboardDocumentIcon className="h-3.5 w-3.5" />
                                Copy
                            </>
                        )}
                    </button>
                </div>

                <PassphraseGenerator onChange={setPassphrase} />

                <label className="flex items-start gap-2.5 cursor-pointer select-none rounded-xl border border-base-content/10 bg-base-200/40 p-3 transition hover:border-base-content/20">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm mt-0.5"
                        checked={confirmed}
                        onChange={(e) => setConfirmed(e.target.checked)}
                    />
                    <span className="text-sm leading-snug">
                        I have securely stored this passphrase.
                        <span className="block text-xs text-neutral-content">
                            It won't be shown again after this step.
                        </span>
                    </span>
                </label>

                <AppButton
                    disabled={!confirmed}
                    onClick={handleInit}
                    className="btn btn-primary w-full"
                >
                    <ShieldCheckIcon className="w-5" />
                    Initialize vault
                </AppButton>
            </div>
        </div>
    )
}

export default VaultSetup
