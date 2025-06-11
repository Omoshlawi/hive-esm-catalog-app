import { InputSkeleton } from "@hive/esm-core-components";
import { Select } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { usePlaces } from "../hooks";
import { AddressFormData } from "../types";

const AddressFormInputs = () => {
  const form = useFormContext<AddressFormData>();
  const { watch, setValue } = form;

  const county = watch("county");
  const subCounty = watch("subCounty");
  const ward = watch("ward");

  const { counties: locations, error, isLoading } = usePlaces({});

  const subCounties = useMemo(
    () => locations.find((l) => l?.name === county)?.subCounties ?? [],
    [county, locations]
  );

  const wards = useMemo(
    () => subCounties.find((l) => l?.name === subCounty)?.wards ?? [],
    [subCounty, subCounties]
  );

  // Only reset subCounty if county changes AND locations are loaded AND the current subCounty doesn't belong to the new county
  useEffect(() => {
    if (county && subCounty && locations.length > 0) {
      const isValidSubCounty = subCounties.some((sc) => sc?.name === subCounty);
      if (!isValidSubCounty) {
        setValue("subCounty", "");
      }
    }
  }, [county, subCounty, subCounties, setValue, locations]);

  // Similar logic for ward, ensuring locations and subCounties are loaded
  useEffect(() => {
    if (subCounty && ward && subCounties.length > 0) {
      const isValidWard = wards.some((w) => w?.name === ward);
      if (!isValidWard) {
        setValue("ward", "");
      }
    }
  }, [subCounty, ward, wards, setValue, subCounties]);

  useEffect(() => {
    if (error) {
      showNotification({
        message: error?.message ?? "An error occurred while fetching locations",
        title: "Error loading locations",
      });
    }
  }, [error]);

  return (
    <>
      <Controller
        control={form.control}
        name="county"
        render={({ field, fieldState }) =>
          isLoading ? (
            <InputSkeleton />
          ) : (
            <Select
              {...field}
              value={field.value || null}
              data={locations.map((l) => l?.name)}
              label="County"
              error={fieldState.error?.message}
              nothingFoundMessage="Nothing found..."
              searchable
            />
          )
        }
      />
      <Controller
        control={form.control}
        name="subCounty"
        render={({ field, fieldState }) =>
          isLoading ? (
            <InputSkeleton />
          ) : (
            <Select
              {...field}
              value={field.value || null}
              data={subCounties.map((l) => l?.name)}
              label="Sub county"
              error={fieldState.error?.message}
              searchable
              nothingFoundMessage="Nothing found..."
              disabled={!county}
            />
          )
        }
      />
      <Controller
        control={form.control}
        name="ward"
        render={({ field, fieldState }) =>
          isLoading ? (
            <InputSkeleton />
          ) : (
            <Select
              {...field}
              value={field.value || null}
              data={wards.map((l) => l?.name)}
              label="Ward"
              error={fieldState.error?.message}
              searchable
              nothingFoundMessage="Nothing found..."
              disabled={!subCounty}
            />
          )
        }
      />
    </>
  );
};

export default AddressFormInputs;
