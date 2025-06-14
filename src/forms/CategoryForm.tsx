import React from "react";
import { Category, CategoryFormData } from "../types";
import { useCategoryApi } from "../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { handleApiErrors, mutate } from "@hive/esm-core-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "../utils/validation";
import { showNotification } from "@mantine/notifications";
import { TablerIconPicker, TablerIcon } from "@hive/esm-core-components";
import { Stack, TextInput, Group, Button } from "@mantine/core";

type CategoryFormProps = {
  category?: Category;
  onSuccess?: (category: Category) => void;
  onCloseWorkspace?: () => void;
};
const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onCloseWorkspace,
  onSuccess,
}) => {
  const { addCategory, updateCategory } = useCategoryApi();

  const form = useForm<CategoryFormData>({
    defaultValues: {
      name: category?.name ?? "",
      icon: category?.icon,
    },
    resolver: zodResolver(CategorySchema),
  });

  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
    try {
      const res = category
        ? await updateCategory(category?.id, data)
        : await addCategory(data);

      onSuccess?.(res);
      onCloseWorkspace?.();
      mutate("/categories");
      showNotification({
        title: "succes",
        message: `category ${category ? "updated" : "created"} succesfull`,
        color: "teal",
      });
    } catch (error) {
      const e = handleApiErrors<CategoryFormData>(error);
      if (e.detail) {
        showNotification({ title: "error", message: e.detail, color: "red" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof CategoryFormData, { message: val })
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
                label="Category"
                error={fieldState.error?.message}
                placeholder="Enter category name"
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
                    onClick={onTrigger}
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

export default CategoryForm;
