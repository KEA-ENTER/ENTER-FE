import { create } from 'zustand';

interface UserState {
    name: string;
    role: string;
    accessToken: string;
    state: string;
    setUser: (name: string, role: string, accessToken: string, state: string) => void;
    clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
    name: '',
    role: '',
    accessToken: '',
    state: '',
    setUser: (name, role, accessToken, state) =>
        set({
            name,
            role,
            accessToken,
            state,
        }),
    clearUser: () => set({ name: '', role: '', accessToken: '', state: '' }),
}));

export default useUserStore;
