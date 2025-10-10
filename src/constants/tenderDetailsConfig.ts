// tenderDetailsConfig.ts

export const tenderDetailsSections = [
  {
    title: "Basic Tender Information",
    fields: [
      { label: "Tender Subject", key: "title" },
      { label: "Industry", key: "industry" },
      { label: "Reference Number", key: "referenceNumber" },
      { label: "Estimated Budget", key: "budget" },
      { label: "Tender Type", key: "tenderType" },
      { label: "Procurement Category", key: "procurementCategory" },
      { label: "Currency", key: "currency" },
      { label: "Publication Date", key: "publicationDate" },
      { label: "Submission Deadline", key: "submissionDeadline" },
      { label: "Tender Validity (Days)", key: "validityPeriod" },
      { label: "Expected Duration", key: "projectDuration" },
      { label: "Description", key: "description" },
    ],
  },
  {
    title: "Organization Information",
    fields: [
      { label: "Organization Name", key: "organizationName" },
      { label: "Department", key: "department" },
      { label: "Contact Person", key: "contactPerson" },
      { label: "Email", key: "contactEmail" },
      { label: "Phone", key: "contactPhone" },
      { label: "Address", key: "address" },
    ],
  },
  {
    title: "Eligibility & Requirements",
    fields: [
      { label: "Minimum Annual Turnover", key: "minTurnover" },
      { label: "Experience (Years)", key: "experienceYears" },
      { label: "Similar Projects", key: "similarProjects" },
      { label: "Certifications", key: "requiredCertifications" },
      { label: "Legal Requirements", key: "legalRequirements" },
      { label: "Financial Standing", key: "financialStanding" },
      { label: "Technical Capability", key: "technicalCapability" },
    ],
  },
  {
    title: "Technical Specifications",
    fields: [
      { label: "Scope of Work", key: "scopeOfWork" },
      { label: "Technical Requirements", key: "technicalRequirements" },
      { label: "Quality Standards", key: "qualityStandards" },
      { label: "Delivery Timeline", key: "deliveryTimeline" },
      { label: "Acceptance Criteria", key: "acceptanceCriteria" },
      { label: "Performance Metrics", key: "performanceMetrics" },
      { label: "Deliverables", key: "requiredDeliverables" },
    ],
  },
  {
    title: "Evaluation Criteria",
    fields: [
      { label: "Technical Weight", key: "technicalWeight" },
      { label: "Financial Weight", key: "financialWeight" },
      { label: "Qualification Threshold", key: "qualificationThreshold" },
      { label: "Evaluation Methodology", key: "evaluationMethodology" },
      { label: "Scoring System", key: "scoringSystem" },
    ],
  },
  {
    title: "Bid Security",
    fields: [
      { label: "Security Amount", key: "bidSecurityAmount" },
      { label: "Security Form", key: "bidSecurityForm" },
      { label: "Validity (days)", key: "bidSecurityValidity" },
    ],
  },
  {
    title: "Schedule of Events",
    fields: [
      { label: "Pre-bid Meeting", key: "preBidMeeting" },
      { label: "Site Visit", key: "siteVisit" },
      { label: "Query Deadline", key: "queryDeadline" },
      { label: "Response to Queries", key: "responseToQueries" },
      { label: "Technical Bid Opening", key: "techBidOpening" },
      { label: "Financial Bid Opening", key: "financeBidOpening" },
    ],
  },
  {
    title: "Terms and Conditions",
    fields: [
      { label: "Payment Terms", key: "paymentTerms" },
      { label: "Warranty", key: "warrantyRequirements" },
      { label: "Insurance", key: "insuranceRequirements" },
      { label: "Sub-contracting", key: "subContractingRules" },
      { label: "Contract Amendment", key: "contractAmendment" },
      { label: "Dispute Resolution", key: "disputeResolution" },
      { label: "Force Majeure", key: "forceMajeure" },
      { label: "Termination", key: "terminationConditions" },
    ],
  },
  {
    title: "Attachments",
    fields: [
      { label: "Bidding Docs", key: "biddingDocs" },
      { label: "Technical Specs", key: "techSpecsDocs" },
      { label: "Draft Contract", key: "draftContract" },
      { label: "Bill of Quantities", key: "billQuantities" },
      { label: "Special Instructions", key: "specialInstructions" },
    ],
  },
];
