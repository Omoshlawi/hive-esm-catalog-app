import { apiFetch, APIFetchResponse } from "@hive/esm-core-api";
import { Category, CategoryFormData } from "../types";
import useSWR from "swr";

const addCategory = async (data: CategoryFormData) => {
  const res = await apiFetch<Category>("/categories", { method: "POST", data });
  return res.data;
};

const updateCategory = async (
  id: string,
  data: CategoryFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<Category>(`/categories/${id}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteCategory = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const res = await apiFetch<Category>(`/categories/${id}`, {
    method: method,
  });
  return res.data;
};

export const useCategoryApi = () => {
  return {
    addCategory,
    updateCategory,
    deleteCategory,
  };
};

export const useCategories = () => {
  const path = "/categories";
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Category[] }>>(path);
  return {
    categories: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};
