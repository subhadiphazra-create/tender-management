import { FormField } from "../../types/type";

export const basicInfoFields: FormField[] = [
  {
    name: "title",
    label: "Tender Subject",
    placeholder: "Enter tender title",
  },
  {
    name: "tender_department",
    label: "Department",
    placeholder: "Select department",
  },
  {
    name: "sector",
    label: "Sector",
    placeholder: "Select sector",
  },
  {
    name: "product_service",
    label: "Product/Service",
    placeholder: "Select product/service",
  },
  {
    name: "referenceNumber",
    label: "Tender Reference Number",
    placeholder: "Enter reference number",
  },
  {
    name: "budget",
    label: "Estimated Budget/Value",
    placeholder: "Enter budget",
    type: "number",
  },
  {
    name: "tenderType",
    label: "Tender Type",
    type: "select",
    placeholder: "Select type",
    options: [
      { label: "Open", value: "open" },
      { label: "Limited", value: "limited" },
      { label: "Direct", value: "direct" },
    ],
  },
  {
    name: "procurementCategory",
    label: "Procurement Category",
    type: "select",
    placeholder: "Select category",
    options: [
      { label: "Goods", value: "goods" },
      { label: "Services", value: "services" },
      { label: "Works", value: "works" },
    ],
  },
  {
    name: "currency",
    label: "Currency",
    type: "select",
    placeholder: "Select currency",
    options: [
      { label: "USD", value: "usd" },
      { label: "EUR", value: "eur" },
      { label: "GBP", value: "gbp" },
      { label: "INR", value: "inr" },
    ],
  },
  {
    name: "publicationDate",
    label: "Publication Date",
    type: "date",
  },
  {
    name: "submissionDeadline",
    label: "Submission Deadline",
    type: "date",
  },
  {
    name: "validityPeriod",
    label: "Tender Validity Period (Days)",
    type: "number",
  },
  {
    name: "projectDuration",
    label: "Expected Project Duration",
    placeholder: "Enter duration (e.g., 6 months)",
  },
  {
    name: "evaluationMethodology",
    label: "Evaluation Methodology",
    type: "select",
    placeholder: "Select methodology",
    options: [
      { label: "Quality & Cost-Based", value: "quality_cost" },
      { label: "Least Cost", value: "least_cost" },
      { label: "Fixed Budget", value: "fixed_budget" },
      { label: "Quality-Based", value: "quality_based" },
    ],
  },
  {
    name: "description",
    label: "Project Description",
    isTextarea: true,
    colSpan: 3,
  },
];

export const organizationInfoFields: FormField[] = [
  {
    name: "organizationName",
    label: "Organization Name",
    placeholder: "Enter organization name",
  },
  {
    name: "department",
    label: "Department/Division",
    placeholder: "Enter department/division",
  },
  {
    name: "contactPerson",
    label: "Contact Person",
    placeholder: "Enter contact person's name",
  },
  {
    name: "contactEmail",
    label: "Contact Email",
    placeholder: "Enter email address",
    type: "email",
  },
  {
    name: "contactPhone",
    label: "Contact Phone Number",
    placeholder: "Enter phone number",
    type: "tel",
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Enter full address",
    isTextarea: true,
    colSpan: 3,
  },
];

export const eligibilityFields: FormField[] = [
  {
    name: "minTurnover",
    label: "Minimum Annual Turnover",
    type: "number",
    placeholder: "Enter required turnover",
  },
  {
    name: "experienceYears",
    label: "Years of Experience Required",
    type: "number",
    placeholder: "Enter years",
  },
  {
    name: "similarProjects",
    label: "Previous Similar Projects",
    isTextarea: true,
    placeholder: "List previous projects",
    colSpan: 3,
  },
  {
    name: "requiredCertifications",
    label: "Required Certifications/Licenses",
    isTextarea: true,
    placeholder: "List required certifications/licenses",
    colSpan: 3,
  },
  {
    name: "legalRequirements",
    label: "Legal Requirements",
    isTextarea: true,
    placeholder: "List legal requirements",
    colSpan: 3,
  },
  {
    name: "financialStanding",
    label: "Financial Standing Requirements",
    placeholder: "Enter financial requirements",
  },
  {
    name: "technicalCapability",
    label: "Technical Capability Requirements",
    placeholder: "Enter technical requirements",
  },
];

export const technicalFields: FormField[] = [
  {
    name: "scopeOfWork",
    label: "Detailed Scope of Work",
    placeholder: "Describe scope of work",
    isTextarea: true,
    colSpan: 3,
  },
  {
    name: "technicalRequirements",
    label: "Technical Requirements",
    placeholder: "Enter technical requirements",
    isTextarea: true,
    colSpan: 3,
  },
  {
    name: "qualityStandards",
    label: "Quality Standards",
    placeholder: "Enter quality expectations",
  },
  {
    name: "deliveryTimeline",
    label: "Delivery Timeline",
    placeholder: "Enter estimated timeline",
  },
  {
    name: "acceptanceCriteria",
    label: "Acceptance Criteria",
    placeholder: "Define acceptance criteria",
    isTextarea: true,
    colSpan: 3,
  },
  {
    name: "performanceMetrics",
    label: "Performance Metrics",
    placeholder: "Enter performance criteria",
  },
  {
    name: "requiredDeliverables",
    label: "Required Deliverables",
    placeholder: "List expected deliverables",
    isTextarea: true,
    colSpan: 3,
  },
];

export const evaluationCriteriaFields: FormField[] = [
  {
    name: "technicalWeight",
    label: "Technical Evaluation Weight (%)",
    type: "number",
    placeholder: "Enter percentage",
  },
  {
    name: "financialWeight",
    label: "Financial Evaluation Weight (%)",
    type: "number",
    placeholder: "Enter percentage",
  },
  {
    name: "qualificationThreshold",
    label: "Technical Qualification Threshold",
    type: "number",
    placeholder: "Enter threshold score",
  },
  {
    name: "evaluationMethodology",
    label: "Evaluation Methodology",
    type: "select",
    placeholder: "Select methodology",
    options: [
      { label: "Quality & Cost-Based", value: "quality_cost" },
      { label: "Least Cost", value: "least_cost" },
      { label: "Fixed Budget", value: "fixed_budget" },
      { label: "Quality-Based", value: "quality_based" },
    ],
  },
  {
    name: "scoringSystem",
    label: "Scoring System",
    isTextarea: true,
    placeholder: "Describe the scoring system",
    colSpan: 3,
  },
];

export const bidSecurityFields: FormField[] = [
  {
    name: "bidSecurityAmount",
    label: "Bid Security Amount",
    type: "number",
    placeholder: "Enter security amount",
  },
  {
    name: "bidSecurityForm",
    label: "Bid Security Form",
    type: "select",
    placeholder: "Select form",
    options: [
      { label: "Bank Guarantee", value: "bank_guarantee" },
      { label: "Cash Deposit", value: "cash_deposit" },
    ],
  },
  {
    name: "bidSecurityValidity",
    label: "Bid Security Validity (days)",
    type: "number",
    placeholder: "Enter validity in days",
  },
];

export const submissionRequirementsFields: FormField[] = [
  {
    name: "submissionMethod",
    label: "Submission Method",
    placeholder: "Select method",
    type: "select",
    options: [
      { label: "Electronic", value: "electronic" },
      { label: "Physical", value: "physical" },
      { label: "Both", value: "both" },
    ],
  },
];

export const scheduleOfEventsFields: FormField[] = [
  { name: "preBidMeeting", label: "Pre-bid Meeting Date", type: "date" },
  { name: "siteVisit", label: "Site Visit Date (if applicable)", type: "date" },
  { name: "queryDeadline", label: "Query Submission Deadline", type: "date" },
  {
    name: "responseToQueries",
    label: "Response to Queries Date",
    type: "date",
  },
  { name: "techBidOpening", label: "Technical Bid Opening Date", type: "date" },
  {
    name: "financeBidOpening",
    label: "Financial Bid Opening Date",
    type: "date",
  },
];

export const termsAndConditionsFields: FormField[] = [
  {
    name: "paymentTerms",
    label: "Payment Terms",
    placeholder: "Describe payment terms",
    isTextarea: true,
  },
  {
    name: "warrantyRequirements",
    label: "Warranty Requirements",
    placeholder: "Describe warranty terms",
    isTextarea: true,
  },
  {
    name: "insuranceRequirements",
    label: "Insurance Requirements",
    placeholder: "Describe insurance requirements",
    isTextarea: true,
  },
  {
    name: "subContractingRules",
    label: "Sub-contracting Rules",
    placeholder: "Specify rules for sub-contracting",
    isTextarea: true,
    colSpan: 3,
  },
  {
    name: "contractAmendment",
    label: "Contract Amendment Provisions",
    placeholder: "Describe amendment provisions",
    isTextarea: true,
    colSpan: 3,
  },
  {
    name: "disputeResolution",
    label: "Dispute Resolution Mechanism",
    placeholder: "Describe dispute resolution methods",
    isTextarea: true,
  },
  {
    name: "forceMajeure",
    label: "Force Majeure Clauses",
    placeholder: "Describe force majeure clauses",
    isTextarea: true,
  },
  {
    name: "terminationConditions",
    label: "Termination Conditions",
    placeholder: "Describe termination conditions",
    isTextarea: true,
  },
];

export const attachmentsFields: FormField[] = [
  {
    name: "biddingDocs",
    label: "Standard Bidding Documents",
    type: "file",
  },
  {
    name: "techSpecsDocs",
    label: "Technical Specification Documents",
    type: "file",
  },
  {
    name: "draftContract",
    label: "Draft Contract",
    type: "file",
  },
  {
    name: "billQuantities",
    label: "Bill of Quantities/Price Schedule",
    type: "file",
  },
  {
    name: "specialInstructions",
    label: "Special Instructions Document",
    type: "file",
  },
];
