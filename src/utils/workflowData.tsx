// utils/workflowData.ts
import React from "react";
import { toast } from "sonner";
import { CheckCheck } from "lucide-react";

/**
 * Types shared by components
 */
export type Status = "PENDING" | "IN PROGRESS" | "COMPLETED" | "REJECTED";

export interface Items {
  key: string;
  name: string;
  status: Status;
  color: string;
  dropdown: boolean;
}

export interface RfpDraftActionBtn {
  btnText: string;
  btnIcon?: React.ReactNode;
  btnFn?: () => void | Promise<void>;
}

/**
 * Helper: status -> tailwind color class
 */
export const getStatusColor = (status: Status): string => {
  switch (status) {
    case "COMPLETED":
      return "text-green-500";
    case "IN PROGRESS":
      return "text-yellow-500";
    case "PENDING":
      return "text-red-500";
    case "REJECTED":
      return "text-red-700";
    default:
      return "text-gray-400";
  }
};

/**
 * NOTE:
 * These "backend" actions are stubs — replace with actual API calls.
 * They currently return Promises or log for demo & testing.
 */
export const proceedToDraft = async (id: string) => {
  console.log("Proceed to Draft", id);
  return Promise.resolve(true);
};
export const proceedToApproval = async (id: string) => {
  console.log("Proceed to Approval", id);
  return Promise.resolve(true);
};
export const approveDraft = async (id: string) => {
  console.log("Approve Draft", id);
  return Promise.resolve(true);
};
export const rejectDraft = async (id: string) => {
  console.log("Reject Draft", id);
  return Promise.resolve(true);
};
export const publishTender = async (id: string) => {
  console.log("Publish Tender", id);
  return Promise.resolve(true);
};
export const rejectPublish = async (id: string) => {
  console.log("Reject Publish", id);
  return Promise.resolve(true);
};

export const buildWorkflowItems = (
  stepTracker: Record<string, Status> = {},
  isTenderCreator = false,
  isTenderReviewer = false
): Items[] => {
  // detect if any step is "IN PROGRESS"
  const hasInProgress = Object.values(stepTracker).includes("IN PROGRESS");

  const publish = (stepTracker["Publish"] ?? "PENDING") as Status;
  const approval = (stepTracker["Approval"] ?? "PENDING") as Status;
  const draft = (stepTracker["Draft"] ?? "PENDING") as Status;
  // 👇 make template IN PROGRESS if nothing else is
  const template = (stepTracker["Template Selection"] ??
    (!hasInProgress ? "IN PROGRESS" : "PENDING")) as Status;
  const draftCreation = (stepTracker["Draft Creation"] ??
    "COMPLETED") as Status;

  return [
    {
      key: "Publish",
      name: "Publish Tender for Bidding",
      status: publish,
      color: getStatusColor(publish),
      dropdown: publish === "IN PROGRESS" && isTenderReviewer,
    },
    {
      key: "Approval",
      name: "Tender Draft Approval",
      status: approval,
      color: getStatusColor(approval),
      dropdown: approval === "IN PROGRESS" && isTenderReviewer,
    },
    {
      key: "Draft",
      name: "Tender Draft",
      status: draft,
      color: getStatusColor(draft),
      dropdown: draft === "IN PROGRESS" && isTenderCreator,
    },
    {
      key: "Template Selection",
      name: "Buyer Template Section",
      status: template,
      color: getStatusColor(template),
      dropdown: template === "IN PROGRESS" && isTenderCreator,
    },
    {
      key: "Draft Creation",
      name: "Draft Creation",
      status: draftCreation,
      color: getStatusColor(draftCreation),
      dropdown: false,
    },
  ];
};

export const getActionButtons = (
  step: string,
  draftId: string,
  openTemplate: () => void,
  openFinalize: () => void
  // add optional flags so caller can pass state (like whether template selected)
): RfpDraftActionBtn[] => {
  switch (step) {
    case "Template Selection":
      return [
        {
          btnText: "Proceed to Draft",
          btnIcon: <CheckCheck className="w-4 h-4" />,
          btnFn: async () => {
            // caller should ensure template is selected; we still do minimal CheckCheck
            if (!draftId) {
              toast.error("Invalid draft id");
              return;
            }
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
            if (!draftId) {
              toast.error("Invalid draft id");
              return;
            }
            await proceedToApproval(draftId);
            toast.success("Proceeded to Approval");
          },
        },
        {
          btnText: "Finalize Tender Draft",
          btnIcon: <CheckCheck className="w-4 h-4" />,
          btnFn: openFinalize,
        },
        {
          btnText: "Back to Template Section",
          btnIcon: <CheckCheck className="w-4 h-4" />,
          btnFn: () => {
            // handled by caller (UI) to set tracker
            toast("Back to Template Section");
          },
        },
      ];

    case "Approval":
      return [
        {
          btnText: "Approve",
          btnIcon: <CheckCheck className="w-4 h-4" />,
          btnFn: async () => {
            if (!draftId) {
              toast.error("Invalid draft id");
              return;
            }
            await approveDraft(draftId);
            toast.success("Approved");
          },
        },
        {
          btnText: "Reject",
          btnIcon: <CheckCheck className="w-4 h-4" />,
          btnFn: async () => {
            if (!draftId) {
              toast.error("Invalid draft id");
              return;
            }
            await rejectDraft(draftId);
            toast.error("Rejected");
          },
        },
        {
          btnText: "Back to Draft",
          btnIcon: <CheckCheck className="w-4 h-4" />,
          btnFn: () => {
            toast("Back to Draft");
          },
        },
      ];

    case "Publish":
      return [
        {
          btnText: "Publish Tender",
          btnIcon: <CheckCheck className="w-4 h-4" />,
          btnFn: async () => {
            if (!draftId) {
              toast.error("Invalid draft id");
              return;
            }
            await publishTender(draftId);
            toast.success("Published");
          },
        },
        {
          btnText: "Reject Tender",
          btnIcon: <CheckCheck className="w-4 h-4" />,
          btnFn: async () => {
            if (!draftId) {
              toast.error("Invalid draft id");
              return;
            }
            await rejectPublish(draftId);
            toast.error("Publish Rejected");
          },
        },
      ];

    default:
      return [];
  }
};
