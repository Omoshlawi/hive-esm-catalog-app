import React, { FC } from "react";
import { FinancingOption, FinancingOptionsFormData } from "../types";
import { useFinancingOptions, useFinancingOptionsApi } from "../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FinancingOptionSchema } from "../utils/validation";
import { handleApiErrors } from "@hive/esm-core-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, TextInput, Textarea, Group, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

type FinancingOptionFormProps = {
  financingOption?: FinancingOption;
  onSuccess?: (financingOption: FinancingOption) => void;
  onCloseWorkspace?: () => void;
};
const FinancingOptionForm: FC<FinancingOptionFormProps> = ({
  financingOption,
  onCloseWorkspace,
  onSuccess,
}) => {
  const { addFinancingOption, updateFinancingOption, mutateFinancingOption } =
    useFinancingOptionsApi();

  const form = useForm<FinancingOptionsFormData>({
    defaultValues: {
      name: financingOption?.name ?? "",
      description: financingOption?.description,
    },
    resolver: zodResolver(FinancingOptionSchema),
  });

  const onSubmit: SubmitHandler<FinancingOptionsFormData> = async (data) => {
    try {
      const res = financingOption
        ? await updateFinancingOption(financingOption?.id, data)
        : await addFinancingOption(data);

      onSuccess?.(res);
      onCloseWorkspace?.();
      mutateFinancingOption();
      showNotification({
        title: "succes",
        message: `Financing option ${
          financingOption ? "updated" : "created"
        } succesfull`,
        color: "teal",
      });
    } catch (error) {
      const e = handleApiErrors<FinancingOptionsFormData>(error);
      if (e.detail) {
        showNotification({ title: "error", message: e.detail, color: "red" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof FinancingOptionsFormData, { message: val })
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
                label="Financing option"
                error={fieldState.error?.message}
                placeholder="Enter option"
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

export default FinancingOptionForm;
