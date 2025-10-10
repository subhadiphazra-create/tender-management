import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

export const tenderFormSchema = z.object({
  id: z.string().default(() => uuidv4()),
  title: z.string().min(1, "Tender Subject is required"),
  referenceNumber: z.string().min(1, "Tender Reference Number is required"),
  description: z.string().min(1, "Project Description is required"),
  tenderType: z.enum(["open", "limited", "direct"], {
    required_error: "Tender Type is required",
  }),
  procurementCategory: z.enum(["goods", "services", "works"], {
    required_error: "Procurement Category is required",
  }),
  budget: z.number().min(0, "Estimated Budget/Value must be positive"),
  industry: z.string().min(1, "Industry is required"),
  currency: z.enum(["usd", "eur", "gbp", "inr"], {
    required_error: "Currency is required",
  }),
  publicationDate: z.string().min(1, "Publication Date is required"),
  submissionDeadline: z.string().min(1, "Submission Deadline is required"),
  validityPeriod: z
    .number()
    .min(1, "Tender Validity Period must be at least 1 day"),
  projectDuration: z.string().min(1, "Expected Project Duration is required"),

  // Procuring Entity Information
  organizationName: z.string().min(1, "Organization Name is required"),
  department: z.string().optional(),
  contactPerson: z.string().min(1, "Contact Person is required"),
  contactEmail: z.string().email("Invalid email format"),
  contactPhone: z.string().min(1, "Contact Phone Number is required"),
  address: z.string().min(1, "Address is required"),

  // Eligibility Criteria
  minTurnover: z.number().min(0, "Minimum Annual Turnover must be positive"),
  experienceYears: z.number().min(0, "Years of Experience must be positive"),
  similarProjects: z.string().optional(),
  requiredCertifications: z.string().optional(),
  legalRequirements: z.string().optional(),
  financialStanding: z.string().optional(),
  technicalCapability: z.string().optional(),

  // Technical Specifications
  scopeOfWork: z.string().min(1, "Detailed Scope of Work is required"),
  technicalRequirements: z.string().optional(),
  qualityStandards: z.string().optional(),
  deliveryTimeline: z.string().optional(),
  acceptanceCriteria: z.string().optional(),
  performanceMetrics: z.string().optional(),
  requiredDeliverables: z.string().optional(),

  // Evaluation Criteria
  technicalWeight: z.number().min(0).max(100, "Technical Weight must be 0-100"),
  financialWeight: z.number().min(0).max(100, "Financial Weight must be 0-100"),
  qualificationThreshold: z
    .number()
    .min(0)
    .max(100, "Qualification Threshold must be 0-100"),
  evaluationMethodology: z
    .enum(["quality_cost", "least_cost", "fixed_budget", "quality_based"])
    .optional(),
  scoringSystem: z.string().optional(),

  // Bid Security
  bidSecurityAmount: z.number().min(0, "Bid Security Amount must be positive"),
  bidSecurityForm: z.enum(["bank_guarantee", "cash_deposit"], {
    required_error: "Bid Security Form is required",
  }),
  bidSecurityValidity: z.number().min(1).optional(),

  // Submission Requirements
  submissionMethod: z.enum(["electronic", "physical", "both"], {
    required_error: "Submission Method is required",
  }),
  copiesRequired: z.number().min(1).optional(),
  formatRequirements: z.string().optional(),
  supportingDocuments: z.string().optional(),
  preQualificationDocs: z.string().optional(),

  // Schedule of Events
  preBidMeeting: z.string().optional(),
  siteVisit: z.string().optional(),
  queryDeadline: z.string().optional(),
  responseToQueries: z.string().optional(),
  techBidOpening: z.string().optional(),
  financeBidOpening: z.string().optional(),

  // Terms and Conditions
  paymentTerms: z.string().optional(),
  warrantyRequirements: z.string().optional(),
  insuranceRequirements: z.string().optional(),
  subContractingRules: z.string().optional(),
  contractAmendment: z.string().optional(),
  disputeResolution: z.string().optional(),
  forceMajeure: z.string().optional(),
  terminationConditions: z.string().optional(),

  // Attachments
  biddingDocs: z.any().optional(),
  techSpecsDocs: z.any().optional(),
  draftContract: z.any().optional(),
  billQuantities: z.any().optional(),
  specialInstructions: z.any().optional(),
});

export type TenderFormSchema = z.infer<typeof tenderFormSchema>;
