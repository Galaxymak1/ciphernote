import { useState } from "react"
import { AppButton } from "../atoms/AppButton"
import "cally"
import { DayPicker } from "react-day-picker"

export type NewEntryPayload = {
    name: string
    value: string
    type: "secret" | "api" | "note"
    expiresAt?: number
}

interface Props {
    onSubmit: (entry: NewEntryPayload) => void
    loading?: boolean
}

export const NewEntryCard = ({ onSubmit, loading }: Props) => {
    const [name, setName] = useState("")
    const [value, setValue] = useState("")
    const [type, setType] = useState<NewEntryPayload["type"]>("secret")
    const [expiresAt, setExpiresAt] = useState<Date | undefined>(undefined)

    const isValid = name.trim().length > 0 && value.trim().length > 0

    function handleDateChange(date: Date | undefined) {
        setExpiresAt(date)
    }

    function handleSubmit() {
        if (!isValid || loading) return

        onSubmit({
            name: name.trim(),
            value,
            type,
            ...(expiresAt && { expiresAt: expiresAt.getTime() })
        })
    }

    return (
        <div className="bg-base-100 flex flex-col p-6 rounded-lg gap-4 max-w-md w-full">
            <h2 className="text-xl font-semibold text-primary">
                New vault entry
            </h2>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-neutral-content">Entry name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={40}
                    autoComplete="off"
                    spellCheck={false}
                    className="input input-bordered w-full"
                    placeholder="e.g. Stripe API key"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-neutral-content">Type</label>
                <select
                    value={type}
                    onChange={(e) =>
                        setType(e.target.value as NewEntryPayload["type"])
                    }
                    className="select select-bordered w-full"
                >
                    <option value="secret">Secret</option>
                    <option value="api">API key</option>
                    <option value="note">Note</option>
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm text-neutral-content">Value</label>
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    rows={5}
                    spellCheck={false}
                    className="textarea textarea-bordered w-full resize-none font-mono"
                    placeholder="Paste the secret value here"
                />
            </div>

            {(type === "secret" || type === "api") && (
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-neutral-content">
                        Expiration date (optional)
                    </label>

                    <button
                        popoverTarget="rdp-popover"
                        className="input input-bordered text-left"
                        style={{ anchorName: "--rdp" } as React.CSSProperties}
                        type="button"
                    >
                        {expiresAt
                            ? expiresAt.toLocaleDateString()
                            : "Pick a date"}
                    </button>

                    <div
                        popover="auto"
                        id="rdp-popover"
                        className="dropdown "
                        style={{ positionAnchor: "--rdp" } as React.CSSProperties}
                    >
                        <DayPicker
                            className="react-day-picker"
                            mode="single"
                            selected={expiresAt}
                            onSelect={handleDateChange}
                        />
                    </div>
                </div>
            )}

            <div className="pt-2">
                <AppButton
                    onClick={handleSubmit}
                    disabled={!isValid || loading}
                    className="btn btn-primary w-full"
                >
                    {loading ? "Saving..." : "Create entry"}
                </AppButton>
            </div>
        </div>
    )
}
