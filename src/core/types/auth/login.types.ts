export interface IUser {
  username: string;
  avatar: string;
  joinedAt: Date;
}

export interface ILoginState {
  username: string;
  password: string;
  error: string[] | string | null;
}

export interface ILoginResponse {
  user: IUser;
}

export interface IAuthenticationStatusResponse {
  status: boolean;
  username: string | null;
}

export type LoginPayloadType = Omit<ILoginState, "error">;
