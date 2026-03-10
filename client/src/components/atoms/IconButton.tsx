import {type ReactElement, useMemo} from "react";

interface EditButtonProps {
    onClick?: () => void;
    icon: ReactElement;
    text: string;
    variant?: "primary" | "neutral";
}

export const IconButton = (({onClick,icon,text,variant} : EditButtonProps) => {

    const classes = useMemo(() => {
        switch (variant) {
            case "primary":
                return "";
            case "neutral":
                return "";
        }
    }, [variant]);
    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-base-200 text-base-content hover:bg-base-300 transition cursor-pointer ${classes}`}
        >
            {icon}

            {text}
        </button>
    )
})