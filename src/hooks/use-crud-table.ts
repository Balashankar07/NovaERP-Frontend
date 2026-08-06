import { useState, useEffect, useCallback } from "react";
import { PaginatedResponse, PaginationParams } from "@/types/api.types";

type ViewState = "loading" | "success" | "error" | "empty";

export interface UseCrudTableOptions<TData> {
  fetchFn: (params: PaginationParams & { sortBy?: string, sortOrder?: string }) => Promise<PaginatedResponse<TData>>;
  defaultSortBy?: string;
  defaultSortOrder?: "asc" | "desc";
  defaultPageSize?: number;
}

export function useCrudTable<TData>({
  fetchFn,
  defaultSortBy = "Id",
  defaultSortOrder = "asc",
  defaultPageSize = 10,
}: UseCrudTableOptions<TData>) {
  const [viewState, setViewState] = useState<ViewState>("loading");
  const [data, setData] = useState<PaginatedResponse<TData> | null>(null);

  const [queryParams, setQueryParams] = useState<PaginationParams & { sortBy?: string, sortOrder?: string }>({
    pageNumber: 1,
    pageSize: defaultPageSize,
    search: "",
    sortBy: defaultSortBy,
    sortOrder: defaultSortOrder,
  });

  const [searchInput, setSearchInput] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setViewState("loading");
      const res = await fetchFn(queryParams);

      if (res.items.length === 0 && queryParams.pageNumber === 1 && !queryParams.search) {
        setViewState("empty");
      } else {
        setData(res);
        setViewState("success");
      }
    } catch (error) {
      setViewState("error");
      console.error("Failed to fetch table data", error);
    }
  }, [fetchFn, queryParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQueryParams((prev) => ({ ...prev, search: searchInput, pageNumber: 1 }));
  };

  const toggleSort = (field: string) => {
    setQueryParams((prev) => ({
      ...prev,
      pageNumber: 1,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  const setPage = (newPage: number) => {
    setQueryParams((prev) => ({ ...prev, pageNumber: newPage }));
  };

  const refresh = () => {
    fetchData();
  };

  return {
    viewState,
    data,
    queryParams,
    searchInput,
    setSearchInput,
    handleSearch,
    toggleSort,
    setPage,
    refresh,
  };
}
