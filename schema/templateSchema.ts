import { z } from "zod";

export const templateSchema = z.object({
  templateName: z.string().min(1, "Template name is required"),
  department: z.string().min(1, "Department is required"),
  sector: z.string().min(1, "Sector is required"),
  product: z.string().min(1, "Product is required"),
  editorValue: z.string().min(1, "Template content is required"),
});

export type TemplateSchemaType = z.infer<typeof templateSchema>;
