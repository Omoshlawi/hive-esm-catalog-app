import { apiFetch, APIFetchResponse, mutate } from "@hive/esm-core-api";
import useSWR from "swr";
import { OwnershipType, OwnershipTypeFormData } from "../types";

export const useOwnershipTypes = () => {
  const url = "/ownership-types";
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Array<OwnershipType> }>>(url);

  return { mutate, error, isLoading, data: data?.data?.results ?? [] };
};

const addOwnershipType = async (data: OwnershipTypeFormData) => {
  const res = await apiFetch<OwnershipType>("/ownership-types", {
    method: "POST",
    data,
  });
  return res.data;
};

const updateownershipType = async (
  id: string,
  data: OwnershipTypeFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<OwnershipType>(`/ownership-types/${id}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteOwnershipType = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const res = await apiFetch<OwnershipType>(`/ownership-types/${id}`, {
    method: method,
  });
  return res.data;
};

export const useOwnershipTypesApi = () => {
  return {
    addOwnershipType,
    updateownershipType,
    deleteOwnershipType,
    mutateOwnershipType: () => mutate("/ownership-types"),
  };
};
