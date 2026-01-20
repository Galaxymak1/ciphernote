import {useVaultStore} from "./store/vaultStore.ts";
import {getVault} from "./domain/db/vault.store.ts";
import {useEffect} from "react";
import {Outlet} from "react-router";
import {useSyncStore} from "./store/syncStore.ts";
import {getSync} from "./domain/db/sync.store.ts";

export const App = () => {
    const { setStatus } = useVaultStore()
    const { setEnabled } = useSyncStore()

    useEffect(() => {
        async function init() {
            const vault = await getVault()
            const sync = await getSync()

            setEnabled(!!sync)
            setStatus(vault ? "locked" : "no-vault")
        }
        init()
    }, [])

    return (
        <div>
            <Outlet />
        </div>
    )
}
