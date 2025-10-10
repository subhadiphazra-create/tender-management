import { z } from "zod";

export const responseSchema = z.object({
  responseTitle: z.string().min(1, "Response Title is required"),
  responseDeadline: z.string().min(1, "Response Deadline is required"),
  department: z.string().min(1, "Department is required"),
  sector: z.string().min(1, "Sector is required"),
  product_service: z.string().min(1, "Product/Service is required"),
  country: z.string().min(1, "Country is required"),
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Please upload a valid file"),
});

export type ResponseFormValues = z.infer<typeof responseSchema>;
