import axios from 'axios';
import {useAuthStore} from "../store/authStore.ts";

const api = axios.create({baseURL : "http://localhost:3000"});

api.interceptors.request.use(
    (config) => {
        const { accessToken } = useAuthStore()
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;