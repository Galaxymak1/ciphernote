interface EntryCardProps {
    name: string
    type: string
    updatedAt: number
    onClick?: () => void
}

export const EntryCard = ({ name, type, updatedAt, onClick }: EntryCardProps) => {
    return (
        <button
            onClick={onClick}
            className="
                card bg-base-100 text-base-content
                w-full text-left
                max-w-xs
                hover:shadow-md transition
                border border-base-300
                cursor-pointer
            "
        >
            <div className="card-body p-4">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg truncate">
                        {name}
                    </h3>

                    <span className="badge badge-outline badge-sm badge-secondary">
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
