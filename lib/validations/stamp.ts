import { z } from "zod"

const informationItemSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string(),
})

const informationItemsSchema = z
  .array(informationItemSchema)
  .optional()

export const stampCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),

  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase, alphanumeric, and hyphenated"
    ),

  eyebrow: z.string().optional().nullable(),

  image: z.string().optional().nullable(),

  featured: z.boolean().optional().default(false),

  categoryId: z.number().int().positive().optional().nullable(),

  tags: z.array(z.string()).optional(),

  keyAttributes: informationItemsSchema,

  physicalProperties: informationItemsSchema,

  printingProduction: informationItemsSchema,

  issuance: informationItemsSchema,

  historicalContext: informationItemsSchema,
})

export const stampUpdateSchema =
  stampCreateSchema.partial()

export type StampCreateInput =
  z.infer<typeof stampCreateSchema>

export type StampUpdateInput =
  z.infer<typeof stampUpdateSchema>