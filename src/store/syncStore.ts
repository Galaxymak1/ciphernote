import {create} from "zustand";
import {persist} from "zustand/middleware";

interface SyncState {
    enabled: boolean
    syncing: boolean
    setEnabled(v: boolean): void
    setSyncing(v: boolean): void
}

export const useSyncStore = create<SyncState>()(
    persist(
        (set) => ({
            syncing: false,
            enabled: false,
            setEnabled(v: boolean) {
                set({ enabled: v });
            },
            setSyncing(v: boolean) {
                set({ syncing: v });
            }
        }),
        {
            name: "sync_state"
        }
    ),
)