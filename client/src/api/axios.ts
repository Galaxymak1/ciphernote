import axios from "axios"
import { useAuthStore } from "../store/authStore"
import {navigate} from "../navigation.ts";

const api = axios.create({
    baseURL: "http://localhost:3000",
})

api.interceptors.request.use(
    (config) => {
        const accessToken = useAuthStore.getState().accessToken
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        console.log("Unauthorized");
        navigate("auth/login")
    }
    return error;
});

export default api
