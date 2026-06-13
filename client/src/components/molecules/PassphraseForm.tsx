import { PassphraseInput } from "../atoms/PassphraseInput"
import { useState, type KeyboardEvent } from "react"
import { AppButton } from "../atoms/AppButton"

interface Props {
    onSubmit: (passphrase: string) => void
    loading?: boolean
    error?: string | null
}

export const PassphraseForm = ({ onSubmit, loading, error }: Props) => {
    const [passphrase, setPassphrase] = useState("")

    function handleSubmit() {
        if (!passphrase || loading) return
        onSubmit(passphrase)
    }

    function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        if (e.key === "Enter") handleSubmit()
    }

    return (
        <div
            className="surface flex flex-col p-6 rounded-2xl gap-4 w-full shadow-xl shadow-black/20"
            onKeyDown={handleKeyDown}
        >
            <label className="text-xs uppercase tracking-wide text-neutral-content" htmlFor="passphrase">
                Passphrase
            </label>

            <PassphraseInput
                value={passphrase}
                onChange={setPassphrase}
            />

            {error && (
                <p className="text-error text-sm">{error}</p>
            )}

            <AppButton
                onClick={handleSubmit}
                disabled={!passphrase || loading}
                className="btn btn-primary w-full"
            >
                {loading ? "Unlocking…" : "Unlock vault"}
            </AppButton>
        </div>
    )
}

