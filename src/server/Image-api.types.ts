import { ApiResponse } from "../types/common.types";

export interface ApiConfig {
  params: {
    query: string;
    page: number;
    per_page: number;
  };
  headers: {
    Authorization: string;
  };
}

export type FetchImagesFunction = (
  query: string,
  page?: number
) => Promise<ApiResponse>;
