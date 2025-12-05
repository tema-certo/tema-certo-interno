import axios from 'axios';

function createApi(url) {
    return axios.create({
        baseURL: url,
    });
}

export default function useApi({
    url,
}) {
    const api = createApi(url);

    return api;
}
