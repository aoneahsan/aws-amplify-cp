import { atom, selector } from 'recoil';
import { IUserAuthData } from 'types';
import { get as _GET } from 'underscore';

export const userAuthRStateAtom = atom<IUserAuthData | null>({
  key: 'userAuthRStateAtom_key',
  default: null,
});

export const getAuthenticatedUserIdRStateSelector = selector<
  string | undefined
>({
  key: 'getAuthenticatedUserIdRStateSelector_key',
  get: ({ get }) => {
    const userAuthData = get(userAuthRStateAtom);

    return userAuthData ? _GET(userAuthData, 'id') : undefined;
  },
});

export const isAuthenticatedRStateSelector = selector<boolean>({
  key: 'isAuthenticatedRStateSelector_key',
  get: ({ get }) => {
    const authenticatedUserId = get(getAuthenticatedUserIdRStateSelector);

    return authenticatedUserId !== undefined;
  },
});
