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

// Property Media
export const PropertyMediaSchema = z.object({
  type: z.enum(["Image", "Video", "Document", "Tour_3D"]),
  url: z.string().optional(),
  title: z.string().min(1, "Required").optional(),
  description: z.string().min(1, "Required").optional(),
  order: z.number({ coerce: true }).int().nonnegative().optional(),
  metadata: z
    .object({
      size: z.number({
        coerce: true,
      }),
      memeType: z.string().min(1, "Required").optional(),
    })
    .optional(),
});

// Property Location
export const PropertyLocation = z.object({
  propertyId: z.string().uuid(),
  addressLine1: z.string().min(1, "Required"),
  addressLine2: z.string().min(1, "Required").optional(),
  city: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  postalCode: z.string().min(1, "Required"),
  latitude: z.number({ coerce: true }).optional(),
  longitude: z.number({ coerce: true }).optional(),
  geospatialData: z.record(z.any()),
});

// organization
export const OrganixationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Required"),
});

// Property
export const PropertySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  attributes: z
    .array(
      z.object({
        attributeId: z
          .string()
          .min(1, "Required")
          .uuid("Invalid attribute type"),
        value: z.string().min(1, "Required"),
      })
    )
    .optional(),
  addressId: z.string().min(1, "Required").uuid("invalid address"),
  media: z.array(PropertyMediaSchema).optional(),
  amenities: z.array(z.string().uuid()).optional(),
  categories: z.array(z.string().uuid()).optional(),
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

// Property Amenity
export const PropertyAmenitySchema = z.object({
  propertyId: z.string().uuid(),
  amenityId: z.string().uuid(),
});

// property category
export const PropertyCategorySchema = z.object({
  propertyId: z.string().uuid(),
  categoryId: z.string().uuid(),
});

// Property attribute
export const PropertyAttributeSchema = z.object({
  propertyId: z.string().uuid(),
  attributeId: z.string().uuid(),
  value: z.string().min(1, "Required"),
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

// Relationship
export const RelationshipSchema = z.object({
  propertyAId: z.string().uuid(),
  propertyBId: z.string().uuid(),
  startDate: z.date({ coerce: true }),
  endDate: z.date({ coerce: true }).optional(),
  typeId: z.string().uuid(),
});
