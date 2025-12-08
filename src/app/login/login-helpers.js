import { envs } from '@/envs';
import useApi from '@/hooks/useApi';

export async function getUserData() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const api = useApi({ url: envs.API_URL });

    try {
        const { data } = await api.get('/get-themes-list?page=1&limit=10');
        return data;
    } catch (e) {
        return null;
    }
}
