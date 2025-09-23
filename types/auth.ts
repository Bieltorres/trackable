export interface JWTPayload {
  sub: string;
  email: string;
}

export interface UserSafe {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}
