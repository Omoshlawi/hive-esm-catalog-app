import { z } from "zod";
import {
  AddressSchema,
  AmenitySchema,
  AttributeTypeSchema,
  CategorySchema,
  FinancingOptionSchema,
  OwnershipTypeSchema,
  RelationshipTypeSchema,
} from "../utils/validation";

export interface AttributeType {
  id: string;
  name: string;
  organizationId: any;
  icon: Icon;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Icon {
  name: string;
  family: string;
}

export interface Category {
  id: string;
  name: string;
  organizationId: any;
  icon: Icon;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RelationshipType {
  id: string;
  description: any;
  aIsToB: string;
  bIsToA: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Amenity {
  id: string;
  name: string;
  organizationId: any;
  icon: Icon;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  voided: boolean;
}

export interface Address {
  id: string;
  name: string;
  description: string;
  country: string;
  county: string;
  subCounty: string;
  ward: string;
  village?: string;
  landmark: string;
  postalCode?: string;
  latitude?: string;
  longitude?: string;
  ownerUserId: string;
  ownerUser: string;
  organizationId?: string;
  organization?: Organization;
  metadata?: Record<string, any>;
  createdBy: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface County {
  code: string;
  name: string;
  capital: string;
  metadata: any;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  subCounties: SubCounty[];
}

export interface SubCounty {
  code: string;
  name: string;
  countyCode: string;
  metadata: any;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  wards: Ward[];
}

export interface Ward {
  code: string;
  name: string;
  countyCode: string;
  subCountyCode: string;
  metadata: any;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OwnershipType {
  id: string;
  name: string;
  description?: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface FinancingOption {
  id: string;
  name: string;
  description?: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AmenityFormData = z.infer<typeof AmenitySchema>;
export type CategoryFormData = z.infer<typeof CategorySchema>;
export type RelationshipTypeFormData = z.infer<typeof RelationshipTypeSchema>;
export type AttributeTypeFormData = z.infer<typeof AttributeTypeSchema>;
export type AddressFormData = z.infer<typeof AddressSchema>;
export type OwnershipTypeFormData = z.infer<typeof OwnershipTypeSchema>;
export type FinancingOptionsFormData = z.infer<typeof FinancingOptionSchema>;
