import { User } from './user.shared';

export type AuthRequest = {
  login: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  access_token: string;
};
