import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {EntriesService} from "../../domain/entries/entriesService.ts";
import {useVaultStore} from "../../store/vaultStore.ts";
import type {EntryRecord} from "../../domain/db/types.ts";

export const EntryDetails = () => {
    const [value, setValue] = useState("")
    const [entry, setEntry] = useState<EntryRecord>()
    const { id } = useParams<{ id: string }>()
    const {masterKey} = useVaultStore()
    const entryService = new EntriesService(masterKey)
    if (!id) {
        return <div>Invalid entry</div>
    }

    async function loadEntryDetails(id: string): Promise<void> {
        const entry = await entryService.getEntry(id)
        const value = await entryService.getDecryptedValue(id)
        setValue(value)
        setEntry(entry)
    }

    useEffect( ()=> {
        loadEntryDetails(id)
    },[id])


    return (
        <div className="flex justify-center pt-10">
            Name : {entry?.name} <br/>
            Value : {value}
        </div>
        )
}