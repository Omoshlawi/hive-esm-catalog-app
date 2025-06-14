import { PiletApi } from "@hive/esm-shell-app";
import React, { FC } from "react";
import { OwnershipType } from "../types";
import {
  DataTableColumnHeader,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
import { ActionIcon, Badge, Group } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import { useOwnershipTypes } from "../hooks";
import OwnershipTypeForm from "../forms/OwnershipTypeForm";
import { openConfirmModal } from "@mantine/modals";
import { Text } from "@mantine/core";
type OwnershipTypesPageProps = Pick<PiletApi, "launchWorkspace"> & {};

const OwnershipTypesPage: FC<OwnershipTypesPageProps> = ({
  launchWorkspace,
}) => {
  const ownershipTypesAsync = useOwnershipTypes();

  const handleAddOrupdate = (ownershipType?: OwnershipType) => {
    const dispose = launchWorkspace(
      <OwnershipTypeForm
        ownershipType={ownershipType}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: ownershipType
          ? "Update Financing option"
          : "Add Financing option",
        width: "extra-wide",
        expandable: true,
      }
    );
  };
  const handleDelete = (ownershipType: OwnershipType) => {
    openConfirmModal({
      title: "Delete ownership type",
      children: (
        <Text>
          Are you sure you want to delete this role.This action is destructive
          and will delete all data related to role
        </Text>
      ),
      labels: {
        confirm: "Delete ownership type",
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
            const ownershiptype = row.original;
            return (
              <Group>
                <Group>
                  <ActionIcon
                    variant="outline"
                    aria-label="Settings"
                    color="green"
                    onClick={() => handleAddOrupdate(ownershiptype)}
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
                    onClick={() => handleDelete(ownershiptype)}
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
      {...ownershipTypesAsync}
      withColumnViewOptions
    />
  );
};

export default OwnershipTypesPage;
const columns: ColumnDef<OwnershipType>[] = [
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
