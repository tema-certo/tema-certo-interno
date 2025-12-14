import { removeAuthData } from '@/hooks/useStore';
import axios from 'axios';

function createApi(url) {
    return axios.create({
        baseURL: url,
    });
}

export default function useApi({
    url,
    denyToken = false,
}) {
    const api = createApi(url);

    api.interceptors.response.use(async (response) => {
        return response;
    }, async function (error) {
        if (error?.status === 401) {
            await removeAuthData();

            window.location.href = '/login';
        }

        return Promise.reject(error);
    });

    api.interceptors.request.use(async (config) => {
        const tokenCookie = document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='));

        const token = tokenCookie?.split('=')[1];

        if (token && !denyToken) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    return api;
}
