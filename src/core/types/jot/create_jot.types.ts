export interface IEditorState {
  id: string;
  name: string;
  content: string;
}

export interface IJotPayload {
  jots: IEditorState[];
  description: string | null;
}
