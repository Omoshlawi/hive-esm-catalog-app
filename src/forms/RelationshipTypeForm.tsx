import { handleApiErrors, mutate } from "@hive/esm-core-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRelationshipTypeApi } from "../hooks";
import { RelationshipType, RelationshipTypeFormData } from "../types";
import { RelationshipTypeSchema } from "../utils/validation";

type RelationshipTypeFormProps = {
  relationshipType?: RelationshipType;
  onSuccess?: (rtype: RelationshipType) => void;
  onCloseWorkspace?: () => void;
};
const RelationshipTypeForm: React.FC<RelationshipTypeFormProps> = ({
  onCloseWorkspace,
  onSuccess,
  relationshipType,
}) => {
  const { addRelationshipType, updateRelationshipType } =
    useRelationshipTypeApi();
  const form = useForm<RelationshipTypeFormData>({
    defaultValues: {
      aIsToB: relationshipType?.aIsToB ?? "",
      bIsToA: relationshipType?.bIsToA ?? "",
      description: relationshipType?.description,
    },
    resolver: zodResolver(RelationshipTypeSchema),
  });

  const onSubmit: SubmitHandler<RelationshipTypeFormData> = async (data) => {
    try {
      const res = relationshipType
        ? await updateRelationshipType(relationshipType?.id, data)
        : await addRelationshipType(data);

      onSuccess?.(res);
      onCloseWorkspace?.();
      showNotification({
        title: "succes",
        message: `relationship type ${
          relationshipType ? "updated" : "created"
        } succesfull`,
        color: "teal",
      });
      mutate("/relationship-types");
    } catch (error) {
      const e = handleApiErrors<RelationshipTypeFormData>(error);
      if (e.detail) {
        showNotification({ title: "error", message: e.detail, color: "red" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof RelationshipTypeFormData, { message: val })
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
            name="aIsToB"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="A is to B"
                error={fieldState.error?.message}
                placeholder="e.g is part of"
              />
            )}
          />
          <Controller
            control={form.control}
            name="bIsToA"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="B is to A"
                error={fieldState.error?.message}
                placeholder="e.g contains"
              />
            )}
          />
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Textarea
                {...field}
                label="Description"
                error={fieldState.error?.message}
                placeholder="Describe the relationship"
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

export default RelationshipTypeForm;
