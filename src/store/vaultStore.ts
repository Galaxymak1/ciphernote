import {create} from "zustand/react";
import type {VaultStatus} from "../types/types.ts";

interface VaultState {
    status: VaultStatus;
    setStatus: (status: VaultStatus) => void;
    masterKey: CryptoKey | null;
    setMasterKey: (masterKey: CryptoKey) => void;
    clearMasterKey: () => void;
}

export const useVaultStore = create<VaultState>((set) => ({
    masterKey: null,

    setMasterKey: (key) => set({ masterKey: key }),

    clearMasterKey: () => set({ masterKey: null }),

    status : "loading",
    setStatus : (status: VaultStatus) => set({ status }),
}))