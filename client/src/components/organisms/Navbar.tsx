import {
    LockClosedIcon,
    ArrowRightStartOnRectangleIcon,
    Bars3Icon,
} from "@heroicons/react/16/solid"
import { useVaultStore } from "../../store/vaultStore"
import { Brand } from "../atoms/Brand"
import {useNavigate} from "react-router";

export const Navbar = () => {
    const { status, setStatus, clearMasterKey } = useVaultStore()
    const navigate = useNavigate()

    const isUnlocked = status === "unlocked"

    return (
        <header className="sticky top-0 z-30 w-full border-b border-base-content/10 bg-base-200/70 backdrop-blur-md">
            <nav className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                    <label
                        htmlFor="vault-drawer"
                        className="btn btn-ghost btn-sm lg:hidden"
                    >
                        <Bars3Icon className="w-5" />
                    </label>

                    <Brand size="sm" onClick={() => navigate("/vault")} />
                </div>

                <div className="flex items-center gap-3">
                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                            isUnlocked
                                ? "bg-success/15 text-success"
                                : "bg-error/15 text-error"
                        }`}
                    >
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${
                                isUnlocked ? "bg-success animate-pulse" : "bg-error"
                            }`}
                        />
                        {isUnlocked ? "Unlocked" : "Locked"}
                    </span>

                    {isUnlocked ? (
                        <button
                            onClick={() => {
                                setStatus("locked")
                                clearMasterKey()
                            }}
                            className="btn btn-ghost btn-sm gap-1.5"
                            title="Lock vault"
                        >
                            <ArrowRightStartOnRectangleIcon className="w-5" />
                            <span className="hidden sm:inline">Lock</span>
                        </button>
                    ) : (
                        <LockClosedIcon className="h-5 m-2 text-neutral-content" />
                    )}
                </div>
            </nav>
        </header>
    )
}
