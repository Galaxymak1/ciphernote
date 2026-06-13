import { Brand } from "../components/atoms/Brand"

export const Splash = () => {
    return (
        <div className="bg-vault min-h-screen flex flex-col items-center justify-center gap-6">
            <div className="animate-rise">
                <Brand size="lg" />
            </div>

            <div className="animate-fade flex items-center gap-2 text-sm text-neutral-content" style={{ animationDelay: "120ms" }}>
                <span className="loading loading-ring loading-sm text-primary" />
                Decrypting your vault…
            </div>
        </div>
    )
}

export default Splash
