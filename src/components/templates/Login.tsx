import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router"
import {useAuthStore} from "../../store/authStore.ts";

export const Login = () => {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const next = params.get("next") ?? "/vault"

    const { setAccessToken } = useAuthStore()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit() {
        if (!email || !password) return
        setLoading(true)

        // TODO: replace with real API call
        const fakeToken = "jwt-token"

        setAccessToken(fakeToken)
        navigate(next, { replace: true })
    }

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center">Login</h2>

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
                {loading ? "Signing in..." : "Login"}
            </button>

            <p className="text-sm text-center text-neutral-content">
                No account?{" "}
                <a href="/auth/register" className="link link-primary">
                    Register
                </a>
            </p>
        </div>
    )
}
