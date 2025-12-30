import { NoSymbolIcon } from "@heroicons/react/16/solid"
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

    async function handleUnlock(passphrase: string) {
        try {
            setLoading(true)
            setError(null)

            const vault = new Vault()
            console.log(passphrase)
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
            <ToastContainer />
        </div>
    )
}

export default Unlock
