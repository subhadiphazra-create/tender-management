import { z } from "zod";

export const buyerSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  businessType: z.enum(["Corporation", "LLC", "Partnership", "Sole Proprietorship"]).optional(),
  industry: z.string().optional(),
  yearEstablished: z.number().optional(),
  numberOfEmployees: z.number().optional(),
  annualRevenue: z.enum(["Less than $1M", "$1M - $10M", "$10M - $50M", "More than $50M"]).optional(),
  website: z.string().optional(),

  primaryContactName: z.string().min(1, "Primary Contact Name is required"),
  jobTitle: z.string().optional(),
  email: z.string().email("Invalid Email Address"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  altContactPerson: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipcode: z.string().optional(),
  country: z.string().optional(),

  productsPurchased: z.string().optional(),
  averageOrderValue: z.string().optional(),
  procurementFrequency: z.string().optional(),
  paymentTerms: z.string().optional(),
  preferredCurrencies: z.string().optional(),
  requiredCertifications: z.string().optional(),

  businessRegCert: z.any().optional(),
  taxId: z.string().optional(),
  bankingInfo: z.string().optional(),
});

export type BuyerFormType = z.infer<typeof buyerSchema>;
