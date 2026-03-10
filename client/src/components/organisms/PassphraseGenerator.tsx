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
        regenerate()
    }, [])

    return (

            <div className="flex flex-row items-center gap-2">
                <PassphraseField passphrase={passphrase} />
                <ArrowPathIcon
                    className="h-6 cursor-pointer text-primary"
                    onClick={regenerate}
                />
            </div>
    )
}
