import React from "react";
import { toast } from "sonner";
import { CheckCheck } from "lucide-react";
import { Items, RfpDraftActionBtns } from "../../types/type";

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "COMPLETED":
      return "text-green-500";
    case "IN PROGRESS":
      return "text-yellow-500";
    case "PENDING":
      return "text-red-500";
    default:
      return "text-gray-400";
  }
};

// Stub backend actions
export const proceedToDraft = async (id: string) => console.log("Proceed to Draft", id);
export const proceedToApproval = async (id: string) => console.log("Proceed to Approval", id);
export const approveDraft = async (id: string) => console.log("Approve Draft", id);
export const rejectDraft = async (id: string) => console.log("Reject Draft", id);

export const getActionButtons = (
  step: string,
  draftId: string,
  openTemplate: () => void,
  openFinalize: () => void
): RfpDraftActionBtns[] => {
  switch (step) {
    case "Template Selection":
      return [
        {
          btnText: "Proceed to Draft",
          btnIcon: <CheckCheck className="w-4 h-4" />,
          btnFn: async () => {
            await proceedToDraft(draftId);
            toast.success("Proceeded to Draft");
          },
        },
        {
          btnText: "Select Template",
          btnIcon: <CheckCheck className="w-4 h-4" />,
          btnFn: openTemplate,
        },
      ];

    case "Draft":
      return [
        {
          btnText: "Proceed to Approval",
          btnIcon: <CheckCheck className="w-4 h-4" />,
          btnFn: async () => {
            await proceedToApproval(draftId);
            toast.success("Proceeded to Approval");
          },
        },
        {
          btnText: "Finalize Tender Draft",
          btnIcon: <CheckCheck className="w-4 h-4" />,
          btnFn: openFinalize,
        },
      ];

    case "Approval":
      return [
        {
          btnText: "Approve",
          btnIcon: <CheckCheck className="w-4 h-4" />,
          btnFn: async () => {
            await approveDraft(draftId);
            toast.success("Approved");
          },
        },
        {
          btnText: "Reject",
          btnIcon: <CheckCheck className="w-4 h-4" />,
          btnFn: async () => {
            await rejectDraft(draftId);
            toast.error("Rejected");
          },
        },
      ];

    default:
      return [];
  }
};

export const buildWorkflowItems = (
  stepTracker: Record<string, string>,
  isTenderCreator: boolean,
  isTenderReviewer: boolean
): Items[] => [
  {
    name: "Publish Tender for Bidding",
    status: stepTracker["Publish"] ?? "PENDING",
    color: getStatusColor(stepTracker["Publish"]),
    dropdown:
      stepTracker["Publish"] === "IN PROGRESS" && isTenderReviewer ? true : false,
  },
  {
    name: "Tender Draft Approval",
    status: stepTracker["Approval"] ?? "PENDING",
    color: getStatusColor(stepTracker["Approval"]),
    dropdown:
      stepTracker["Approval"] === "IN PROGRESS" && isTenderReviewer ? true : false,
  },
  {
    name: "Tender Draft",
    status: stepTracker["Draft"] ?? "PENDING",
    color: getStatusColor(stepTracker["Draft"]),
    dropdown:
      stepTracker["Draft"] === "IN PROGRESS" && isTenderCreator ? true : false,
  },
  {
    name: "Buyer Template Section",
    status: stepTracker["Template Selection"] ?? "PENDING",
    color: getStatusColor(stepTracker["Template Selection"]),
    dropdown:
      stepTracker["Template Selection"] === "IN PROGRESS" && isTenderCreator
        ? true
        : false,
  },
];
