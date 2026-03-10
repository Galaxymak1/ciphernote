import {useVaultStore} from "./store/vaultStore.ts";
import {getVault} from "./domain/db/vault.store.ts";
import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router";
import {useSyncStore} from "./store/syncStore.ts";
import {getSync} from "./domain/db/sync.store.ts";
import {setNavigate} from "./navigation.ts";

export const App = () => {
    const { setStatus } = useVaultStore()
    const { setEnabled } = useSyncStore()
    function NavigationHandler() {
        const nav = useNavigate();

        useEffect(() => {
            setNavigate(nav);
        }, [nav]);

        return null;
    }
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
            <NavigationHandler/>
            <Outlet />
        </div>
    )
}
