import { AuthorResponse } from './author.model';
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export interface UserResponse {
  successful: boolean;
  result: User;
}

export interface LoginResponse {
  successful: boolean;
  result: string;
  user: {
    email: string;
    name: string;
  };
}
