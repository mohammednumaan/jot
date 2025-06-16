interface IJotGroup {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  totalFiles: number;
}

interface IProfileJots {
  jots: IJotGroup[];
  paginaton: {
    page: number;
    size: number;
    totalPages: number;
  };
}

export type { IProfileJots };
