import { Role } from '@/types';
import { create } from 'zustand';

export type UserInfo = {
  id: string;
  nickname: string;
  email: string;
  avatar: string;
  role: Role;
};

type AuthState = {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user: UserInfo) => set({ user }),
  logout: () => set({ user: null }),
}));
