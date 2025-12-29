import { Outlet } from "react-router"
import { Navbar } from "./components/organisms/Navbar"
import { useEffect } from "react"
import { getVault } from "./domain/db/vault.store"
import { useVaultStore } from "./store/vaultStore"
import Splash from "./pages/Splash.tsx";
import VaultSetup from "./pages/VaultSetup.tsx";
import Unlock from "./pages/Unlock.tsx";

export const App = () => {
    const { status,masterKey, setStatus } = useVaultStore()

    useEffect(() => {
        async function init() {
            const vault = await getVault()
            if (!vault) {
                setStatus("no-vault")
            } else {
                setStatus(masterKey ? "unlocked" : "locked")
            }
        }
        init()
    }, [])

    function renderView() {
        switch (status) {
            case 'loading':
                return <Splash />;
            case 'no-vault':
                return <VaultSetup />;
            case 'locked':
                return <Unlock />;
            case 'unlocked'   :
                return <Outlet/>
            default:
                return <Splash />;
        }
    }
    return (
        <div>
            <Navbar />
            <div className="bg-base-200 overflow-hidden">
                {renderView()}
            </div>
        </div>
    )
}

export default App
