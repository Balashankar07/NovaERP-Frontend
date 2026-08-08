import { useState, useEffect, useCallback } from "react";
import { PaginatedResponse, PaginationParams } from "@/types/api.types";

type ViewState = "loading" | "success" | "error" | "empty";

export interface UseCrudTableOptions<TData> {
  fetchFn: (params: PaginationParams) => Promise<PaginatedResponse<TData>>;
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

  const [queryParams, setQueryParams] = useState<PaginationParams>({
    pageNumber: 1,
    pageSize: defaultPageSize,
    search: "",
    sortBy: defaultSortBy,
    sortOrder: defaultSortOrder,
  });

  const [searchInput, _setSearchInput] = useState("");

  const setSearchInput = useCallback((value: string) => {
    _setSearchInput(value);
    
    if (value.trim() === "") {
      setQueryParams((prev) => {
        if (prev.search === "") return prev;
        return {
          ...prev,
          search: "",
          pageNumber: 1,
          sortBy: defaultSortBy,
          sortOrder: defaultSortOrder,
        };
      });
    }
  }, [defaultSortBy, defaultSortOrder]);

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

  const submitSearch = useCallback((explicitValue?: string) => {
    const trimmed = (explicitValue !== undefined ? explicitValue : searchInput).trim();
    
    if (trimmed === "") {
      setQueryParams((prev) => {
        if (prev.search === "") return prev;
        return {
          ...prev,
          search: "",
          pageNumber: 1,
          sortBy: defaultSortBy,
          sortOrder: defaultSortOrder,
        };
      });
    } else {
      setQueryParams((prev) => ({ ...prev, search: trimmed, pageNumber: 1 }));
    }
  }, [searchInput, defaultSortBy, defaultSortOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    submitSearch();
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
    submitSearch,
    toggleSort,
    setPage,
    refresh,
  };
}
