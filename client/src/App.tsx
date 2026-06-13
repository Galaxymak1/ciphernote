import {useVaultStore} from "./store/vaultStore.ts";
import {getVault} from "./domain/db/vault.store.ts";
import {useEffect} from "react";
import {Outlet} from "react-router";
import Splash from "./pages/Splash.tsx";

export const App = () => {
    const { status, setStatus } = useVaultStore()

    useEffect(() => {
        async function init() {
            const vault = await getVault()
            setStatus(vault ? "locked" : "no-vault")
        }
        init()
    }, [])

    if (status === "loading") {
        return <Splash />
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}
