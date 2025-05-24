export interface IJot {
    name: string,
    extension: string,
    description: string | null,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    jotGroupId: string
}

export interface AllJotsResponse {
    jots: IJot[];
}