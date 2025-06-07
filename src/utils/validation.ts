import { z } from "zod";

// IconSchema
const IconSchema = z.object({
  name: z.string().min(1, "Required"),
  family: z.string().min(1, "Required"),
});
// Amenity
export const AmenitySchema = z.object({
  name: z.string().min(1, "Required"),
  icon: IconSchema,
});

// Category
export const CategorySchema = z.object({
  name: z.string().min(1, "Required"),
  icon: IconSchema,
});

// RelationshipType
export const RelationshipTypeSchema = z.object({
  description: z.string().min(1, "Required").optional(),
  aIsToB: z.string().min(1, "Required"),
  bIsToA: z.string().min(1, "Required"),
});

// Attribute types
export const AttributeTypeSchema = z.object({
  name: z.string().min(1, "Required"),
  icon: IconSchema,
});

export const AddressSchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().min(1, "Required").optional(),
  county: z.string().min(1, "Required"),
  subCounty: z.string().min(1, "Required"),
  ward: z.string().min(1, "Required"),
  village: z.string().min(1, "Required").optional(),
  postalCode: z.string().min(1, "Required").optional(),
  latitude: z.number({ coerce: true }).optional(),
  longitude: z.number({ coerce: true }).optional(),
  landmark: z.string(),
});
