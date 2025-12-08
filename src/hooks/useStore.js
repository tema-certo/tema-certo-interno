import { envs } from '@/envs';
import useApi from '@/hooks/useApi';
import userResources from '@/store/user';
import { create } from 'zustand';

const useStore = create((set) => (
    {
        ...userResources(set),
    }
));


export async function removeAuthData() {
    useStore.getState().setUser({});

    document.cookie = 'token=; path=/; max-age=0;';
}

export async function setUserLoginData(token) {
    document.cookie = `token=${token}; path=/; max-age=3600;`;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const api = useApi({ url: envs.API_URL });
    const { data } = await api.get('/user-info');

    useStore.getState().setUser(data);
}


export default useStore;
