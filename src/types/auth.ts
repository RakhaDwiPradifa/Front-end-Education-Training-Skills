// src/types/auth.ts

export interface User {
  id: number;
  name: string;
  email: string;
  role: string; // Assuming the roles are something like 'admin', 'user', etc.
  gender: string;
  birth_date: string;
  address: string | null;
  phone_number: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string; // Make sure to include this for confirming the password
  gender: string;
  birth_date: string;
  address: string | null;
  phone_number: string | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
