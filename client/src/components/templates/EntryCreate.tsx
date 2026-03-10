
import { useNavigate } from "react-router"
import {NewEntryCard, type NewEntryPayload} from "../organisms/NewEntryCard.tsx";
import {EntriesService} from "../../domain/entries/entriesService.ts";
import {useVaultStore} from "../../store/vaultStore.ts";

export const EntryCreate = () => {
    const navigate = useNavigate()
    const masterKey = useVaultStore((s) => s.masterKey)!

    const entries = new EntriesService(masterKey)

    async function handleCreate(entry :NewEntryPayload) {
        await entries.createEntry(entry)
        navigate("/vault")
    }

    return (
        <div className="flex justify-center pt-10">
            <NewEntryCard onSubmit={handleCreate} />
        </div>
    )
}
