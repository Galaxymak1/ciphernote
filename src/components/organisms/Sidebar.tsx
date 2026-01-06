import {
    KeyIcon,
    DocumentTextIcon,
    // ClockIcon,
    PlusIcon,
    LockClosedIcon, ClockIcon,
} from "@heroicons/react/16/solid"
import {NavLink, useSearchParams} from "react-router";
import {useVaultStore} from "../../store/vaultStore.ts";


export const Sidebar = () => {
    const { setStatus, clearMasterKey } = useVaultStore()
    const [params] = useSearchParams();
    const type = params.get("type");
    const expiring = params.get("expiring");


    const linkClass = (opts: { type?: string; expiring?: string }) =>
        `flex items-center gap-2 ${
            type === opts.type || expiring === opts.expiring
                ? "active bg-base-300"
                : ""
        }`;
    return (
                <aside className="bg-base-200 w-80 min-h-full p-4 flex flex-col">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-primary">
                            Secure Vault
                        </h2>
                        <p className="text-xs text-neutral-content">
                            Local-first encrypted
                        </p>
                    </div>

                    <ul className="menu flex-1 gap-1 w-full ">
                        <li>
                            <NavLink to="/vault" className={linkClass({})}>
                                <DocumentTextIcon className="w-4" />
                                All entries
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/vault?type=api" className={linkClass({type:"api"})}>
                                <KeyIcon className="w-4" />
                                APIs
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/vault?type=secret" className={linkClass({type:"secret"})}>
                                <KeyIcon className="w-4" />
                                Secrets
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/vault?type=note" className={linkClass({type:"note"})}>
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
