import { Lead } from '@/aws-amplify/graphql-api';
import { atom } from 'recoil';

export const leadsListRStateAtom = atom<Lead[]>({
  key: 'leadsListRStateAtom',
  default: [],
});
