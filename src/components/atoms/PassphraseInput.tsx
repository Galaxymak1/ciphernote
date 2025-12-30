import { useState } from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid"

interface Props {
    value: string
    onChange: (passphrase: string) => void
}

export const PassphraseInput = ({ value, onChange }: Props) => {
    const [shown, setShown] = useState(true)

    return (
        <div className="inline-flex items-center border border-neutral gap-2 rounded-lg p-2">
            <input
                id="passphrase"
                value={value}
                type={shown ? "text" : "password"}
                onChange={(e) => onChange(e.target.value)}
                maxLength={40}
                autoComplete="off"
                spellCheck={false}
                className="border-0 rounded-lg outline-offset-3 min-w-xs outline-primary"
            />

            {shown ? (
                <EyeIcon
                    onClick={() => setShown(false)}
                    className="w-6 cursor-pointer"
                />
            ) : (
                <EyeSlashIcon
                    onClick={() => setShown(true)}
                    className="w-6 cursor-pointer"
                />
            )}
        </div>
    )
}
