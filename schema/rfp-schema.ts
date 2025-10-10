import { z } from "zod";

export const rfpSchema = z.object({
  rfpTitle: z.string().min(1, "RFP Title is required"),
  rfpDeadline: z.string().min(1, "RFP Deadline is required"),
  tender_department: z.string().min(1, "Department is required"),
  sector: z.string().min(1, "Sector is required"),
  product_service: z.string().min(1, "Product/Service is required"),
  country: z.string().min(1, "Country is required"),
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Please upload a valid file"),
});

export type RfpFormValues = z.infer<typeof rfpSchema>;
