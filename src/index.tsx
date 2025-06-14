import { HeaderLink } from "@hive/esm-core-components";
import type { PiletApi } from "@hive/esm-shell-app";
import * as React from "react";
import {
  AddressBook,
  Amenities,
  AttributeTypes,
  Categories,
  FinancingOptions,
  OwnershipTypes,
  RelationShipTypes,
} from "./pages";

export function setup(app: PiletApi) {
  app.registerPage(
    "/dasboard/address-book",
    () => <AddressBook launchWorkspace={app.launchWorkspace} />,
    {
      layout: "dashboard",
    }
  );
  app.registerPage(
    "/dasboard/amenities",
    () => <Amenities launchWorkspace={app.launchWorkspace} />,
    { layout: "dashboard" }
  );
  app.registerPage(
    "/dasboard/attribute-types",
    () => <AttributeTypes launchWorkspace={app.launchWorkspace} />,
    { layout: "dashboard" }
  );
  app.registerPage(
    "/dasboard/categories",
    () => <Categories launchWorkspace={app.launchWorkspace} />,
    { layout: "dashboard" }
  );
  app.registerPage(
    "/dasboard/relationship-types",
    () => <RelationShipTypes launchWorkspace={app.launchWorkspace} />,
    {
      layout: "dashboard",
    }
  );
  app.registerPage(
    "/dasboard/ownership-types",
    () => <OwnershipTypes launchWorkspace={app.launchWorkspace} />,
    {
      layout: "dashboard",
    }
  );
  app.registerPage(
    "/dasboard/financing-options",
    () => <FinancingOptions launchWorkspace={app.launchWorkspace} />,
    {
      layout: "dashboard",
    }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <HeaderLink
        to="/dasboard/address-book"
        label="Address book"
        icon="addressBook"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <HeaderLink
        to="/dasboard/amenities"
        label="Amenities"
        icon="tournament"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <HeaderLink
        to="/dasboard/attribute-types"
        label="Attribute Types"
        icon="tree"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <HeaderLink
        to="/dasboard/categories"
        label="Categories"
        icon="category"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <HeaderLink
        to="/dasboard/relationship-types"
        label="Relationship types"
        icon="sitemap"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <HeaderLink
        to="/dasboard/ownership-types"
        label="Ownership types"
        icon="userHexagon"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
  app.registerMenu(
    ({ onClose }: any) => (
      <HeaderLink
        to="/dasboard/financing-options"
        label="Financing options"
        icon="tax"
        onClose={onClose ?? (() => {})}
      />
    ),
    { type: "admin" }
  );
}
