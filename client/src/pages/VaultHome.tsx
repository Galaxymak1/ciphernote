import {useEffect, useMemo, useState} from "react"
import {EntriesService} from "../domain/entries/entriesService.ts";
import {EntryCard} from "../components/molecules/EntryCard.tsx";
import type {VaultEntryMeta} from "../domain/db/types.ts";
import {useNavigate, useSearchParams} from "react-router";
import {MagnifyingGlassIcon, PlusIcon, InboxIcon} from "@heroicons/react/16/solid";

const TITLES: Record<string, string> = {
    secret: "Secrets",
    api: "API keys",
    note: "Notes",
}

export const VaultHome = () => {
    const [entries, setEntries] = useState<VaultEntryMeta[]>([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState("")
    const [now] = useState(() => Date.now())
    const entryService = useMemo(() => new EntriesService(), [])
    const navigate = useNavigate()
    const [params] = useSearchParams();

    const type = params.get("type");
    const expiring = params.get("expiring");

    const heading = expiring === "soon" ? "Expiring soon" : (type && TITLES[type]) || "All entries"

    const filteredEntries = entries.filter(entry => {
        if (type && entry.type !== type) return false;

        if (expiring === "soon") {
            if (!entry.expiresAt) return false;
            const in7Days = now + 7 * 24 * 60 * 60 * 1000;
            if (entry.expiresAt > in7Days) return false;
        }

        if (query.trim() && !entry.name.toLowerCase().includes(query.trim().toLowerCase())) {
            return false;
        }

        return true;
    });

    useEffect(() => {
        async function load() {
            const all = await entryService.listEntries()
            setEntries(all)
            setLoading(false)
        }
        load()
    }, [entryService])

    if (loading) {
        return (
            <div className="mx-auto max-w-5xl p-2 sm:p-4">
                <div className="mb-6 h-8 w-48 animate-pulse rounded-lg bg-base-content/10" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({length: 6}).map((_, i) => (
                        <div key={i} className="h-36 animate-pulse rounded-2xl bg-base-content/5 border border-base-content/10" />
                    ))}
                </div>
            </div>
        )
    }

    const isEmptyVault = entries.length === 0

    return (
        <div className="mx-auto max-w-5xl p-2 sm:p-4">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-display text-2xl font-bold">{heading}</h1>
                    <p className="text-sm text-neutral-content">
                        {filteredEntries.length}{" "}
                        {filteredEntries.length === 1 ? "entry" : "entries"}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {!isEmptyVault && (
                        <label className="flex w-full items-center gap-2 rounded-xl border border-base-content/15 bg-base-100 px-3 py-2 transition focus-within:border-primary/50 sm:w-64">
                            <MagnifyingGlassIcon className="h-4 w-4 shrink-0 text-neutral-content" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search entries…"
                                className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-neutral-content/60"
                            />
                        </label>
                    )}
                    <button
                        onClick={() => navigate("/vault/new")}
                        className="btn btn-primary btn-sm shrink-0"
                    >
                        <PlusIcon className="w-4" />
                        <span className="hidden sm:inline">New</span>
                    </button>
                </div>
            </div>

            {isEmptyVault ? (
                <EmptyState
                    title="Your vault is empty"
                    subtitle="Store your first secret, API key, or note — encrypted on this device."
                    actionLabel="Create your first entry"
                    onAction={() => navigate("/vault/new")}
                />
            ) : filteredEntries.length === 0 ? (
                <EmptyState
                    title="Nothing here"
                    subtitle={
                        query.trim()
                            ? `No entries match “${query.trim()}”.`
                            : "No entries match this filter yet."
                    }
                />
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEntries.map((entry, i) => (
                        <div
                            key={entry.id}
                            className="animate-rise"
                            style={{ animationDelay: `${Math.min(i * 40, 320)}ms` }}
                        >
                            <EntryCard
                                name={entry.name}
                                type={entry.type}
                                updatedAt={entry.updatedAt}
                                expiresAt={entry.expiresAt}
                                onClick={() => navigate(`/vault/entry/${entry.id}`)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

interface EmptyStateProps {
    title: string
    subtitle: string
    actionLabel?: string
    onAction?: () => void
}

const EmptyState = ({ title, subtitle, actionLabel, onAction }: EmptyStateProps) => (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-base-content/15 bg-base-100/40 py-16 text-center animate-fade">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <InboxIcon className="h-7 w-7" />
        </span>
        <div className="space-y-1">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mx-auto max-w-xs text-sm text-neutral-content">{subtitle}</p>
        </div>
        {actionLabel && onAction && (
            <button onClick={onAction} className="btn btn-primary btn-sm mt-2">
                <PlusIcon className="w-4" />
                {actionLabel}
            </button>
        )}
    </div>
)

// keep a default export to satisfy potential lazy imports
export default VaultHome
