export interface IJot {
  id: string;
  name: string;
  extension: string;
  description: string | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  jotGroupId: string;
}

export interface IJotWithOwnerAndGroup extends Omit<IJot, "jotGroupId"> {
  owner: {
    id: string;
    name: string;
  };

  jotGroup: {
    id: string;
    totalFiles: number;
  };
}

export interface IPagination {
  page: number;
  size: number;
  totalPages: number;
}

export interface AllJotsResponse {
  jots: IJotWithOwnerAndGroup[];
  pagination: IPagination;
}
