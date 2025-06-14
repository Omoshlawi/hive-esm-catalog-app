import { apiFetch, APIFetchResponse } from "@hive/esm-core-api";
import { RelationshipType, RelationshipTypeFormData } from "../types";
import useSWR from "swr";

const addRelationshipType = async (data: RelationshipTypeFormData) => {
  const res = await apiFetch<RelationshipType>("/relationship-types", {
    method: "POST",
    data,
  });
  return res.data;
};

const updateRelationshipType = async (
  id: string,
  data: RelationshipTypeFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<RelationshipType>(`/relationship-types/${id}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteRelationshipType = async (
  id: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const res = await apiFetch<RelationshipType>(`/relationship-types/${id}`, {
    method: method,
  });
  return res.data;
};

export const useRelationshipTypeApi = () => {
  return {
    addRelationshipType,
    updateRelationshipType,
    deleteRelationshipType,
  };
};

export const useRelationshipTypes = () => {
  const path = "/relationship-types";
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: RelationshipType[] }>>(path);
  return {
    relationshipTypes: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};
