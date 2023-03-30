import { atom } from 'recoil';
import { IUserAuthData } from 'types';

export const userAuthRStateAtom = atom<IUserAuthData | null>({
  key: 'userAuthRStateAtom_key',
  default: null,
});
