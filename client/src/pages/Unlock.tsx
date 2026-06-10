import { ExclamationTriangleIcon, NoSymbolIcon } from "@heroicons/react/16/solid"
import { PassphraseForm } from "../components/molecules/PassphraseForm"
import { Vault } from "../domain/vault/vault"
import { useVaultStore } from "../store/vaultStore"
import { useState } from "react"
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router";

export const Unlock = () => {
    const setStatus = useVaultStore((s) => s.setStatus)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showReset, setShowReset] = useState(false)
    const [resetting, setResetting] = useState(false)

    async function handleUnlock(passphrase: string) {
        try {
            setLoading(true)
            setError(null)

            const vault = new Vault()
            await vault.unlock(passphrase)

            setStatus("unlocked")
            navigate("/vault", { replace: true })
        } catch {
            toast("Invalid passphrase",{
                type: "error",
                theme: "dark",
                style:{"backgroundColor":"var(--color-base-100)"},
                position:"top-center",
                delay: 200,
            })
            setError("")
        } finally {
            setLoading(false)
        }
    }

    async function handleReset() {
        try {
            setResetting(true)
            await new Vault().reset()
            toast("Vault reset. Create a new one to get started.", {
                type: "info",
                theme: "dark",
                position: "top-center",
            })
            navigate("/setup", { replace: true })
        } catch {
            toast("Could not reset the vault", { type: "error", theme: "dark" })
        } finally {
            setResetting(false)
            setShowReset(false)
        }
    }

    return (
        <div className="md:pt-40 flex flex-col items-center px-20 h-screen gap-4">
            <div className="inline-flex gap-2 items-center">
                <h1 className="text-3xl lg:text-4xl font-bold text-primary">
                    Your vault is locked
                </h1>
                <NoSymbolIcon className="w-12 text-primary" />
            </div>

            <PassphraseForm
                onSubmit={handleUnlock}
                loading={loading}
                error={error}
            />

            <button
                type="button"
                className="btn btn-link btn-sm text-neutral-content no-underline"
                onClick={() => setShowReset(true)}
            >
                Forgot your passphrase?
            </button>

            {showReset && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="inline-flex items-center gap-2 text-lg font-bold text-error">
                            <ExclamationTriangleIcon className="w-6" />
                            Reset vault?
                        </h3>
                        <p className="py-4 text-sm">
                            Ciphernote is zero-knowledge: without your passphrase,
                            your data <strong>cannot be recovered</strong>. Resetting
                            permanently erases the vault and <strong>all entries</strong>{" "}
                            from this browser so you can start fresh.
                        </p>
                        <p className="text-sm font-semibold">
                            This action cannot be undone.
                        </p>
                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={() => setShowReset(false)}
                                disabled={resetting}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-error"
                                onClick={handleReset}
                                disabled={resetting}
                            >
                                {resetting ? "Resetting…" : "Erase everything"}
                            </button>
                        </div>
                    </div>
                    <div
                        className="modal-backdrop"
                        onClick={() => !resetting && setShowReset(false)}
                    />
                </div>
            )}

            <ToastContainer />
        </div>
    )
}

export default Unlock
