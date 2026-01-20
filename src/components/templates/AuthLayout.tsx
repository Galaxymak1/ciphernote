import { Outlet } from "react-router"

export const AuthLayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="w-full max-w-md bg-base-100 p-6 rounded-lg shadow-md">
                <Outlet />
            </div>
        </div>
    )
}
