export interface ILoginState {
  email: string;
  password: string;
  error: string[] | string | null;
}

export interface ILoginResponse {
  email: string,
  username: string,
  avatar: string,
  joinedAt: Date
}

export type LoginPayloadType = Omit<ILoginState, "error">;