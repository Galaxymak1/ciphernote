import { useEffect, useState } from "react"
import {EntriesService} from "../domain/entries/entriesService.ts";
import {EntryCard} from "../components/molecules/EntryCard.tsx";
import type {VaultEntryMeta} from "../domain/db/types.ts";
import {useNavigate} from "react-router";


export const VaultHome = () => {
    const [entries, setEntries] = useState<VaultEntryMeta[]>([])
    const [loading, setLoading] = useState(true)
    const entryService = new EntriesService()
    const navigate = useNavigate()


    useEffect(() => {
        async function load() {
            const all = await entryService.listEntries()
            setEntries(all)
            setLoading(false)
        }
        load()
    }, [])

    if (loading) {
        return <div className="p-6">Loading entries…</div>
    }

    if (entries.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full opacity-60">
                <p>No entries yet</p>
                <p className="text-sm">Create your first secret</p>
            </div>
        )
    }

    return (
        <div className="p-6 grid gap-3 max-w-3xl">
            {entries.map((entry) => (
                <EntryCard
                    key={entry.id}
                    name={entry.name}
                    type={entry.type}
                    updatedAt={entry.updatedAt}
                    onClick={() => {
                        navigate(`/vault/entry/${entry.id}`)
                    }}
                />
            ))}
        </div>
    )
}
