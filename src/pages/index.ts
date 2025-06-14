import { withUserAccess } from "@hive/esm-core-components";
import React from "react";
import AddressBookPage from "./AddressBookPage";
import Amenitiespage from "./Amenitiespage";
import AttributeTypesPage from "./AttributeTypesPage";
import CategoriesPage from "./CategoriesPage";
import RelationshipTypesPage from "./RelationshipTypesPage";
import FinancingOptionsPage from "./FinancingOptionsPage";
import OwnershipTypesPage from "./OwnershipTypesPage";

export const AddressBook = withUserAccess(AddressBookPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
export const Amenities = withUserAccess(Amenitiespage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
export const AttributeTypes = withUserAccess(AttributeTypesPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
export const Categories = withUserAccess(CategoriesPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
export const RelationShipTypes = withUserAccess(RelationshipTypesPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
export const FinancingOptions = withUserAccess(FinancingOptionsPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
export const OwnershipTypes = withUserAccess(OwnershipTypesPage, {
  isAuthenticated: (session) => session.isAuthenticated,
  requiresAuth: true,
});
