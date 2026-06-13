import { KeyIcon, DocumentTextIcon, CommandLineIcon } from "@heroicons/react/16/solid"
import type { ComponentType, SVGProps } from "react"

export type EntryType = "secret" | "api" | "note"

interface TypeMeta {
    label: string
    /** daisyUI badge color modifier */
    badge: string
    /** tailwind text color for the icon */
    icon: string
    /** subtle tinted background for the icon chip */
    chip: string
    Icon: ComponentType<SVGProps<SVGSVGElement>>
}

const META: Record<string, TypeMeta> = {
    secret: {
        label: "Secret",
        badge: "badge-info",
        icon: "text-info",
        chip: "bg-info/10",
        Icon: KeyIcon,
    },
    api: {
        label: "API key",
        badge: "badge-accent",
        icon: "text-accent",
        chip: "bg-accent/10",
        Icon: CommandLineIcon,
    },
    note: {
        label: "Note",
        badge: "badge-primary",
        icon: "text-primary",
        chip: "bg-primary/10",
        Icon: DocumentTextIcon,
    },
}

const FALLBACK: TypeMeta = {
    label: "Entry",
    badge: "badge-neutral",
    icon: "text-neutral-content",
    chip: "bg-neutral/20",
    Icon: DocumentTextIcon,
}

export function entryTypeMeta(type: string): TypeMeta {
    return META[type] ?? FALLBACK
}

export type ExpiryStatus = "expired" | "soon" | "ok"

/** Classify an expiry timestamp relative to now. Returns null when there is none. */
export function expiryStatus(expiresAt?: number): ExpiryStatus | null {
    if (expiresAt === undefined) return null
    const now = Date.now()
    if (expiresAt <= now) return "expired"
    if (expiresAt - now <= 7 * 24 * 60 * 60 * 1000) return "soon"
    return "ok"
}

/** Human, relative timestamp ("just now", "3h ago", "Apr 12"). */
export function relativeTime(ts: number): string {
    const diff = Date.now() - ts
    const min = Math.round(diff / 60000)
    if (min < 1) return "just now"
    if (min < 60) return `${min}m ago`
    const hr = Math.round(min / 60)
    if (hr < 24) return `${hr}h ago`
    const day = Math.round(hr / 24)
    if (day < 7) return `${day}d ago`
    return new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric" })
}
