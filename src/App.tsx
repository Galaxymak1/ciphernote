import {useVaultStore} from "./store/vaultStore.ts";
import {getVault} from "./domain/db/vault.store.ts";
import {useEffect} from "react";
import {Outlet} from "react-router";

export const App = () => {
    const { status,setStatus } = useVaultStore()
    console.log(status)

    useEffect(() => {
        async function init() {
            const vault = await getVault()
            setStatus(vault ? "locked" : "no-vault")
        }
        init()
    }, [])

    return <Outlet />
}
