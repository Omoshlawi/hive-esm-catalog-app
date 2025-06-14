import { StateFullDataTable, TablerIcon } from "@hive/esm-core-components";
import { PiletApi } from "@hive/esm-shell-app";
import { ActionIcon, Group, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import RelationshipTypeForm from "../forms/RelationshipTypeForm";
import { useRelationshipTypes } from "../hooks";
import { RelationshipType } from "../types";

type RelationshipTypesPageProps = Pick<PiletApi, "launchWorkspace"> & {};

const RelationshipTypesPage: React.FC<RelationshipTypesPageProps> = ({
  launchWorkspace,
}) => {
  const relationshipTypesAsync = useRelationshipTypes();
  const title = "Relationship types";

  const handleAddOrupdate = (relationshipType?: RelationshipType) => {
    const dispose = launchWorkspace(
      <RelationshipTypeForm
        relationshipType={relationshipType}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: relationshipType
          ? "Update Relationship type"
          : "Add Relationship type",
      }
    );
  };
  const handleDelete = (relationshipType: RelationshipType) => {
    openConfirmModal({
      title: "Delete Relationship type",
      children: (
        <Text>
          Are you sure you want to delete this role.This action is destructive
          and will delete all data related to role
        </Text>
      ),
      labels: {
        confirm: "Delete relationship type",
        cancel: "No don't delete it",
      },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm() {
        // TODO Implement delete
      },
    });
  };

  const actions: ColumnDef<RelationshipType> = {
    id: "actions",
    header: "Actions",
    cell({ row }) {
      const relationshipType = row.original;
      return (
        <Group>
          <Group>
            <ActionIcon
              variant="outline"
              aria-label="Settings"
              color="green"
              onClick={() => handleAddOrupdate(relationshipType)}
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
              onClick={() => handleDelete(relationshipType)}
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
    <StateFullDataTable
      {...relationshipTypesAsync}
      data={relationshipTypesAsync.relationshipTypes}
      columns={[...columns, actions]}
      onAdd={() => handleAddOrupdate()}
      title={title}
      withColumnViewOptions
    />
  );
};

export default RelationshipTypesPage;
const columns: ColumnDef<RelationshipType>[] = [
  {
    accessorKey: "aIsToB",
    header: "A is to B",
  },
  {
    accessorKey: "bIsToA",
    header: "B is to A",
  },
  {
    accessorKey: "description",
    header: "Description",
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
