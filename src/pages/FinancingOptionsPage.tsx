import { PiletApi } from "@hive/esm-shell-app";
import React, { FC } from "react";
import { useFinancingOptions } from "../hooks";
import { FinancingOption } from "../types";
import FinancingOptionForm from "../forms/FinancingOptionForm";
import { ActionIcon, Badge, Group, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import {
  DataTableColumnHeader,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
import { ColumnDef } from "@tanstack/react-table";

type FinancingOptionsPageProps = Pick<PiletApi, "launchWorkspace"> & {};

const FinancingOptionsPage: FC<FinancingOptionsPageProps> = ({
  launchWorkspace,
}) => {
  const financingOptionsAsync = useFinancingOptions();

  const handleAddOrupdate = (financingOption?: FinancingOption) => {
    const dispose = launchWorkspace(
      <FinancingOptionForm
        financingOption={financingOption}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: financingOption
          ? "Update Financing option"
          : "Add Financing option",
        width: "extra-wide",
        expandable: true,
      }
    );
  };
  const handleDelete = (financingOption: FinancingOption) => {
    openConfirmModal({
      title: "Delete financing option",
      children: (
        <Text>
          Are you sure you want to delete this role.This action is destructive
          and will delete all data related to role
        </Text>
      ),
      labels: {
        confirm: "Delete financing option",
        cancel: "No don't delete it",
      },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm() {
        // TODO Implement delete
      },
    });
  };
  return (
    <StateFullDataTable
      title="Financing options"
      onAdd={() => handleAddOrupdate()}
      columns={[
        ...columns,
        {
          id: "actions",
          header: "Actions",
          cell({ row }) {
            const financingOption = row.original;
            return (
              <Group>
                <Group>
                  <ActionIcon
                    variant="outline"
                    aria-label="Settings"
                    color="green"
                    onClick={() => handleAddOrupdate(financingOption)}
                  >
                    <TablerIcon
                      name="edit"
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                  <ActionIcon
                    variant="outline"
                    aria-label="Settings"
                    color="red"
                    onClick={() => handleDelete(financingOption)}
                  >
                    <TablerIcon
                      name="trash"
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Group>
              </Group>
            );
          },
        },
      ]}
      {...financingOptionsAsync}
      withColumnViewOptions
    />
  );
};

export default FinancingOptionsPage;
const columns: ColumnDef<FinancingOption>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "description",
  },

  {
    accessorKey: "voided",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell({ getValue }) {
      const status = !getValue<boolean>();
      return (
        <Badge color={status ? "red" : "teal"} variant={"outline"}>
          {status ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Date Created" />;
    },
    cell({ getValue }) {
      const created = getValue<string>();
      return new Date(created).toDateString();
    },
  },
];
