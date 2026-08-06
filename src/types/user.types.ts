// User types — mirrors backend User DTOs exactly
// DO NOT rename or modify these fields; they match the backend API contract

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyId: string;
  roleId: string;
  isActive: boolean;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  companyId: string;
  roleId: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  phone: string;
  companyId: string;
  roleId: string;
  isActive: boolean;
}
