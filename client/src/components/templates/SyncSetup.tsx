import { useSyncStore } from "../../store/syncStore"
import { useAuthStore } from "../../store/authStore"
import { useNavigate } from "react-router"
import {saveSync} from "../../domain/db/sync.store.ts";
import {ExclamationTriangleIcon } from "@heroicons/react/16/solid";

export const SyncSetup = () => {
    const { enabled, setEnabled } = useSyncStore()
    const { isAuthenticated } = useAuthStore()
    const navigate = useNavigate()

    async function handleActivate() {
        await saveSync({
            id: "default",
            lastSyncedAt: Date.now(),
        })

        setEnabled(true)
        navigate("/vault")
    }

    return (
        <div className="p-8 flex flex-col items-center gap-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-primary">
                Enable Sync
            </h2>

            <p className="text-sm text-neutral-content text-center">
                Sync your encrypted vault across devices.
                Your data remains end-to-end encrypted.
            </p>

            {!isAuthenticated ? (
                <>
                    <div className="alert alert-warning text-sm font-bold">
                        <ExclamationTriangleIcon className="h-5 w-5" />
                        You must be logged in to enable sync.
                    </div>

                    <div className="flex gap-2 w-full">
                        <button
                            className="btn btn-primary flex-1"
                            onClick={() => navigate("/auth/login")}
                        >
                            Login
                        </button>

                        <button
                            className="btn btn-outline flex-1"
                            onClick={() => navigate("/auth/register")}
                        >
                            Register
                        </button>
                    </div>
                </>
            ) : (
                <button
                    className="btn btn-success w-full"
                    onClick={handleActivate}
                    disabled={enabled}
                >
                    {enabled ? "Sync already enabled" : "Activate sync"}
                </button>
            )}
        </div>
    )
}
