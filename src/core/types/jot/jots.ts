export interface IJot {
    name: string,
    extension: string,
    description: string | null,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    jotGroupId: string
}

export interface IPagination {
    page: number;
    size: number;
    totalPages: number;
}

export interface AllJotsResponse {
    jots: IJot[];
    pagination: IPagination
}