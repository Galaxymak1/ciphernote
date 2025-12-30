import { Navigate, Outlet } from "react-router"
import { useVaultStore } from "../store/vaultStore"

export const RequireVault = () => {
    const { status } = useVaultStore()

    if (status === "loading") return null
    if (status === "no-vault") return <Navigate to="/setup" replace />

    return <Outlet />
}



export const RequireUnlocked = () => {
    const { status } = useVaultStore()

    if (status === "loading") return null
    if (status === "locked") return <Navigate to="/unlock" replace />

    return <Outlet />
}
