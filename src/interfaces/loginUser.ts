export interface LoginUser {
  phone: string;
  email: string;
  password: string;
}

export interface LoginUserGoogle {
  accessToken: string;
  email: string | null;
  phone: string;
}
