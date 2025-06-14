import { apiFetch, APIFetchResponse } from "@hive/esm-core-api";
import { Amenity, AmenityFormData } from "../types";
import useSWR from "swr";

const addAmenity = async (data: AmenityFormData) => {
  const res = await apiFetch<Amenity>("/amenities", { method: "POST", data });
  return res.data;
};

const updateAmenity = async (
  amenityId: string,
  data: AmenityFormData,
  method: "PUT" | "PATCH" = "PATCH"
) => {
  const res = await apiFetch<Amenity>(`/amenities/${amenityId}`, {
    method: method,
    data,
  });
  return res.data;
};

const deleteAmenity = async (
  amenityId: string,
  method: "DELETE" | "PURGE" = "DELETE"
) => {
  const res = await apiFetch<Amenity>(`/amenities/${amenityId}`, {
    method: method,
  });
  return res.data;
};

export const useAmenitiesApi = () => {
  return {
    addAmenity,
    updateAmenity,
    deleteAmenity,
  };
};

export const useAmenities = () => {
  const path = "/amenities";
  const { data, error, isLoading, mutate } =
    useSWR<APIFetchResponse<{ results: Amenity[] }>>(path);
  return {
    amenities: data?.data?.results ?? [],
    isLoading,
    error,
    mutate,
  };
};
