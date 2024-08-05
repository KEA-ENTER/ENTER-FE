import create from 'zustand';

interface UserState {
    username: string;
    token: string;
    role: string;
    setUser: (username: string, token: string, role: string) => void;
    clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
    username: '',
    token: '',
    role: '',
    setUser: (username, token, role) => set({ username, token, role }),
    clearUser: () => set({ username: '', token: '', role: '' }),
}));

export default useUserStore;
