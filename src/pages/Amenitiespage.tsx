import {
  StateFullDataTable,
  TablerIcon
} from "@hive/esm-core-components";
import { PiletApi } from "@hive/esm-shell-app";
import { ActionIcon, Group, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import AmenityForm from "../forms/AmenityForm";
import { useAmenities } from "../hooks";
import { Amenity } from "../types";
type AmenitiespageProps = Pick<PiletApi, "launchWorkspace"> & {};

const Amenitiespage: React.FC<AmenitiespageProps> = ({ launchWorkspace }) => {
  const amenitiesAsync = useAmenities();

  const title = "Amenities";
  const handleAddOrupdate = (amenity?: Amenity) => {
    const dispose = launchWorkspace(
      <AmenityForm
        amenity={amenity}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: amenity ? "Update Amenity" : "Add Amenity",
      }
    );
  };
  const handleDelete = (amenity: Amenity) => {
    openConfirmModal({
      title: "Delete Amenity",
      children: (
        <Text>
          Are you sure you want to delete this role.This action is destructive
          and will delete all data related to role
        </Text>
      ),
      labels: { confirm: "Delete amenity", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm() {
        // TODO Implement delete
      },
    });
  };

  const actions: ColumnDef<Amenity> = {
    id: "actions",
    header: "Actions",
    cell({ row }) {
      const amenity = row.original;
      return (
        <Group>
          <Group>
            <ActionIcon
              variant="outline"
              aria-label="Settings"
              color="green"
              onClick={() => handleAddOrupdate(amenity)}
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
              onClick={() => handleDelete(amenity)}
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
      {...amenitiesAsync}
      data={amenitiesAsync.amenities}
      columns={[...columns, actions]}
      onAdd={() => handleAddOrupdate()}
      title={title}
      withColumnViewOptions
    />
  );
};

export default Amenitiespage;

const columns: ColumnDef<Amenity>[] = [
  {
    accessorKey: "icon",
    header: "Icon",
    cell({ getValue }) {
      const icon = getValue<Amenity["icon"]>();
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
