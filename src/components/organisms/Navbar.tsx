import {LockClosedIcon} from "@heroicons/react/16/solid";

export const Navbar = () => {
    return (
        <header className={"w-full fixed top-0 left-0 text-white shadow-md z-50 bg-base-200 70 backdrop-blur-md"}>
            <nav className={"flex items-center justify-center py-4"}>
                <LockClosedIcon className="h-6 text-primary pe-2" />
                <p className={"text-base-content font-bold text-md"}>Ciphernote</p>
            </nav>
        </header>
    )
}