import * as React from "react";
import { Link } from "react-router-dom";
import type { PiletApi } from "@hive/esm-shell-app";
import { HeaderLink } from "@hive/esm-core-components";

const Page = React.lazy(() => import("./Page"));

export function setup(app: PiletApi) {
  app.registerPage("/dasboard/address-book", Page, { layout: "dashboard" });
  app.registerPage("/dasboard/amenities", Page, { layout: "dashboard" });
  app.registerPage("/dasboard/attribute-types", Page, { layout: "dashboard" });
  app.registerPage("/dasboard/categories", Page, { layout: "dashboard" });
  app.registerPage("/dasboard/relationship-types", Page, {
    layout: "dashboard",
  });
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
}
