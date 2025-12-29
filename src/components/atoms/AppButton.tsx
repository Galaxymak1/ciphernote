import {type ButtonHTMLAttributes, type ReactNode, useMemo} from "react";

type AppButtonProps = {
    variant?: "primary" | "secondary";
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const AppButton = ({
                              children,
                              variant = "primary",
                              disabled = false,
                              ...props
}: AppButtonProps) => {


    const classes = useMemo(() => {
        switch (variant) {
            case "primary":
                return "bg-primary  text-base-100 hover:brightness-90";
            case "secondary":
                return "bg-base-200 hover:bg-base-100 hover:brightness-110";
        }
    }, [variant]);

    return (
        <button
            className={`btn  rounded-lg py-2 px-5  max-w-40 cursor-pointer ${classes}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
