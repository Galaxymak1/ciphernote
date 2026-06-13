import { useState } from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid"

interface Props {
    value: string
    onChange: (passphrase: string) => void
}

export const PassphraseInput = ({ value, onChange }: Props) => {
    const [shown, setShown] = useState(false)

    return (
        <div className="flex w-full items-center gap-2 rounded-xl border border-base-content/15 bg-base-200/60 px-3 py-2.5 transition focus-within:border-primary/60 focus-within:bg-base-200">
            <input
                id="passphrase"
                value={value}
                type={shown ? "text" : "password"}
                onChange={(e) => onChange(e.target.value)}
                maxLength={40}
                autoComplete="off"
                spellCheck={false}
                placeholder="your-secret-passphrase"
                className="w-full border-0 bg-transparent font-mono text-sm outline-none placeholder:text-neutral-content/50"
            />

            <button
                type="button"
                aria-label={shown ? "Hide passphrase" : "Show passphrase"}
                onClick={() => setShown((v) => !v)}
                className="shrink-0 text-neutral-content transition hover:text-primary cursor-pointer"
            >
                {shown ? <EyeIcon className="w-5" /> : <EyeSlashIcon className="w-5" />}
            </button>
        </div>
    )
}
