import userResources from '@/store/user';
import { create } from 'zustand';

const useStore = create((set) => (
    {
        ...userResources(set),
    }
));

export default useStore;
