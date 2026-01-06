import {useVaultStore} from "./store/vaultStore.ts";
import {getVault} from "./domain/db/vault.store.ts";
import {useEffect} from "react";
import {Outlet} from "react-router";
import {Navbar} from "./components/organisms/Navbar.tsx";

export const App = () => {
    const { setStatus } = useVaultStore()

    useEffect(() => {
        async function init() {
            const vault = await getVault()
            setStatus(vault ? "locked" : "no-vault")
        }
        init()
    }, [])

    return (
        <div>
        {/*<Navbar />*/}
            <Outlet />
    </div>

    )

}
