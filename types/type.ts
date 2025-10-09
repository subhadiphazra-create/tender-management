export interface SidebarItem {
  title: string;
  icon?: React.ReactNode;
  href?: string;
  children?: { title: string; href: string }[];
}

export interface Supplier {
  companyName: string;
  registeredAddress: string;
  postalAddress?: string;
  phoneNumber: string;
  email: string;
  websiteURL?: string;
  registrationNumber?: string;
  vatNumber?: string;
  contactName?: string;
  contactPosition?: string;
  contactPhoneNumber?: string;
  contactEmail?: string;
  industry?: string;
  supplierType?: string;
  keyProducts?: string;
  yearsOfExperience?: number;
  certifications?: string;
  insuranceCoverage?: string;
  annualTurnover?: string;
  creditRating?: string;
  bankAccount?: string;
  taxCompliant: "Yes" | "No";
  prevTenders?: string;
  relevantProjects?: string;
  references?: string;
  legalStructure?: string;
  regulations?: string;
  conflicts?: string;
  nda?: string;
  criminal?: string;
  qualityManagement?: string;
  serviceGurantee?: string;
  sla?: string;
  bidAmount?: string;
  proposedDelivery?: string;
  proposedPaymentTerms?: string;
  additionalInfo?: string;
  profileFile?: any;
  financialStatementFile?: any;
  certificationsFile?: any;
  referencesFile?: any;
  supplierDeclaration?: string;
  authorizedSignatoryName?: string;
  signature?: any;
  date?: string;
}

export interface Buyer {
  companyName: string;
  businessType?: string;
  industry?: string;
  yearEstablished?: number;
  numberOfEmployees?: number;
  annualRevenue?: string;
  website?: string;

  primaryContactName: string;
  jobTitle?: string;
  email: string;
  phoneNumber: string;
  altContactPerson?: string;
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;

  productsPurchased?: string;
  averageOrderValue?: string;
  procurementFrequency?: string;
  paymentTerms?: string;
  preferredCurrencies?: string;
  requiredCertifications?: string;

  username?: string;
  password?: string;
  securityQuestions?: string;

  businessRegCert?: any;
  taxId?: string;
  bankingInfo?: string;
}

export interface TemplateFormValues {
  templateName: string;
  department: string;
  sector: string;
  product: string;
  editorValue: string;
}


export type InputType = "text" | "number" | "email" | "tel" | "date" | "file" | "select";

export type SelectOption = { label: string; value: string };

export interface FormField {
  name: string;
  label: string;
  type?: InputType;
  placeholder?: string;
  options?: SelectOption[];
  isTextarea?: boolean;
  colSpan?: number;
  valueAsNumber?: boolean;
}



export type TenderType = "open" | "limited" | "direct";
export type ProcurementCategory = "goods" | "services" | "works";
export type Currency = "usd" | "eur" | "gbp" | "inr";
export type BidSecurityForm = "bank_guarantee" | "cash_deposit";
export type SubmissionMethod = "electronic" | "physical" | "both";
export type EvaluationMethodology =
  | "quality_cost"
  | "least_cost"
  | "fixed_budget"
  | "quality_based";

export interface TenderFormValues {
  // Basic Tender Information
  title: string;
  referenceNumber: string;
  description: string;
  tenderType: TenderType;
  procurementCategory: ProcurementCategory;
  budget: number;
  industry: string;
  currency: Currency;
  publicationDate: string;
  submissionDeadline: string;
  validityPeriod: number;
  projectDuration: string;

  // Procuring Entity Information
  organizationName: string;
  department?: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  address: string;

  // Eligibility Criteria
  minTurnover: number;
  experienceYears: number;
  similarProjects?: string;
  requiredCertifications?: string;
  legalRequirements?: string;
  financialStanding?: string;
  technicalCapability?: string;

  // Technical Specifications
  scopeOfWork: string;
  technicalRequirements?: string;
  qualityStandards?: string;
  deliveryTimeline?: string;
  acceptanceCriteria?: string;
  performanceMetrics?: string;
  requiredDeliverables?: string;

  // Evaluation Criteria
  technicalWeight: number;
  financialWeight: number;
  qualificationThreshold: number;
  evaluationMethodology?: EvaluationMethodology;
  scoringSystem?: string;

  // Bid Security
  bidSecurityAmount: number;
  bidSecurityForm: BidSecurityForm;
  bidSecurityValidity?: number;

  // Submission Requirements
  submissionMethod: SubmissionMethod;
  copiesRequired?: number;
  formatRequirements?: string;
  supportingDocuments?: string;
  preQualificationDocs?: string;

  // Schedule of Events
  preBidMeeting?: string;
  siteVisit?: string;
  queryDeadline?: string;
  responseToQueries?: string;
  techBidOpening?: string;
  financeBidOpening?: string;

  // Terms and Conditions
  paymentTerms?: string;
  warrantyRequirements?: string;
  insuranceRequirements?: string;
  subContractingRules?: string;
  contractAmendment?: string;
  disputeResolution?: string;
  forceMajeure?: string;
  terminationConditions?: string;

  // Attachments
  biddingDocs?: FileList;
  techSpecsDocs?: FileList;
  draftContract?: FileList;
  billQuantities?: FileList;
  specialInstructions?: FileList;
}
