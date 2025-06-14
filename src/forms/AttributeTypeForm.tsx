import React from "react";
import { AttributeType, AttributeTypeFormData } from "../types";
import { useAttributeTypeApi } from "../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AttributeTypeSchema } from "../utils/validation";
import { showNotification } from "@mantine/notifications";
import { handleApiErrors, mutate } from "@hive/esm-core-api";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { TablerIcon, TablerIconPicker } from "@hive/esm-core-components";

type AttributeTypeFormProps = {
  attributeType?: AttributeType;
  onSuccess?: (attrType: AttributeType) => void;
  onCloseWorkspace?: () => void;
};
const AttributeTypeForm: React.FC<AttributeTypeFormProps> = ({
  attributeType,
  onCloseWorkspace,
  onSuccess,
}) => {
  const { addAttributeType, updateAttributeType } = useAttributeTypeApi();

  const form = useForm<AttributeTypeFormData>({
    defaultValues: {
      name: attributeType?.name ?? "",
      icon: attributeType?.icon,
    },
    resolver: zodResolver(AttributeTypeSchema),
  });

  const onSubmit: SubmitHandler<AttributeTypeFormData> = async (data) => {
    try {
      const res = attributeType
        ? await updateAttributeType(attributeType?.id, data)
        : await addAttributeType(data);
      showNotification({
        title: "succes",
        message: `attribute ${
          attributeType ? "updated" : "created"
        } succesfull`,
        color: "teal",
      });
      onCloseWorkspace?.();
      onSuccess?.(res);
      mutate("/attribute-types");
    } catch (error) {
      const e = handleApiErrors<AttributeTypeFormData>(error);
      if (e.detail) {
        showNotification({ title: "error", message: e.detail, color: "red" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof AttributeTypeFormData, { message: val })
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
                label="Attribute type"
                error={fieldState.error?.message}
                placeholder="Enter attribute type name"
              />
            )}
          />
          <Controller
            control={form.control}
            name="icon"
            render={({ field, fieldState: { error } }) => (
              <TablerIconPicker
                initialIcon={(field.value?.name as any) ?? "search"}
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
                      field.value?.name ?? ""
                    }`}
                    leftSection={
                      field.value && (
                        <TablerIcon name={field.value?.name as any} />
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

export default AttributeTypeForm;
