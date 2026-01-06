import { envs } from '@/envs';
import { setTokenCookieSec } from '@/helpers';
import useApi from '@/hooks/useApi';
import userResources from '@/store/user';
import { create } from 'zustand';

const useStore = create((set) => (
    {
        ...userResources(set),
    }
));


export async function removeAuthData() {
    useStore.getState().setUser(null);

    document.cookie = 'token=; path=/; max-age=0;';
}

export async function setUserLoginData(token) {
    await setTokenCookieSec(data?.token);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const api = useApi({ url: envs.API_URL });
    const { data } = await api.get('/user-info');

    useStore.getState().setUser(data);
}


export default useStore;
