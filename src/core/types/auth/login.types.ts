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

export interface IAuthenticatedStatus {
  status: boolean;
}

export type LoginPayloadType = Omit<ILoginState, "error">;
