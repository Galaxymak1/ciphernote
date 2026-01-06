import {
    CheckIcon,
    ClipboardDocumentIcon,
    XMarkIcon,
    DocumentCheckIcon,
    XCircleIcon,
    PencilSquareIcon,TrashIcon
} from "@heroicons/react/16/solid";
import {useNavigate} from "react-router";
import {useMemo, useState} from "react";

interface EntryCardDetailProps {
    name: string;
    type: string;
    updatedAt: number;
    value: string;
    expiresAt?: number;
    onSaveEdit: (name : string,value :string) => void;
    onConfirmDelete : () => void;
}

export const EntryDetailCard = ({
                                    name,
                                    type,
                                    updatedAt,
                                    expiresAt,
                                    value,
                                    onSaveEdit,
                                    onConfirmDelete
                                }: EntryCardDetailProps) => {
    const navigate = useNavigate();
    const [copied, setCopied] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState(false);
    const [draftName, setDraftName] = useState(name);
    const [draftValue, setDraftValue] = useState(value);
    const dialogElement = document.getElementById('delete_modal') as HTMLDialogElement;



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
    // @ts-ignore
    return (
        <div
            className={`
        bg-base-100
        flex flex-col gap-6
        p-6 rounded-2xl max-w-md w-full
        border border-base-content/10
        shadow-md
        transition
        ${isEditing ? "ring-2 ring-primary/40" : ""}
    `}
        >

            <h2 className="text-lg font-semibold text-base-content flex items-center justify-between">
                Vault entry
                <XMarkIcon
                    className="w-6 text-neutral-content hover:text-error transition cursor-pointer"
                    onClick={() => navigate("/vault")}
                />
            </h2>


            <div className="flex flex-col gap-1.5">
                <div className="inline-flex justify-between items-center">

                    <label className="text-[11px] uppercase tracking-wide text-neutral-content">
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
                    <p className="text-base font-semibold text-base-content">
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
                    <div
                        className="
        bg-base-200/60
        border border-base-content/10
        rounded-lg
        p-4
        font-mono text-sm
        text-base-content
        break-all
    "
                    >
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

            <div className="flex justify-between items-center text-xs text-neutral-content">
                <span>
                    Updated · {new Date(updatedAt).toLocaleString()}
                </span>

                            {expiresAt && (
                                <span>
                        Expires ·{" "}
                                    <span className="font-medium text-error">
                            {new Date(expiresAt).toLocaleDateString("en-GB")}
                        </span>
                    </span>
                            )}
            </div>




            <div className="flex gap-3 justify-end pt-2">
                {isEditing ? (
                    <>
                        <button onClick={saveEdit} className={"btn btn-primary"}>
                            <DocumentCheckIcon className="w-5" />
                            Save
                        </button>
                        <button onClick={cancelEdit} className={"btn btn-neutral"}>
                            <XCircleIcon className="w-5" />
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button className={"btn btn-neutral"} onClick={startEdit}>
                            <PencilSquareIcon className="w-5" />
                            Edit
                        </button>

                    </>


                )}
                <button className={"btn btn-error"} onClick={()=>dialogElement.showModal()}>
                    <TrashIcon className="w-5" />
                    Delete
                </button>
            </div>
            <dialog id="delete_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-semibold text-lg">
                        Delete entry?
                    </h3>
                    <p className="py-3 text-sm text-neutral-content">
                        This action is permanent and cannot be undone.
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-ghost btn-sm">Cancel</button>
                        </form>
                        <button
                            className="btn btn-error btn-sm"
                            onClick={onConfirmDelete}
                        >
                            Confirm delete
                        </button>
                    </div>
                </div>
            </dialog>


        </div>

    );
};
