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
