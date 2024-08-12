import { create } from 'zustand';

interface UserState {
    name: string;
    role: string;
    accessToken: string;
    setUser: (name: string, role: string, accessToken: string) => void;
    clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
    name: '',
    role: '',
    accessToken: '',
    setUser: (name, role, accessToken) =>
        set({
            name,
            role,
            accessToken,
        }),
    clearUser: () => set({ name: '', role: '', accessToken: '' }),
}));

export default useUserStore;
