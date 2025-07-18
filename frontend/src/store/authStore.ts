import { create } from 'zustand';
import type { UserResponse } from '@/types';

type AuthState = {
  userInfo: UserResponse | null;
  logout: () => void;
  setCredentials: (data: UserResponse) => void;
};

const authStore = create<AuthState>((set) => ({
  userInfo: (() => {
    const stored = localStorage.getItem('userInfo');
    return stored ? (JSON.parse(stored) as UserResponse) : null;
  })(),

  logout: () => {
    set({ userInfo: null });
    localStorage.removeItem('userInfo');
  },

  setCredentials: (data: UserResponse) => {
    set({ userInfo: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  },
}));

const useAuthStore = () => {
  const { userInfo, setCredentials, logout } = authStore();
  return { userInfo, setCredentials, logout };
};

export { useAuthStore };
