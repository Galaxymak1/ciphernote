import {useMemo} from "react";

interface EntryCardProps {
    name: string
    type: string
    updatedAt: number
    onClick?: () => void
}

export const EntryCard = ({ name, type, updatedAt, onClick }: EntryCardProps) => {
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
        <button
            onClick={onClick}
            className="
                card bg-base-100 text-base-content
                w-full text-left
                max-w-xs
                hover:shadow-lg transition
                hover:scale-110
                border border-base-300
                cursor-pointer
            "
        >
            <div className="card-body p-4">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg truncate">
                        {name}
                    </h3>

                    <span className={"badge badge-outline badge-sm " + color}>
                        {type}
                    </span>
                </div>

                <p className="text-xs opacity-60 mt-1">
                    Updated {new Date(updatedAt).toLocaleDateString()}
                </p>
            </div>
        </button>
    )
}
