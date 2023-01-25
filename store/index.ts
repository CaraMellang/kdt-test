import create from 'zustand';
import { combine, devtools } from 'zustand/middleware';

type UserInfo = {
  id?: string | null;
  username?: string | null;
  email?: string | null;
  password?: string | null;
};

const initialState: UserInfo = {
  id: null,
  username: null,
  email: null,
  password: null,
};

export const useStore = create(
  devtools(
    combine(initialState, (set) => ({
      signin: (userInfo: UserInfo) => {
        console.log('사인인 ', userInfo);
        set((state) => ({
          id: userInfo.id,
          username: userInfo.username,
          email: userInfo.email,
          password: userInfo.password,
        }));
      },
    })),
  ),
);

export const hydrateStore = (initialState: any) => {
  // if (initialState) useStore.setState(initialState);
  // return initialState;

  return useStore(initialState);
};
