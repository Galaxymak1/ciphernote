import { Outlet } from "react-router"
import { Sidebar } from "../organisms/Sidebar"
import { Navbar } from "../organisms/Navbar"
import {ToastContainer} from "react-toastify";

export const VaultLayout = () => {
    return (
        <div className="drawer lg:drawer-open min-h-screen">
            <input
                id="vault-drawer"
                type="checkbox"
                className="drawer-toggle"
            />

            <div className="drawer-content flex flex-col">
                <Navbar />

                <main className="flex-1 bg-base-200 p-4">
                    <Outlet />
                </main>
            </div>

            <div className="drawer-side">
                <label
                    htmlFor="vault-drawer"
                    className="drawer-overlay lg:hidden"
                />
                <Sidebar />
            </div>
            <ToastContainer
                theme="dark"
                position="top-center"
            />
        </div>
    )
}
