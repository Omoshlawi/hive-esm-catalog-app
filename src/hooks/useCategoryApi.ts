import { apiFetch } from "@hive/esm-core-api";
import { Category, CategoryFormData } from "../types";

const addCategory = async (data: CategoryFormData) => {
  return await apiFetch<Category>("/categories", { method: "POST", data });
};

const updateCategory = async (
  id: string,
  data: CategoryFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  return await apiFetch<Category>(`/categories/${id}`, {
    method: method,
    data,
  });
};

const deleteCategory = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  return await apiFetch<Category>(`/categories/${id}`, {
    method: method,
  });
};

export const useCategoryApi = () => {
  return {
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
