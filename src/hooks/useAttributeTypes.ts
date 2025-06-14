import { apiFetch, APIFetchResponse } from "@hive/esm-core-api";
import { AttributeType, AttributeTypeFormData } from "../types";
import useSWR from "swr";

const addAttributeType = async (data: AttributeTypeFormData) => {
  const res = await apiFetch<AttributeType>("/attribute-types", {
    method: "POST",
    data,
  });
  return res.data;
};

const updateAttributeType = async (
  id: string,
  data: AttributeTypeFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<AttributeType>(`/attribute-types/${id}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteAttributeType = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const res = await apiFetch<AttributeType>(`/attribute-types/${id}`, {
    method: method,
  });
  return res.data;
};

export const useAttributeTypeApi = () => {
  return {
    addAttributeType,
    updateAttributeType,
    deleteAttributeType,
  };
};

export const useAttributeTypes = () => {
  const path = "/attribute-types";
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: AttributeType[] }>>(path);
  return {
    attributeTypes: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};
