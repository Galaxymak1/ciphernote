import { createBrowserRouter, Navigate } from "react-router"
import VaultSetup from "../pages/VaultSetup"
import Unlock from "../pages/Unlock"
import { VaultLayout } from "../components/templates/VaultLayout"
import { VaultHome } from "../pages/VaultHome"
import {RequireUnlocked, RequireVault} from "./guards.tsx";
import {App} from "../App.tsx";
import {EntryCreate} from "../components/templates/EntryCreate.tsx";
import {EntryDetails} from "../components/templates/EntryDetails.tsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Navigate to="/vault" replace /> },

            { path: "setup", element: <VaultSetup /> },
            { path: "unlock", element: <Unlock /> },
            {
                element: <RequireVault />,
                children: [
                    {
                        element: <RequireUnlocked />,
                        children: [
                            {
                                path: "vault",
                                element: <VaultLayout />,
                                children: [
                                    { index: true, element: <VaultHome /> },
                                    { path: "new", element: <EntryCreate/> },
                                    { path: "entry/:id", element: <EntryDetails /> },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
])
