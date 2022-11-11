export interface User {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export interface UserResponse {
  successful: boolean;
  result: User & {
    id: string;
  };
}
