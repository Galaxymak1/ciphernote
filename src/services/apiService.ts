import api from "../api/axios.ts";

interface LoginResponse {
    accessToken: string;
    email: string;
}

export const login = async (email: string, password: string) :Promise<LoginResponse> => {
    try {
        const response = await api.post(`/auth/login`, {
            email: email,
            password: password
        })
        return response.data
    }catch (e) {
        throw e;
    }
}