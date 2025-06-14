import React, { FC } from "react";
import { OwnershipType, OwnershipTypeFormData } from "../types";
import { useOwnershipTypesApi } from "../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OwnershipTypeSchema } from "../utils/validation";
import { mutate } from "swr";
import { showNotification } from "@mantine/notifications";
import { handleApiErrors } from "@hive/esm-core-api";
import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";

type ownershipTypeFormProps = {
  ownershipType?: OwnershipType;
  onSuccess?: (ownershipType: OwnershipType) => void;
  onCloseWorkspace?: () => void;
};

const OwnershipTypeForm: FC<ownershipTypeFormProps> = ({
  onCloseWorkspace,
  onSuccess,
  ownershipType,
}) => {
  const { addOwnershipType, updateownershipType, mutateOwnershipType } =
    useOwnershipTypesApi();

  const form = useForm<OwnershipTypeFormData>({
    defaultValues: {
      name: ownershipType?.name ?? "",
      description: ownershipType?.description,
    },
    resolver: zodResolver(OwnershipTypeSchema),
  });

  const onSubmit: SubmitHandler<OwnershipTypeFormData> = async (data) => {
    try {
      const res = ownershipType
        ? await updateownershipType(ownershipType?.id, data)
        : await addOwnershipType(data);

      onSuccess?.(res);
      onCloseWorkspace?.();
      mutateOwnershipType();
      showNotification({
        title: "succes",
        message: `Ownershi type ${
          ownershipType ? "updated" : "created"
        } succesfull`,
        color: "teal",
      });
    } catch (error) {
      const e = handleApiErrors<OwnershipTypeFormData>(error);
      if (e.detail) {
        showNotification({ title: "error", message: e.detail, color: "red" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof OwnershipTypeFormData, { message: val })
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
                label="Ownership type"
                error={fieldState.error?.message}
                placeholder="Enter type"
              />
            )}
          />
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState: { error } }) => (
              <Textarea
                {...field}
                label="Description"
                error={error?.message}
                placeholder="Description ..."
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

export default OwnershipTypeForm;
