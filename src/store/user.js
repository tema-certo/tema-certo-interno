import { create } from 'zustand';

export default function userResources(set) {
    return {
        user: null,
        setUser: (user) => set({ user }),
    };
}
