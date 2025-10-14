import React from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";
import SupplierEditDialog from "@/components/main/profile-components/supplier-profile/SupplierEditDialog";

/** Status Types */
export type Status = "PENDING" | "IN PROGRESS" | "COMPLETED" | "REJECTED";

export interface Items {
  key: string;
  name: string;
  status: Status;
  color: string;
  dropdown: boolean;
}

export interface BidActionBtn {
  btnText: string;
  btnIcon?: React.ReactNode;
  btnFn?: () => void | Promise<void>;
}

/** Helper: Status → Tailwind color */
export const getStatusColor = (status: Status): string => {
  switch (status) {
    case "COMPLETED":
      return "text-green-500";
    case "IN PROGRESS":
      return "text-yellow-500";
    case "PENDING":
      return "text-gray-400";
    case "REJECTED":
      return "text-red-700";
    default:
      return "text-gray-400";
  }
};

/** Build Workflow Steps */
export const buildBidWorkflowItems = (
  stepTracker: Record<string, Status> = {},
  isResponseCreator = false,
  isResponseReviewer = false
): Items[] => {
  const hasInProgress = Object.values(stepTracker).includes("IN PROGRESS");

  const negotiation = (stepTracker["Negotiation"] ?? "PENDING") as Status;
  const sendForBidding = (stepTracker["Send for Bidding"] ?? "PENDING") as Status;
  const draftApproval = (stepTracker["Draft Approval"] ?? "PENDING") as Status;
  const responseDraft = (stepTracker["Response Draft"] ?? "PENDING") as Status;
  const templateSelection = (stepTracker["Response Template Selection"] ?? "PENDING") as Status;
  const tenderAnalyzer = (stepTracker["Tender Analyzer"] ?? "PENDING") as Status;
  const supplierProfile = (stepTracker["Supplier Profile Review"] ?? (!hasInProgress ? "IN PROGRESS" : "PENDING")) as Status;

  return [
    {
      key: "Negotiation",
      name: "Negotiation",
      status: negotiation,
      color: getStatusColor(negotiation),
      dropdown: negotiation === "IN PROGRESS" && isResponseReviewer,
    },
    {
      key: "Send for Bidding",
      name: "Send for Bidding",
      status: sendForBidding,
      color: getStatusColor(sendForBidding),
      dropdown: sendForBidding === "IN PROGRESS" && isResponseReviewer,
    },
    {
      key: "Draft Approval",
      name: "Draft Approval",
      status: draftApproval,
      color: getStatusColor(draftApproval),
      dropdown: draftApproval === "IN PROGRESS" && isResponseReviewer,
    },
    {
      key: "Response Draft",
      name: "Response Draft",
      status: responseDraft,
      color: getStatusColor(responseDraft),
      dropdown: responseDraft === "IN PROGRESS" && isResponseCreator,
    },
    {
      key: "Response Template Selection",
      name: "Response Template Selection",
      status: templateSelection,
      color: getStatusColor(templateSelection),
      dropdown: templateSelection === "IN PROGRESS" && isResponseCreator,
    },
    {
      key: "Tender Analyzer",
      name: "Tender Analyzer",
      status: tenderAnalyzer,
      color: getStatusColor(tenderAnalyzer),
      dropdown: tenderAnalyzer === "IN PROGRESS" && isResponseCreator,
    },
    {
      key: "Supplier Profile Review",
      name: "Supplier Profile Review",
      status: supplierProfile,
      color: getStatusColor(supplierProfile),
      dropdown: supplierProfile === "IN PROGRESS" && isResponseCreator,
    },
  ];
};

/** Dummy Buttons per Stage (all backend calls commented out) */
export const getBidActionButtons = (
  step: string,
  responseId: string,
  openTemplateModal: () => void,
  openFinalizeModal: () => void,
  openNegotiationModal: () => void,
  setStepTracker: React.Dispatch<React.SetStateAction<Record<string, Status>>>
): BidActionBtn[] => {
  switch (step) {
    case "Supplier Profile Review":
      return [
        {
          btnText: "Edit Supplier Details",
          btnIcon: <Check className="w-4 h-4" />,
          btnFn: async () => {
            // Open dummy dialog first
            const proceed = await new Promise<boolean>((resolve) => {
              const tempDiv = document.createElement("div");
              document.body.appendChild(tempDiv);
              const onClose = () => resolve(true);
              const Dialog = () => (
                <SupplierEditDialog
                  triggerText="Supplier Profile"
                  // onSubmit is handled internally
                />
              );
              resolve(true); // For demo we immediately resolve
            });

            if (proceed) {
              // Update state to move to next step
              setStepTracker((prev) => ({
                ...prev,
                "Supplier Profile Review": "COMPLETED",
                "Tender Analyzer": "IN PROGRESS",
              }));
              toast.success("Supplier Profile Completed. Moved to Tender Analyzer.");
            }
          },
        },
      ];

    case "Tender Analyzer":
      return [
        {
          btnText: "Proceed to Template Selection",
          btnIcon: <Check className="w-4 h-4" />,
          btnFn: async () => {
            setStepTracker((prev) => ({
              ...prev,
              "Tender Analyzer": "COMPLETED",
              "Response Template Selection": "IN PROGRESS",
            }));
            toast.success("Moved to Response Template Selection");
          },
        },
      ];

    case "Response Template Selection":
      return [
        {
          btnText: "Select Response Template",
          btnIcon: <Check className="w-4 h-4" />,
          btnFn: openTemplateModal,
        },
        {
          btnText: "Proceed to Draft",
          btnIcon: <Check className="w-4 h-4" />,
          btnFn: async () => {
            setStepTracker((prev) => ({
              ...prev,
              "Response Template Selection": "COMPLETED",
              "Response Draft": "IN PROGRESS",
            }));
            toast.success("Proceeded to Response Draft");
          },
        },
      ];

    case "Response Draft":
      return [
        {
          btnText: "Finalize Response Draft",
          btnIcon: <Check className="w-4 h-4" />,
          btnFn: openFinalizeModal,
        },
        {
          btnText: "Proceed to Approval",
          btnIcon: <Check className="w-4 h-4" />,
          btnFn: async () => {
            setStepTracker((prev) => ({
              ...prev,
              "Response Draft": "COMPLETED",
              "Draft Approval": "IN PROGRESS",
            }));
            toast.success("Proceeded to Approval");
          },
        },
      ];

    case "Draft Approval":
      return [
        {
          btnText: "Approve",
          btnIcon: <Check className="w-4 h-4" />,
          btnFn: async () => {
            setStepTracker((prev) => ({
              ...prev,
              "Draft Approval": "COMPLETED",
              "Send for Bidding": "IN PROGRESS",
            }));
            toast.success("Draft Approved");
          },
        },
        {
          btnText: "Reject",
          btnIcon: <Check className="w-4 h-4" />,
          btnFn: async () => {
            setStepTracker((prev) => ({
              ...prev,
              "Draft Approval": "REJECTED",
              "Response Draft": "REJECTED",
            }));
            toast.error("Draft Rejected");
          },
        },
      ];

    case "Send for Bidding":
      return [
        {
          btnText: "Send for Bidding",
          btnIcon: <Check className="w-4 h-4" />,
          btnFn: async () => {
            setStepTracker((prev) => ({
              ...prev,
              "Send for Bidding": "COMPLETED",
              "Negotiation": "IN PROGRESS",
            }));
            toast.success("Response Sent for Bidding");
          },
        },
        {
          btnText: "Reject Bid",
          btnIcon: <Check className="w-4 h-4" />,
          btnFn: async () => {
            setStepTracker((prev) => ({
              ...prev,
              "Send for Bidding": "REJECTED",
            }));
            toast.error("Bid Rejected");
          },
        },
      ];

    case "Negotiation":
      return [
        {
          btnText: "Complete Negotiation",
          btnIcon: <Check className="w-4 h-4" />,
          btnFn: async () => {
            setStepTracker((prev) => ({
              ...prev,
              "Negotiation": "COMPLETED",
            }));
            toast.success("Bid Completed");
          },
        },
      ];

    default:
      return [];
  }
};
