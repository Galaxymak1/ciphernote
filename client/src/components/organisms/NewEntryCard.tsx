import { useState } from "react"
import { AppButton } from "../atoms/AppButton"
import { CalendarDaysIcon } from "@heroicons/react/16/solid"
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

    const types: { value: NewEntryPayload["type"]; label: string }[] = [
        { value: "secret", label: "Secret" },
        { value: "api", label: "API key" },
        { value: "note", label: "Note" },
    ]

    return (
        <div className="surface flex flex-col p-6 rounded-2xl gap-5 max-w-md w-full shadow-xl shadow-black/20 animate-rise">
            <h2 className="font-display text-xl font-bold">
                New vault entry
            </h2>

            <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wide text-neutral-content">Entry name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={40}
                    autoComplete="off"
                    spellCheck={false}
                    className="input input-bordered w-full focus:border-primary"
                    placeholder="e.g. Stripe API key"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wide text-neutral-content">Type</label>
                <div className="grid grid-cols-3 gap-2">
                    {types.map((t) => (
                        <button
                            key={t.value}
                            type="button"
                            onClick={() => setType(t.value)}
                            className={`rounded-xl border px-3 py-2 text-sm transition cursor-pointer ${
                                type === t.value
                                    ? "border-primary bg-primary/10 text-primary font-medium"
                                    : "border-base-content/15 text-neutral-content hover:border-base-content/30 hover:text-base-content"
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wide text-neutral-content">Value</label>
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    rows={5}
                    spellCheck={false}
                    className="textarea textarea-bordered w-full resize-none font-mono text-sm focus:border-primary"
                    placeholder="Paste the secret value here"
                />
            </div>

            {(type === "secret" || type === "api") && (
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wide text-neutral-content">
                        Expiration date <span className="normal-case opacity-70">(optional)</span>
                    </label>

                    <button
                        popoverTarget="rdp-popover"
                        className="input input-bordered flex items-center gap-2 text-left"
                        style={{ anchorName: "--rdp" } as React.CSSProperties}
                        type="button"
                    >
                        <CalendarDaysIcon className="h-4 w-4 text-neutral-content" />
                        <span className={expiresAt ? "" : "text-neutral-content/70"}>
                            {expiresAt ? expiresAt.toLocaleDateString() : "Pick a date"}
                        </span>
                        {expiresAt && (
                            <span
                                role="button"
                                tabIndex={0}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setExpiresAt(undefined)
                                }}
                                className="ml-auto text-xs text-neutral-content hover:text-error"
                            >
                                Clear
                            </span>
                        )}
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

            <AppButton
                onClick={handleSubmit}
                disabled={!isValid || loading}
                className="btn btn-primary w-full"
            >
                {loading ? "Saving…" : "Create entry"}
            </AppButton>
        </div>
    )
}
