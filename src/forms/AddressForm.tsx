import React from "react";
import { Address, AddressFormData } from "../types";
import { useAddressApi } from "../hooks";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema } from "../utils/validation";
import { handleApiErrors, mutate } from "@hive/esm-core-api";
import { showNotification } from "@mantine/notifications";
import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import AddressFormInputs from "./AddressFormInputs";

type AddressFormProps = {
  address?: Address;
  onSuccess?: (address: Address) => void;
  onCloseWorkspace?: () => void;
};

const AddressForm: React.FC<AddressFormProps> = ({
  address,
  onCloseWorkspace,
  onSuccess,
}) => {
  const { addAddress, updateAddress } = useAddressApi();
  const form = useForm<AddressFormData>({
    defaultValues: {
      name: address?.name ?? "",
      description: address?.description,
      county: address?.county ?? "",
      subCounty: address?.subCounty ?? "",
      landmark: address?.landmark ?? "",
      // latitude: address?.latitude ?? undefined,
      // longitude: address?.longitude ?? undefined,
      postalCode: address?.postalCode ?? undefined,
      village: address?.village ?? undefined,
      ward: address?.ward ?? "",
    },
    resolver: zodResolver(AddressSchema),
  });

  const onSubmit: SubmitHandler<AddressFormData> = async (data) => {
    try {
      const res = address
        ? await updateAddress(address?.id, data)
        : await addAddress(data);
      onSuccess?.(res.data);
      onCloseWorkspace?.();
      mutate("/addresses");
      showNotification({
        title: "succes",
        message: `address ${address ? "updated" : "created"} succesfull`,
        color: "teal",
      });
    } catch (error) {
      const e = handleApiErrors<AddressFormData>(error);
      if (e.detail) {
        showNotification({ title: "error", message: e.detail, color: "teal" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof AddressFormData, { message: val })
        );
    }
  };

  return (
    <FormProvider {...form}>
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
                  label="Address name"
                  error={fieldState.error?.message}
                  placeholder="Address"
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
                  placeholder="Brief address description"
                />
              )}
            />
            <AddressFormInputs />
            <Controller
              control={form.control}
              name="landmark"
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label="Landmark"
                  error={fieldState.error?.message}
                  placeholder="Enter nearby school, building, e.t.c"
                />
              )}
            />
            <Controller
              control={form.control}
              name="postalCode"
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  label="Postal Code"
                  error={fieldState.error?.message}
                  placeholder="Enter postal code"
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
    </FormProvider>
  );
};

export default AddressForm;
