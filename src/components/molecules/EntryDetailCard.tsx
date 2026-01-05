import {CheckIcon, ClipboardDocumentIcon, XMarkIcon,PencilSquareIcon, DocumentCheckIcon,XCircleIcon} from "@heroicons/react/16/solid";
import {useNavigate} from "react-router";
import {useMemo, useState} from "react";

interface EntryCardDetailProps {
    name: string;
    type: string;
    updatedAt: number;
    value: string;
    expiresAt?: number;
    onSaveEdit: (name : string,value :string) => void;
}

export const EntryDetailCard = ({
                                    name,
                                    type,
                                    updatedAt,
                                    expiresAt,
                                    value,
                                    onSaveEdit,
                                }: EntryCardDetailProps) => {
    const navigate = useNavigate();
    const [copied, setCopied] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState(false);
    const [draftName, setDraftName] = useState(name);
    const [draftValue, setDraftValue] = useState(value);

    const startEdit = () => {
        setDraftName(name);
        setDraftValue(value);
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setIsEditing(false);
    };

    const saveEdit = async () => {
        onSaveEdit(draftName, draftValue);
        setIsEditing(false);
    };
    async function handleCopy() {
        if (!value) return

        await navigator.clipboard.writeText(value)
        setCopied(true)

        setTimeout(() => setCopied(false), 1500)
    }
    const color = useMemo(() => {
        switch (type) {
            case "note":
                return "badge-primary";
            case "api":
                return "badge-accent";
            case "secret":
                return "badge-info";
        }
    }, [type]);
    return (
        <div
            className={`
        bg-base-100 flex flex-col p-6 rounded-2xl gap-5 max-w-md w-full
        border border-base-content/10
        shadow-sm
        ${isEditing ? "ring-2 ring-primary/40" : ""}
    `}
        >

            <h2 className="text-xl font-semibold text-primary flex items-center justify-between">
                Vault entry details
                <XMarkIcon
                    className="w-7 text-neutral-content hover:text-error transition cursor-pointer"
                    onClick={() => navigate("/vault")}
                />
            </h2>


            <div className="flex flex-col gap-1.5">
                <div className="inline-flex justify-between items-center">
                    <label className="text-xs uppercase tracking-wide text-neutral-content">
                        Entry name
                    </label>
                    <div className={`badge badge-outline ${color}`}>
                        {type.toUpperCase()}
                    </div>
                </div>

                {isEditing ? (
                    <input
                        value={draftName}
                        onChange={(e) => setDraftName(e.target.value)}
                        className="
                input input-bordered w-full
                focus:border-primary focus:ring-2 focus:ring-primary/30
            "
                    />
                ) : (
                    <p className="text-base font-medium text-base-content">
                        {name}
                    </p>
                )}
            </div>




            <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wide text-neutral-content">
                    Value
                </label>

                {isEditing ? (
                    <textarea
                        value={draftValue}
                        onChange={(e) => setDraftValue(e.target.value)}
                        className="
                textarea textarea-bordered font-mono w-full
                focus:border-primary focus:ring-2 focus:ring-primary/30
            "
                        rows={4}
                    />
                ) : (
                    <div className="
            bg-base-200/40 border border-base-content/10 rounded-lg p-3
            font-mono text-sm text-base-content break-all
        ">
                        {value}
                    </div>
                )}

                {!isEditing && (
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="
                inline-flex items-center gap-2 self-start
                rounded-md px-3 py-1.5 text-sm
                bg-primary/10 text-primary
                hover:bg-primary/20 transition
            "
                    >
                        {copied ? (
                            <>
                                <CheckIcon className="h-4 w-4" />
                                Copied
                            </>
                        ) : (
                            <>
                                <ClipboardDocumentIcon className="h-4 w-4" />
                                Copy
                            </>
                        )}
                    </button>
                )}
            </div>


            <div className="text-xs text-neutral-content">
                Last updated · {new Date(updatedAt).toLocaleString()}
            </div>
            {
                expiresAt !== undefined &&
                <div className={"text-xs text-neutral-content"}>
                    Expires At · {new Date(expiresAt).toLocaleString()}
                </div>
            }

            <div className="flex gap-3 justify-end pt-2">
                {isEditing ? (
                    <>
                        <button
                            onClick={saveEdit}
                            className="
                    inline-flex items-center gap-2 px-4 py-2 rounded-lg
                    bg-primary text-primary-content
                    hover:bg-primary/90 transition shadow-sm cursor-pointer
                "
                        >
                            <DocumentCheckIcon className="w-5" />
                            Save
                        </button>
                        <button
                            onClick={cancelEdit}
                            className="
                    inline-flex items-center gap-2 px-4 py-2 rounded-lg
                    border border-base-content/20
                    text-base-content hover:bg-base-200 transition cursor-pointer
                "
                        >
                            <XCircleIcon className="w-5" />
                            Cancel
                        </button>


                    </>
                ) : (
                    <button
                        onClick={startEdit}
                        className="
                inline-flex items-center gap-2 px-4 py-2 rounded-lg
                bg-base-200 text-base-content
                hover:bg-base-300 transition cursor-pointer
            "
                    >
                        <PencilSquareIcon className="w-5" />
                        Edit
                    </button>
                )}
            </div>


        </div>
    );
};
