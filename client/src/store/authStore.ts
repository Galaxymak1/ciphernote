import {create} from "zustand";
import {persist} from "zustand/middleware";

interface AuthState {
    isAuthenticated: boolean
    accessToken?: string | null
    setAccessToken: (accessToken: string) => void
    logout: () => void
    setAuthenticated: (authenticated: boolean) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
     (set) => ({
         isAuthenticated: false,
         accessToken:null,
         setAccessToken: (accessToken) => {
             set({accessToken: accessToken, isAuthenticated: true});
         },
         logout: () => {
             set({accessToken: null, isAuthenticated: false});
         },
         setAuthenticated: (authenticated) => {
             set({ isAuthenticated: authenticated});
         }
     }),
        {
            name: "auth-state"
        }
 )
)