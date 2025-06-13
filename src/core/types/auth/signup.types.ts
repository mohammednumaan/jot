export interface ISignupState {
  username: string;
  password: string;
  confirm_password: string;
  error: string[] | string | null;
}

export interface ISignupResponse {
  username: string,
  avatar: string,
  joinedAt: Date
}

export type SignupPayloadType = Omit<ISignupState, "error">;
