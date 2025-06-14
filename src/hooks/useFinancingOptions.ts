import { apiFetch, APIFetchResponse } from "@hive/esm-core-api";
import useSWR from "swr";
import { FinancingOption, FinancingOptionsFormData } from "../types";

export const useFinancingOptions = () => {
  const url = "/financing-options";
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Array<FinancingOption> }>>(url);

  return { mutate, error, isLoading, data: data?.data?.results ?? [] };
};

const addFinancingOption = async (data: FinancingOptionsFormData) => {
  return await apiFetch<FinancingOption>("/financing-options", {
    method: "POST",
    data,
  });
};

const updateFinancingOption = async (
  id: string,
  data: FinancingOptionsFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  return await apiFetch<FinancingOption>(`/financing-options/${id}`, {
    method: method,
    data,
  });
};

const deleteFinancingOption = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  return await apiFetch<FinancingOption>(`/financing-options/${id}`, {
    method: method,
  });
};

export const useFinancingOptionsApi = () => {
  return {
    addFinancingOption,
    updateFinancingOption,
    deleteFinancingOption,
  };
};
