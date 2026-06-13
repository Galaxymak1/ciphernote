import { PassphraseField } from "../atoms/PassphraseField"
import { useEffect, useState } from "react"
import { ArrowPathIcon } from "@heroicons/react/16/solid"
import { generatePassphrase } from "../../domain/crypto/random"

interface Props {
    onChange: (passphrase: string) => void
}

export const PassphraseGenerator = ({ onChange }: Props) => {
    const [passphrase, setPassphrase] = useState("")

    async function regenerate() {
        for (let i = 0; i < 4; i++) {
            const next = await generatePassphrase()
            setPassphrase(next)
            onChange(next)
            await new Promise((r) => setTimeout(r, 150))
        }
    }

    useEffect(() => {
        // Kick off the animated passphrase reveal once on mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        regenerate()
    }, [])

    return (
        <div className="flex flex-row items-center gap-2">
            <PassphraseField passphrase={passphrase} />
            <button
                type="button"
                aria-label="Generate a new passphrase"
                onClick={regenerate}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-base-content/15 bg-base-200/60 text-primary transition hover:border-primary/50 hover:bg-base-200 active:rotate-180 active:duration-300 cursor-pointer"
            >
                <ArrowPathIcon className="h-5" />
            </button>
        </div>
    )
}
