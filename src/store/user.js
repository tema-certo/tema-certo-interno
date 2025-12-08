import { create } from 'zustand';

export default function userResources(set) {
    return {
        user: null,
        setUserToken: (token) => set({ token }),
    };
}
