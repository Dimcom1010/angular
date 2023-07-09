export type User = {
  id: number;
  login: string;
  deleted_at: Date;
  rule: Rule;
  profile: Profile;
};
export type Rule = {
  is_super_admin: boolean;
  is_admin: boolean;
  is_premium: boolean;
};
export type Profile = {
  avatar_path: string;
  name: string;
  email: string;
};
