import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { VaultStatus } from "../types/types"

interface VaultState {
    status: VaultStatus
    setStatus: (s: VaultStatus) => void

    masterKey: CryptoKey | null
    setMasterKey: (k: CryptoKey) => void
    clearMasterKey: () => void
}

export const useVaultStore = create<VaultState>()(
    persist(
        (set) => ({
            status: "loading",
            masterKey: null,

            setStatus: (status) => set({ status }),

            setMasterKey: (key) =>
                set({ masterKey: key, status: "unlocked" }),

            clearMasterKey: () =>
                set({ masterKey: null, status: "locked" }),
        }),
        {
            name: "vault-ui-state",
            partialize: (state) => ({
                status: state.status !== "unlocked"
                    ? state.status
                    : "locked",
            }),
        }
    )
)
