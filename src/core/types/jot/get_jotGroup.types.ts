import { IJot } from "./jots";

export interface GetJotGroupResponse {
    jots: IJot[]
    description: string | null;
}