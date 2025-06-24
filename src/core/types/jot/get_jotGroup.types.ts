import { IJot } from "./jots";

export interface GetJotGroupResponse {
  jots: IJot[];
  owner: {
    id: string;
    name: string;
  };
  jotGroup: {
    id: string;
    description: string;
  };
}
