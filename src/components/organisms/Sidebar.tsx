import {
    KeyIcon,
    DocumentTextIcon,
    ClockIcon,
    PlusIcon,
    LockClosedIcon,
    LinkIcon,
    ArrowPathIcon,
} from "@heroicons/react/16/solid"
import { NavLink, useSearchParams, useNavigate } from "react-router"
import { useVaultStore } from "../../store/vaultStore"
import { useSyncStore } from "../../store/syncStore"
import { toast } from "react-toastify"
import {EntriesService} from "../../domain/entries/entriesService.ts";
import {pull, push} from "../../services/syncService.ts";
import {getSync} from "../../domain/db/sync.store.ts";

export const Sidebar = () => {
    const { setStatus, clearMasterKey } = useVaultStore()
    const { enabled, setEnabled, syncing, setSyncing } = useSyncStore()
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const entries = new EntriesService()
    const type = params.get("type")
    const expiring = params.get("expiring")

    const linkClass = (opts: { type?: string; expiring?: string }) =>
        `flex items-center gap-2 ${
            type === opts.type || expiring === opts.expiring
                ? "active bg-base-300"
                : ""
        }`

    async function handleToggleSync() {
        if (!enabled) {
            // user wants to enable sync → probably go to /vault/sync or /login
            navigate("/vault/sync")
        } else {
            // disable sync
            setEnabled(false)
            toast("Sync disabled", {
                type: "info",
                theme: "dark",
            })
        }
    }

    async function handleManualSync() {
        if (!enabled || syncing) return
        try {
            setSyncing(true)
            toast("Syncing...", { type: "info", autoClose: 1000 })
            const localBlobs = await entries.listAllEntries()
            await push(localBlobs)
            const last_sync = await getSync()
            const data = pull(last_sync?.lastSyncedAt!!)
            console.log(data)
            // Here you would call your SyncClient.push() / pull() combo
            // await SyncClient.sync()
            toast("Sync complete", { type: "success" })
        } catch (err) {
            toast("Sync failed", { type: "error" })
        } finally {
            setSyncing(false)
        }
    }

    return (
        <aside className="bg-base-200 w-80 min-h-full p-4 flex flex-col">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-primary">Secure Vault</h2>
                <p className="text-xs text-neutral-content">
                    Local-first encrypted
                </p>
            </div>

            <ul className="menu flex-1 gap-1 w-full">
                <li>
                    <NavLink to="/vault" className={linkClass({})}>
                        <DocumentTextIcon className="w-4" />
                        All entries
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/vault?type=api"
                        className={linkClass({ type: "api" })}
                    >
                        <KeyIcon className="w-4" />
                        APIs
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/vault?type=secret"
                        className={linkClass({ type: "secret" })}
                    >
                        <KeyIcon className="w-4" />
                        Secrets
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/vault?type=note"
                        className={linkClass({ type: "note" })}
                    >
                        <DocumentTextIcon className="w-4" />
                        Notes
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/vault?expiring=soon"
                        className={linkClass({ expiring: "soon" })}
                    >
                        <ClockIcon className="w-4" />
                        Expiring soon
                    </NavLink>
                </li>
            </ul>

            <div className="border-t border-base-300 pt-4 space-y-2">
                <NavLink
                    to="/vault/new"
                    className="btn btn-primary btn-sm w-full"
                >
                    <PlusIcon className="w-4" />
                    New entry
                </NavLink>

                <div className="flex gap-2">
                    <button
                        className={`btn btn-sm flex-1 ${
                            enabled ? "btn-success" : "btn-outline"
                        }`}
                        onClick={handleToggleSync}
                    >
                        <LinkIcon className="w-4" />
                        {enabled ? "Sync enabled" : "Enable sync"}
                    </button>

                    {enabled && (
                        <button
                            className="btn btn-sm btn-ghost"
                            onClick={handleManualSync}
                            disabled={syncing}
                            title="Manual sync"
                        >
                            <ArrowPathIcon
                                className={`w-4 ${
                                    syncing ? "animate-spin" : ""
                                }`}
                            />
                        </button>
                    )}
                </div>

                <button
                    className="btn btn-outline btn-sm w-full"
                    onClick={() => {
                        setStatus("locked")
                        clearMasterKey()
                    }}
                >
                    <LockClosedIcon className="w-4" />
                    Lock vault
                </button>
            </div>
        </aside>
    )
}
