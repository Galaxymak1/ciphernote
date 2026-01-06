import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import {Navbar} from "../components/organisms/Navbar.tsx";

export const AppShell = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1">
                <Outlet />
            </main>

            <ToastContainer theme="dark" position="top-center" />
        </div>
    );
};
