export interface IJotPayload {
  id: string;
  name: string;
  content: string;
}

export interface IJotState {
  jots: IJotPayload[];
  description: string | null;
}
