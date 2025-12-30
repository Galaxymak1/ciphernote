import { PassphraseInput } from "../atoms/PassphraseInput"
import { useState } from "react"
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

    return (
        <div className="bg-base-100 flex flex-col p-6 rounded-lg gap-4 max-w-md w-full items-center">
            <h3 className="text-neutral-content">Enter your passphrase</h3>

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
                {loading ? "Unlocking..." : "Enter"}
            </AppButton>
        </div>
    )
}

