import { LockClosedIcon } from "@heroicons/react/16/solid"

interface BrandProps {
    /** Size of the lock badge */
    size?: "sm" | "md" | "lg"
    /** Hide the wordmark, show only the mark */
    iconOnly?: boolean
    className?: string
    onClick?: () => void
}

const sizes = {
    sm: { box: "h-7 w-7", icon: "h-4", text: "text-base" },
    md: { box: "h-9 w-9", icon: "h-5", text: "text-lg" },
    lg: { box: "h-12 w-12", icon: "h-6", text: "text-2xl" },
} as const

export const Brand = ({ size = "md", iconOnly = false, className = "", onClick }: BrandProps) => {
    const s = sizes[size]

    return (
        <div
            className={`inline-flex items-center gap-2.5 ${onClick ? "cursor-pointer" : ""} ${className}`}
            onClick={onClick}
        >
            <span
                className={`grid place-items-center rounded-xl bg-primary text-primary-content glow-primary ${s.box}`}
            >
                <LockClosedIcon className={s.icon} />
            </span>
            {!iconOnly && (
                <span className={`font-display font-bold tracking-tight ${s.text}`}>
                    Cipher<span className="text-primary">note</span>
                </span>
            )}
        </div>
    )
}
