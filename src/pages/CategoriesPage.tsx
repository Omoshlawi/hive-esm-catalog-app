import { StateFullDataTable, TablerIcon } from "@hive/esm-core-components";
import { PiletApi } from "@hive/esm-shell-app";
import { ActionIcon, Group, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import CategoryForm from "../forms/CategoryForm";
import { useCategories } from "../hooks";
import { Category } from "../types";

type CategoriesPageProps = Pick<PiletApi, "launchWorkspace"> & {};

const CategoriesPage: React.FC<CategoriesPageProps> = ({ launchWorkspace }) => {
  const categoriesAsync = useCategories();
  const title = "Categories";
  const handleAddOrupdate = (category?: Category) => {
    const dispose = launchWorkspace(
      <CategoryForm
        category={category}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: category ? "Update Category" : "Add Category",
      }
    );
  };
  const handleDelete = (category: Category) => {
    openConfirmModal({
      title: "Delete category",
      children: (
        <Text>
          Are you sure you want to delete this role.This action is destructive
          and will delete all data related to role
        </Text>
      ),
      labels: { confirm: "Delete category", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm() {
        // TODO Implement delete
      },
    });
  };

  const actions: ColumnDef<Category> = {
    id: "actions",
    header: "Actions",
    cell({ row }) {
      const category = row.original;
      return (
        <Group>
          <Group>
            <ActionIcon
              variant="outline"
              aria-label="Settings"
              color="green"
              onClick={() => handleAddOrupdate(category)}
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
              onClick={() => handleDelete(category)}
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
      {...categoriesAsync}
      data={categoriesAsync.categories}
      columns={[...columns, actions]}
      onAdd={() => handleAddOrupdate()}
      title={title}
      withColumnViewOptions
    />
  );
};

export default CategoriesPage;

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "icon",
    header: "Icon",
    cell({ getValue }) {
      const icon = getValue<Category["icon"]>();
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
