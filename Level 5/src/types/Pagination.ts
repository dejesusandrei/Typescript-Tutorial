type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type PaginatedResponse<T> = {
  data: T[];
  pagination: Pagination;
  success: boolean;
};