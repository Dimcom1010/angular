export interface UserName {
  id?: string;
  name: string;
}
export interface User {
  id?: string;
  name: string;
  password: string;
}
export interface User_nodes {
  nodes: User[];
  totalCount: string | number;
}
