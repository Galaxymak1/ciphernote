import { useState } from "react"
import { useNavigate } from "react-router"

export const Register = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit() {
        if (!email || !password) return
        setLoading(true)

        // TODO: replace with real API call
        navigate("/auth/login", { replace: true })
    }

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center">Create account</h2>

            <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                className="btn btn-primary w-full"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "Creating..." : "Register"}
            </button>

            <p className="text-sm text-center text-neutral-content">
                Already have an account?{" "}
                <a href="/auth/login" className="link link-primary">
                    Login
                </a>
            </p>
        </div>
    )
}
