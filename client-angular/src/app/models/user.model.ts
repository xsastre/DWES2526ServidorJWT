export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  enabled: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface JwtResponse {
  token: string;
  type: string;
  username: string;
  email: string;
  role: string;
}

export interface MessageResponse {
  message: string;
}

export interface UpdateUserRequest {
  username?: string;
  password?: string;
  email?: string;
  role?: string;
  enabled?: boolean;
}
