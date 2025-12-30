import {
    LockClosedIcon,
    LockOpenIcon,
    Bars3Icon,
} from "@heroicons/react/16/solid"
import { useVaultStore } from "../../store/vaultStore"
import {useNavigate} from "react-router";

export const Navbar = () => {
    const { status,setStatus, clearMasterKey } = useVaultStore()
    const navigate = useNavigate()
    console.log(status)

    const isUnlocked = status === "unlocked"

    return (
        <header className="w-full bg-base-200/80 backdrop-blur-md border-b border-base-300">
            <nav className="flex items-center justify-between px-4 py-3">
                {/* Left */}
                <div className="flex items-center gap-2">
                    <label
                        htmlFor="vault-drawer"
                        className="btn btn-ghost btn-sm lg:hidden"
                    >
                        <Bars3Icon className="w-5" />
                    </label>

                    <LockClosedIcon className="h-5 text-primary" />
                    <span className="font-bold text-base-content cursor-pointer" onClick={() => navigate("/vault")}>
                        Ciphernote
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-neutral-content">
                        <span
                            className={`h-2 w-2 rounded-full ${
                                isUnlocked
                                    ? "bg-success"
                                    : "bg-error"
                            }`}
                        />
                        {isUnlocked ? "Unlocked" : "Locked"}
                    </div>

                    {isUnlocked && (
                        <button
                            onClick={() => {
                                setStatus("locked")
                                clearMasterKey()
                            }}
                            className="btn btn-ghost btn-sm"
                            title="Lock vault"
                        >
                            <LockOpenIcon className="w-5" />
                        </button>
                    )}
                </div>
            </nav>
        </header>
    )
}
