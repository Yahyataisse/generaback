export interface MySQLUser {
  id: number;
  email: string;
  password?: string;
  name?: string;
  provider: string;
  provider_id?: string;
  supabase_uid?: string;
  email_verified: boolean;
  verification_token?: string;
  reset_token?: string;
  reset_token_expires?: Date;
  last_login?: Date;
  last_logout?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  user?: MySQLUser;
  redirectTo?: string;
}