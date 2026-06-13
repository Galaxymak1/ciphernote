import {
    Squares2X2Icon,
    ClockIcon,
    PlusIcon,
    LockClosedIcon,
} from "@heroicons/react/16/solid"
import { NavLink, useSearchParams } from "react-router"
import { useVaultStore } from "../../store/vaultStore"
import { entryTypeMeta } from "../../utils/entryType"
import type { ComponentType, SVGProps } from "react"

type NavItem = {
    to: string
    label: string
    Icon: ComponentType<SVGProps<SVGSVGElement>>
    iconClass?: string
    isActive: (type: string | null, expiring: string | null) => boolean
}

const apiMeta = entryTypeMeta("api")
const secretMeta = entryTypeMeta("secret")
const noteMeta = entryTypeMeta("note")

const NAV: { heading?: string; items: NavItem[] }[] = [
    {
        items: [
            {
                to: "/vault",
                label: "All entries",
                Icon: Squares2X2Icon,
                isActive: (type, expiring) => !type && !expiring,
            },
        ],
    },
    {
        heading: "Categories",
        items: [
            {
                to: "/vault?type=secret",
                label: "Secrets",
                Icon: secretMeta.Icon,
                iconClass: secretMeta.icon,
                isActive: (type) => type === "secret",
            },
            {
                to: "/vault?type=api",
                label: "API keys",
                Icon: apiMeta.Icon,
                iconClass: apiMeta.icon,
                isActive: (type) => type === "api",
            },
            {
                to: "/vault?type=note",
                label: "Notes",
                Icon: noteMeta.Icon,
                iconClass: noteMeta.icon,
                isActive: (type) => type === "note",
            },
        ],
    },
    {
        heading: "Filters",
        items: [
            {
                to: "/vault?expiring=soon",
                label: "Expiring soon",
                Icon: ClockIcon,
                iconClass: "text-warning",
                isActive: (_type, expiring) => expiring === "soon",
            },
        ],
    },
]

export const Sidebar = () => {
    const { setStatus, clearMasterKey } = useVaultStore()
    const [params] = useSearchParams()
    const type = params.get("type")
    const expiring = params.get("expiring")

    return (
        <aside className="bg-base-100/40 bg-dots w-72 min-h-full p-4 flex flex-col border-r border-base-content/10">
            <div className="mb-6 px-2 pt-2">
                <h2 className="font-display text-lg font-bold">Secure Vault</h2>
                <p className="text-xs text-neutral-content">Local-first · encrypted</p>
            </div>

            <nav className="flex-1 space-y-5">
                {NAV.map((group, gi) => (
                    <div key={gi}>
                        {group.heading && (
                            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-content/70">
                                {group.heading}
                            </p>
                        )}
                        <ul className="space-y-0.5">
                            {group.items.map((item) => {
                                const active = item.isActive(type, expiring)
                                return (
                                    <li key={item.to}>
                                        <NavLink
                                            to={item.to}
                                            className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                                                active
                                                    ? "bg-base-content/10 font-medium text-base-content"
                                                    : "text-neutral-content hover:bg-base-content/5 hover:text-base-content"
                                            }`}
                                        >
                                            <item.Icon
                                                className={`w-4 transition ${
                                                    item.iconClass ?? ""
                                                } ${active ? "" : "opacity-80 group-hover:opacity-100"}`}
                                            />
                                            {item.label}
                                        </NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            <div className="mt-4 space-y-2 border-t border-base-content/10 pt-4">
                <NavLink to="/vault/new" className="btn btn-primary w-full">
                    <PlusIcon className="w-4" />
                    New entry
                </NavLink>

                <button
                    className="btn btn-ghost btn-sm w-full text-neutral-content hover:text-base-content"
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
