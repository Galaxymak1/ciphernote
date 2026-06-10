import {useEffect, useMemo, useState} from "react"
import {EntriesService} from "../domain/entries/entriesService.ts";
import {EntryCard} from "../components/molecules/EntryCard.tsx";
import type {VaultEntryMeta} from "../domain/db/types.ts";
import {useNavigate, useSearchParams} from "react-router";


export const VaultHome = () => {
    const [entries, setEntries] = useState<VaultEntryMeta[]>([])
    const [loading, setLoading] = useState(true)
    const [now] = useState(() => Date.now())
    const entryService = useMemo(() => new EntriesService(), [])
    const navigate = useNavigate()
    const [params] = useSearchParams();

    const type = params.get("type");
    const expiring = params.get("expiring");

    const filteredEntries = entries.filter(entry => {
        if (type && entry.type !== type) return false;

        if (expiring === "soon") {
            if (!entry.expiresAt) return false;

            const in7Days = now + 7 * 24 * 60 * 60 * 1000;
            return entry.expiresAt <= in7Days;
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
        return <div className="p-6">Loading entries…</div>
    }

    if (entries.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full opacity-60 text-xl">
                <p>No entries yet</p>
                <p className="text-sm">Create your first secret</p>
            </div>
        )
    }

    return (
        <div className="p-6 flex flex-wrap gap-3 max-w-3xl">
            {filteredEntries.map((filteredEntry) => (
                <EntryCard
                    key={filteredEntry.id}
                    name={filteredEntry.name}
                    type={filteredEntry.type}
                    updatedAt={filteredEntry.updatedAt}
                    onClick={() => {
                        navigate(`/vault/entry/${filteredEntry.id}`)
                    }}
                />
            ))}
        </div>
    )
}
