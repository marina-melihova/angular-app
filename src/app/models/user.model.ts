export interface Credentials {
  email: string;
  password: string;
}

export interface User extends Credentials {
  id: string;
  name: string;
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
