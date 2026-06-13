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
        } catch {
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
        }catch {
            toast.error("Failed to delete entry");
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
        }catch {
            toast.error("Failed to update entry");
        }

    }
    if (loading) {
        return (
            <div className="flex justify-center pt-10">
                <div className="surface w-full max-w-md rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 animate-pulse rounded-xl bg-base-content/10" />
                        <div className="space-y-2">
                            <div className="h-3 w-20 animate-pulse rounded bg-base-content/10" />
                            <div className="h-4 w-16 animate-pulse rounded bg-base-content/10" />
                        </div>
                    </div>
                    <div className="h-4 w-40 animate-pulse rounded bg-base-content/10" />
                    <div className="h-24 w-full animate-pulse rounded-lg bg-base-content/5" />
                </div>
            </div>
        );
    }

    if (!entry) {
        return null;
    }

    return (
        <div className="px-2">
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
