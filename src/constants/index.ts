import { TenderFormSchema } from "../../schema/tenderFormSchema";
import { Buyer, SidebarItem, Supplier, TemplateFormValues } from "../../types/type";

export const dummySupplier: Supplier = {
  companyName: "Acme Supplies Ltd.",
  registeredAddress: "123 Industrial Park, Sector 45",
  postalAddress: "PO Box 789",
  phoneNumber: "+1-555-123-4567",
  email: "contact@acmesupplies.com",
  websiteURL: "https://www.acmesupplies.com",
  registrationNumber: "REG-2025-001",
  vatNumber: "VAT1234567",
  contactName: "John Doe",
  contactPosition: "Procurement Manager",
  contactPhoneNumber: "+1-555-987-6543",
  contactEmail: "johndoe@acmesupplies.com",
  industry: "Manufacturing",
  supplierType: "Raw Materials",
  keyProducts: "Steel, Aluminum, Copper",
  yearsOfExperience: 15,
  certifications: "ISO 9001, ISO 14001",
  insuranceCoverage: "Comprehensive Liability",
  annualTurnover: "$5,000,000",
  creditRating: "A+",
  bankAccount: "1234567890",
  taxCompliant: "Yes",
  prevTenders: "Tender-001, Tender-002",
  relevantProjects: "Project A, Project B",
  references: "Client X, Client Y",
  legalStructure: "Private Limited",
  regulations: "Compliant with industry standards",
  conflicts: "None",
  nda: "Signed",
  criminal: "None",
  qualityManagement: "Implemented",
  serviceGurantee: "1-year warranty",
  sla: "99% uptime",
  bidAmount: "$50,000",
  proposedDelivery: "30 days",
  proposedPaymentTerms: "Net 30",
  additionalInfo: "Reliable supplier with long-term experience",
  profileFile: null,
  financialStatementFile: null,
  supplierDeclaration: "I hereby declare...",
  authorizedSignatoryName: "John Doe",
  signature: null,
  date: "2025-10-08",
};

export const dummyBuyer: Buyer = {
  companyName: "Global Industries Inc.",
  businessType: "Private",
  industry: "Automotive",
  yearEstablished: 1998,
  numberOfEmployees: 500,
  annualRevenue: "$50,000,000",
  website: "https://www.globalindustries.com",

  primaryContactName: "Jane Smith",
  jobTitle: "Head of Procurement",
  email: "janesmith@globalindustries.com",
  phoneNumber: "+1-555-321-9876",
  altContactPerson: "Mark Johnson",
  street: "456 Business Avenue",
  city: "New York",
  state: "NY",
  zipcode: "10001",
  country: "USA",

  productsPurchased: "Engine parts, Tires, Brakes",
  averageOrderValue: "$25,000",
  procurementFrequency: "Monthly",
  paymentTerms: "Net 45",
  preferredCurrencies: "USD, EUR",
  requiredCertifications: "ISO 9001",

  username: "globalbuyer",
  password: "securepassword123",
  securityQuestions: "What is your favorite color?",

  businessRegCert: null,
  taxId: "TAX-987654321",
  bankingInfo: "Bank of America, Account 987654321",
};

export const profileTabs = [
  {
    id: "1",
    mainTabsTitle: "Buyer Details",
    icon: "user",
    subTabs: [
      {
        title: "Basic Information",
        fields: {
          companyName: "Company/Organization Name",
          businessType: "Business Type",
          industry: "Industry/Sector",
          yearEstablished: "Year Established",
          numberOfEmployees: "Number of Employees",
          annualRevenue: "Annual Revenue Range",
          website: "Company Website",
        },
        data: dummyBuyer,
      },
      {
        title: "Contact Details",
        fields: {
          primaryContactName: "Primary Contact Name",
          jobTitle: "Job Title",
          email: "Email Address",
          phoneNumber: "Phone Number",
          altContactPerson: "Alternative Contact Person",
          street: "Street Address",
          city: "City",
          state: "State/Province",
          zipcode: "ZIP/Postal Code",
          country: "Country",
        },
        data: dummyBuyer,
      },
      {
        title: "Procurement Information",
        fields: {
          productsPurchased: "Typical Products/Services Purchased",
          averageOrderValue: "Average Order Value",
          procurementFrequency: "Procurement Frequency",
          paymentTerms: "Payment Terms Preference",
          preferredCurrencies: "Preferred Currencies",
          requiredCertifications: "Required Certifications",
        },
        data: dummyBuyer,
      },
      {
        title: "Documents",
        fields: {
          businessRegCert: "Business Registration Certificate",
          taxId: "Tax ID/VAT Number",
          bankingInfo: "Banking Information for Payments",
        },
        data: dummyBuyer,
      },
    ],
  },
  {
    id: "2",
    mainTabsTitle: "Supplier Details",
    icon: "box",
    subTabs: [
      {
        title: "Supplier Info and Contacts",
        fields: {
          companyName: "Company Name",
          registeredAddress: "Registered Address",
          postalAddress: "Postal Address",
          phoneNumber: "Phone Number",
          email: "Email Address",
          websiteURL: "Website URL",
          registrationNumber: "Company Registration Number",
          vatNumber: "VAT Number",
          contactName: "Full Name",
          contactPosition: "Position/Title",
          contactPhoneNumber: "Contact Phone Number",
          contactEmail: "Contact Email",
        },
        data: dummySupplier,
      },
      {
        title: "Capabilities and Experience",
        fields: {
          industry: "Industry",
          supplierType: "Supplier Type",
          yearsOfExperience: "Years of Experience",
          keyProducts: "Key Products/Services",
          certifications: "Certifications and Accreditations",
          insuranceCoverage: "Insurance Coverage",
          prevTenders: "Previous Tender Participation",
          relevantProjects: "Relevant Projects Completed",
          references: "References/Testimonials",
        },
        data: dummySupplier,
      },
      {
        title: "Finance and Legal",
        fields: {
          annualTurnover: "Annual Turnover",
          creditRating: "Credit Rating",
          bankAccount: "Bank Account Information",
          taxCompliant: "Tax Compliance",
          legalStructure: "Legal Structure",
          conflicts: "Conflicts of Interest",
          nda: "NDA Signed",
          criminal: "Criminal Record Declaration",
          regulations: "Compliance with Laws",
        },
        data: dummySupplier,
      },
      {
        title: "QA and Bid Submission",
        fields: {
          qualityManagement: "Quality Management System",
          serviceGurantee: "Product/Service Guarantees",
          sla: "Service Level Agreement (SLA)",
          bidAmount: "Bid Amount",
          proposedDelivery: "Proposed Delivery Schedule",
          proposedPaymentTerms: "Proposed Payment Terms",
        },
        data: dummySupplier,
      },
      {
        title: "Additional Information",
        fields: {
          additionalInfo: "Any Other Relevant Information",
          profileFile: "Company Profile",
          financialStatementFile: "Financial Statements",
          certifications: "Certifications/Accreditations",
          references: "References/Testimonials",
        },
        data: dummySupplier,
      },
      {
        title: "Declaration",
        fields: {
          supplierDeclaration: "Declaration",
          authorizedSignatoryName: "Authorized Signatory Name",
          signature: "Signature",
          date: "Date",
        },
        data: dummySupplier,
      },
    ],
  },
];

export const sidebarData: SidebarItem[] = [
  {
    title: "External Tenders",
    icon: "folder-open",
    href: "/external",
  },
  {
    title: "Internal Tenders",
    icon: "folder-open",
    children: [
      { title: "Tender Template", href: "/internal/tender-template" },
      { title: "My Tenders", href: "/internal/my-tender" },
      { title: "My Suppliers", href: "/internal/my-supplier" },
    ],
  },
  {
    title: "My Tender Responses",
    icon: "file-box",
    children: [{ title: "My Responses", href: "/responses/my-responses" }],
  },
  {
    title: "Tender Historical Uploads",
    icon: "history",
    children: [
      { title: "Tender uploads", href: "/historical-uploads/uploads" },
      {
        title: "Tender response uploads",
        href: "/historical-uploads/tender-response",
      },
    ],
  },
  {
    title: "Analytics",
    icon: "chart-pie",
    children: [
      { title: "Overview", href: "/analytics/overview" },
      { title: "Reports", href: "/analytics/reports" },
    ],
  },
  {
    title: "Profile",
    icon: "user-round",
    href: "/profile",
  },
];

export const regulationOptions = [
  "Compliance with Local Laws and Regulations",
  "Conflicts of Interest Declaration",
  "Non-Disclosure Agreement (NDA)",
  "Criminal Record Declaration",
];
<<<<<<< HEAD


export const sampleTemplates: TemplateFormValues[] = [
  {
    templateName: "Tender Template A",
    department: "Information Technology",
    sector: "IT",
    product: "IT infrastructure",
    editorValue: "<p>Template A content</p>",
  },
  {
    templateName: "Audit Template",
    department: "Finance",
    sector: "Insurance",
    product: "Audit services",
    editorValue: "<p>Audit template</p>",
  },
  {
    templateName: "HR Onboarding",
    department: "Human Resources",
    sector: "Healthcare",
    product: "Recruitment services",
    editorValue: "<p>HR onboarding</p>",
  },
];

export const dummyTenderData: TenderFormSchema[] = [
  {
    title: "Construction of New Office Building",
    referenceNumber: "TND/INFRA/2025/001",
    description:
      "This tender invites qualified contractors for the construction of a new administrative office building including civil, electrical, and HVAC works.",
    tenderType: "open",
    procurementCategory: "works",
    budget: 25000000,
    industry: "Construction",
    currency: "inr",
    publicationDate: "2025-10-01",
    submissionDeadline: "2025-10-30",
    validityPeriod: 90,
    projectDuration: "12 months",
    organizationName: "Public Works Department",
    department: "Infrastructure Development Division",
    contactPerson: "Mr. Arjun Sharma",
    contactEmail: "arjun.sharma@pwd.gov.in",
    contactPhone: "+91-9876543210",
    address: "PWD Bhawan, MG Road, Kolkata, West Bengal, India",
    minTurnover: 50000000,
    experienceYears: 5,
    similarProjects:
      "Construction of multi-storey government buildings, roads, and public offices.",
    requiredCertifications: "ISO 9001:2015, Class A Contractor License",
    legalRequirements: "Company registration, tax compliance certificates.",
    financialStanding: "Audited financial statements for the last 3 years.",
    technicalCapability: "Minimum 5 qualified engineers and project managers.",
    scopeOfWork:
      "Design, supply, and execution of all civil, plumbing, and electrical work for the new office building.",
    technicalRequirements:
      "Contractor must provide detailed technical methodology and implementation plan.",
    qualityStandards:
      "All materials should conform to IS standards and specifications.",
    deliveryTimeline: "Completion within 12 months from work order date.",
    acceptanceCriteria:
      "Completion certificate issued after inspection and quality checks.",
    performanceMetrics: "Project milestones, safety compliance, and quality benchmarks.",
    requiredDeliverables: "Work completion report, drawings, material test certificates.",
    technicalWeight: 70,
    financialWeight: 30,
    qualificationThreshold: 60,
    evaluationMethodology: "quality_cost",
    scoringSystem:
      "Technical evaluation based on experience and resources, financial on lowest bid.",
    bidSecurityAmount: 1000000,
    bidSecurityForm: "bank_guarantee",
    bidSecurityValidity: 120,
    submissionMethod: "electronic",
    copiesRequired: 2,
    formatRequirements: "PDF format, digitally signed.",
    supportingDocuments: "Company profile, project references, certifications.",
    preQualificationDocs: "Audited balance sheets, turnover certificates.",
    preBidMeeting: "2025-10-10",
    siteVisit: "2025-10-12",
    queryDeadline: "2025-10-15",
    responseToQueries: "2025-10-18",
    techBidOpening: "2025-10-31",
    financeBidOpening: "2025-11-05",
    paymentTerms: "Milestone-based payments after inspection approval.",
    warrantyRequirements: "Minimum 2 years on all civil and electrical works.",
    insuranceRequirements: "Contractor to provide workmen and site insurance.",
    subContractingRules: "Maximum 30% of work can be subcontracted.",
    contractAmendment: "Any amendment must be approved by the authority.",
    disputeResolution:
      "All disputes will be settled under arbitration in Kolkata jurisdiction.",
    forceMajeure: "Standard government force majeure conditions apply.",
    terminationConditions: "Poor performance or breach of contract terms.",
    biddingDocs: "bidding_docs.pdf",
    techSpecsDocs: "technical_specs.pdf",
    draftContract: "draft_contract.pdf",
    billQuantities: "boq.xlsx",
    specialInstructions: "special_instructions.pdf",
  },
];

export const currencySymbols = {
  usd: "$",
  eur: "€",
  gbp: "£",
  inr: "₹",
  jpy: "¥",
  aud: "A$",
  cad: "C$",
  cny: "¥",
  chf: "CHF",
  sek: "kr",
  nzd: "NZ$",
};
=======
>>>>>>> cdb2bbc819be25ae7f23e6d5d0159ade840b9cdc
