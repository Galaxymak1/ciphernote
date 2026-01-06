import { useEffect, useMemo, useState } from "react";
import { EntriesService } from "../../domain/entries/entriesService";
import { useVaultStore } from "../../store/vaultStore";
import type { EntryRecord } from "../../domain/db/types";
import { EntryDetailCard } from "../molecules/EntryDetailCard";
import { toast } from "react-toastify";
import {useNavigate, useParams} from "react-router";

export const EntryDetails = () => {
    const [value, setValue] = useState("");
    const [entry, setEntry] = useState<EntryRecord | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { masterKey } = useVaultStore();

    const entryService = useMemo(
        () => new EntriesService(masterKey),
        [masterKey]
    );

    const loadEntryDetails = async () => {
        if (!id) {
            toast.error("Invalid entry ID");
            navigate("/vault");
            return;
        }
        try {
            setLoading(true);

            const entry = await entryService.getEntry(id);
            if (!entry) {
                toast.error("Entry not found");
                navigate("/vault");
                return;
            }

            const decryptedValue =
                await entryService.getDecryptedValue(id);

            setEntry(entry);
            setValue(decryptedValue);
        } catch (err) {
            toast.error("Failed to load entry");
            navigate("/vault");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        loadEntryDetails();
    }, [id, entryService, navigate]);

    const handleDelete = async () => {
        try {
            await entryService.deleteEntry(id!)

            toast.success("Entry deleted");
            navigate("/vault");
        }catch (err) {
            toast.error("Failed to update entry");
        }

    }
    const handleSaveEdit = async (name: string,value:string) => {
        try {
            await entryService.updateEntry(id!, {
                name: name,
                value: value
            })
            toast.success("Entry updated");
            await loadEntryDetails()
        }catch (err) {
            toast.error("Failed to update entry");
        }

    }
    if (loading) {
        return <div className="pt-10 text-center">Loading...</div>;
    }

    if (!entry) {
        return null;
    }

    return (
        <div>
            <div className="flex justify-center pt-10">
                <EntryDetailCard
                    name={entry.name}
                    type={entry.type}
                    updatedAt={entry.updatedAt}
                    expiresAt={entry.expiresAt}
                    value={value}
                    onSaveEdit={handleSaveEdit}
                    onConfirmDelete={handleDelete}
                />
            </div>

        </div>

    );
};
