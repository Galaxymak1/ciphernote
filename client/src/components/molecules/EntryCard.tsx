import { entryTypeMeta, relativeTime, expiryStatus } from "../../utils/entryType"
import { ClockIcon } from "@heroicons/react/16/solid"

interface EntryCardProps {
    name: string
    type: string
    updatedAt: number
    expiresAt?: number
    onClick?: () => void
}

export const EntryCard = ({ name, type, updatedAt, expiresAt, onClick }: EntryCardProps) => {
    const meta = entryTypeMeta(type)
    const { Icon } = meta

    const expiry = expiryStatus(expiresAt)
    const expired = expiry === "expired"
    const expiringSoon = expiry === "soon"

    return (
        <button
            onClick={onClick}
            className="group relative flex w-full flex-col gap-3 rounded-2xl border border-base-content/10 bg-base-100 p-4 text-left transition duration-200
                       hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-black/20
                       focus-visible:border-primary/50 cursor-pointer"
        >
            <div className="flex items-start justify-between gap-2">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${meta.chip} ${meta.icon}`}>
                    <Icon className="h-4.5 w-4.5" />
                </span>
                <span className={`badge badge-outline badge-sm ${meta.badge}`}>
                    {meta.label}
                </span>
            </div>

            <h3 className="font-semibold text-base-content leading-tight line-clamp-2 break-words">
                {name}
            </h3>

            <div className="mt-auto flex items-center justify-between text-xs text-neutral-content">
                <span>Updated {relativeTime(updatedAt)}</span>
                {expiresAt !== undefined && (
                    <span
                        className={`inline-flex items-center gap-1 ${
                            expired
                                ? "text-error"
                                : expiringSoon
                                  ? "text-warning"
                                  : "text-neutral-content"
                        }`}
                    >
                        <ClockIcon className="h-3.5 w-3.5" />
                        {expired
                            ? "Expired"
                            : new Date(expiresAt).toLocaleDateString("en-GB")}
                    </span>
                )}
            </div>
        </button>
    )
}
