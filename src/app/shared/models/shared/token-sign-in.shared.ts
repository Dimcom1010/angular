import type { User } from './user.shared';

export type TokenSignRequest = {
  access_token: string;
};
export type TokenSignResponse = {
  user: User;
  access_token: string;
};
