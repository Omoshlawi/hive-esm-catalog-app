import { apiFetch, APIFetchResponse, mutate } from "@hive/esm-core-api";
import useSWR from "swr";
import { FinancingOption, FinancingOptionsFormData } from "../types";

export const useFinancingOptions = () => {
  const url = "/financing-options";
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Array<FinancingOption> }>>(url);

  return { mutate, error, isLoading, data: data?.data?.results ?? [] };
};

const addFinancingOption = async (data: FinancingOptionsFormData) => {
  const res = await apiFetch<FinancingOption>("/financing-options", {
    method: "POST",
    data,
  });
  return res.data;
};

const updateFinancingOption = async (
  id: string,
  data: FinancingOptionsFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<FinancingOption>(`/financing-options/${id}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteFinancingOption = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const res = await apiFetch<FinancingOption>(`/financing-options/${id}`, {
    method: method,
  });
  return res.data;
};

export const useFinancingOptionsApi = () => {
  return {
    addFinancingOption,
    updateFinancingOption,
    deleteFinancingOption,
    mutateFinancingOption: () => mutate("/financing-options"),
  };
};
