import { create } from 'zustand';

interface UserState {
    name: string;
    state: string;
    setUser: (name: string, state: string) => void;
    clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
    name: '',
    role: '',
    accessToken: '',
    state: '',
    setUser: (name, state) =>
        set({
            name,
            state,
        }),
    clearUser: () => set({ name: '', state: '' }),
}));

export default useUserStore;
