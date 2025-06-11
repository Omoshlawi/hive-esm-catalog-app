import {
  DataTable,
  EmptyState,
  ErrorState,
  TablerIcon,
  TableSkeleton,
  When,
} from "@hive/esm-core-components";
import { PiletApi } from "@hive/esm-shell-app";
import { ActionIcon, Button, Group, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconPlus } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import AttributeTypeForm from "../forms/AttributeTypeForm";
import { useAttributeTypes } from "../hooks";
import { AttributeType } from "../types";
type AttributeTypesPageProps = Pick<PiletApi, "launchWorkspace"> & {};

const AttributeTypesPage: React.FC<AttributeTypesPageProps> = ({
  launchWorkspace,
}) => {
  const attributeTypesAsync = useAttributeTypes();
  const title = "Attribute types";
  const handleAddOrupdate = (attributeType?: AttributeType) => {
    const dispose = launchWorkspace(
      <AttributeTypeForm
        attributeType={attributeType}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: attributeType ? "Update Attribute type" : "Add Attribute type",
      }
    );
  };
  const handleDelete = (attributeType: AttributeType) => {
    openConfirmModal({
      title: "Delete attribute type",
      children: (
        <Text>
          Are you sure you want to delete this role.This action is destructive
          and will delete all data related to role
        </Text>
      ),
      labels: {
        confirm: "Delete Attribute type",
        cancel: "No don't delete it",
      },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm() {
        // TODO Implement delete
      },
    });
  };

  const actions: ColumnDef<AttributeType> = {
    id: "actions",
    header: "Actions",
    cell({ row }) {
      const attributeType = row.original;
      return (
        <Group>
          <Group>
            <ActionIcon
              variant="outline"
              aria-label="Settings"
              color="green"
              onClick={() => handleAddOrupdate(attributeType)}
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
              onClick={() => handleDelete(attributeType)}
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
      asyncState={{
        ...attributeTypesAsync,
        data: attributeTypesAsync.attributeTypes,
      }}
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

export default AttributeTypesPage;

const columns: ColumnDef<AttributeType>[] = [
  {
    accessorKey: "icon",
    header: "Icon",
    cell({ getValue }) {
      const icon = getValue<AttributeType["icon"]>();
      if (icon) return <TablerIcon name={icon?.name as any} size={16} />;
      return <TablerIcon size={16} name="tournament" />;
    },
  },
  {
    accessorKey: "name",
    header: "Amenity",
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
