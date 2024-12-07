// src/types/auth.types.ts
export interface LoginFormValues {
    email: string;
    password: string;
    rememberMe?: boolean;
  }
  
  export interface SignUpFormValues extends LoginFormValues {
    name: string;
    confirmPassword: string;
  }