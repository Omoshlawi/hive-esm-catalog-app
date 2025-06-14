import { handleApiErrors, mutate } from "@hive/esm-core-api";
import { TablerIcon, TablerIconPicker } from "@hive/esm-core-components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAmenitiesApi } from "../hooks";
import { Amenity, AmenityFormData } from "../types";
import { AmenitySchema } from "../utils/validation";

type AmenityFormProps = {
  amenity?: Amenity;
  onSuccess?: (amenity: Amenity) => void;
  onCloseWorkspace?: () => void;
};

const AmenityForm: React.FC<AmenityFormProps> = ({
  amenity,
  onCloseWorkspace,
  onSuccess,
}) => {
  const { addAmenity, updateAmenity } = useAmenitiesApi();
  const form = useForm<AmenityFormData>({
    defaultValues: {
      name: amenity?.name ?? "",
      icon: amenity?.icon,
    },
    resolver: zodResolver(AmenitySchema),
  });

  const onSubmit: SubmitHandler<AmenityFormData> = async (data) => {
    try {
      const res = amenity
        ? await updateAmenity(amenity?.id, data)
        : await addAmenity(data);
      onSuccess?.(res);
      onCloseWorkspace?.();
      mutate("/amenities");
      showNotification({
        title: "succes",
        message: `amenity ${amenity ? "updated" : "created"} succesfull`,
        color: "teal",
      });
    } catch (error) {
      const e = handleApiErrors<AmenityFormData>(error);
      if (e.detail) {
        showNotification({ title: "error", message: e.detail, color: "red" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof AmenityFormData, { message: val })
        );
    }
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stack p={"md"} h={"100%"} justify="space-between">
        <Stack gap={"md"}>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="Amenity"
                error={fieldState.error?.message}
                placeholder="Enter amenity"
              />
            )}
          />
          <Controller
            control={form.control}
            name="icon"
            render={({ field, fieldState: { error } }) => (
              <TablerIconPicker
                initialIcon={(field?.value?.name as any) ?? "search"}
                onIconSelect={(icon) =>
                  field.onChange({ family: "TablerIcons", name: icon })
                }
                renderTriggerComponent={({ onTrigger }) => (
                  <TextInput
                    onClick={onTrigger}
                    label="Icon"
                    placeholder="search icon"
                    readOnly
                    value={`${field.value?.family ?? ""}/${
                      field?.value?.name ?? ""
                    }`}
                    leftSection={
                      field.value && (
                        <TablerIcon name={field?.value?.name as any} />
                      )
                    }
                    error={error?.message}
                  />
                )}
              />
            )}
          />
        </Stack>
        <Group gap={1}>
          <Button
            flex={1}
            variant="default"
            radius={0}
            onClick={onCloseWorkspace}
          >
            Cancel
          </Button>
          <Button
            radius={0}
            flex={1}
            fullWidth
            type="submit"
            variant="filled"
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default AmenityForm;
