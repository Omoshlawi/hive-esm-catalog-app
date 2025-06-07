import React from "react";
import { useAddresses } from "../hooks";
import { PiletApi } from "@hive/esm-shell-app";
import { Address } from "../types";
import AddressForm from "../forms/AddressForm";
import { openConfirmModal } from "@mantine/modals";
import { ActionIcon, Button, Group, Text } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import {
  DataTable,
  DataTableColumnHeader,
  EmptyState,
  ErrorState,
  TablerIcon,
  TableSkeleton,
  When,
} from "@hive/esm-core-components";
import { IconPlus } from "@tabler/icons-react";

type AddressBookPageProps = Pick<PiletApi, "launchWorkspace"> & {};

const AddressBookPage: React.FC<AddressBookPageProps> = ({
  launchWorkspace,
}) => {
  const addressState = useAddresses({});

  const title = "Addresses";
  const handleAddOrupdate = (address?: Address) => {
    const dispose = launchWorkspace(
      <AddressForm
        address={address}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: address ? "Update Address" : "Add Address",
      }
    );
  };
  const handleDelete = (address: Address) => {
    openConfirmModal({
      title: "Delete Address",
      children: (
        <Text>
          Are you sure you want to delete this role.This action is destructive
          and will delete all data related to role
        </Text>
      ),
      labels: { confirm: "Delete aDDRESS", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm() {
        // TODO Implement delete
      },
    });
  };

  const actions: ColumnDef<Address> = {
    id: "actions",
    header: "Actions",
    cell({ row }) {
      const address = row.original;
      return (
        <Group>
          <Group>
            <ActionIcon
              variant="outline"
              aria-label="Settings"
              color="green"
              onClick={() => handleAddOrupdate(address)}
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
              onClick={() => handleDelete(address)}
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
  };
  return (
    <When
      asyncState={{ ...addressState, data: addressState.addresses }}
      loading={() => <TableSkeleton />}
      error={(e) => <ErrorState error={e} title={title} />}
      success={(data) => {
        if (!data.length)
          return <EmptyState title={title} onAdd={() => handleAddOrupdate()} />;
        return (
          <DataTable
            data={data}
            columns={[...columns, actions]}
            renderActions={() => (
              <>
                <Button
                  variant="light"
                  leftSection={<IconPlus />}
                  onClick={() => handleAddOrupdate()}
                >
                  Add
                </Button>
              </>
            )}
            title={title}
            withColumnViewOptions
          />
        );
      }}
    />
  );
};

export default AddressBookPage;

const columns: ColumnDef<Address>[] = [
  {
    accessorKey: "name",
    header: "Address",
  },
  { accessorKey: "description", header: "Description" },
  {
    accessorKey: "county",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="County" />;
    },
  },
  {
    accessorKey: "subCounty",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Subcounty" />;
    },
  },
  {
    accessorKey: "ward",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Ward" />;
    },
  },
  {
    accessorKey: "landmark",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Landmark" />;
    },
  },
  {
    accessorKey: "postalCode",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Postal code" />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell({ getValue }) {
      const created = getValue<string>();
      return new Date(created).toDateString();
    },
  },
];
