"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  buildBidWorkflowItems,
  getBidActionButtons,
  Status,
} from "@/utils/bidWorkflowData";
import WorkflowComponent from "../../tender/tender-landing/WorkFlowComponent";
import TemplateSelectorDialog from "../../tender/tender-landing/TemplateSelectorDialog";

export default function BidWorkflow({
  responseDetails,
  currentUserGroups,
}: {
  responseDetails?: any;
  currentUserGroups?: any[];
}) {
  const router = useRouter();

  /** ---------------- INITIAL STATES ---------------- */
  const initialTracker: Record<string, Status> =
    (responseDetails?.stepTracker as Record<string, Status>) ?? {
      "Supplier Profile Review": "IN PROGRESS",
      "Tender Analyzer": "PENDING",
      "Response Template Selection": "PENDING",
      "Response Draft": "PENDING",
      "Draft Approval": "PENDING",
      "Send for Bidding": "PENDING",
      Negotiation: "PENDING",
    };

  const [stepTracker, setStepTracker] =
    useState<Record<string, Status>>(initialTracker);
  const [isTemplateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [isFinalizeDialogOpen, setFinalizeDialogOpen] = useState(false);
  const [isNegotiationDialogOpen, setNegotiationDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);
  const [isResponseCreator, setResponseCreator] = useState(false);
  const [isResponseReviewer, setResponseReviewer] = useState(false);

  /** ---------------- ROLE CHECK ---------------- */
  useEffect(() => {
    if (currentUserGroups?.length) {
      const isCreator = currentUserGroups.some(
        (g) => g?.groupName === "Basic Data Access Group"
      );
      setResponseCreator(isCreator);
      setResponseReviewer(!isCreator);
    }
  }, [currentUserGroups]);

  /** ---------------- CURRENT STEP ---------------- */
  const currentStep = useMemo(
    () =>
      Object.keys(stepTracker).find((k) => stepTracker[k] === "IN PROGRESS") ??
      "",
    [stepTracker]
  );

  /** ---------------- HANDLERS ---------------- */
  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setStepTracker((prev) => ({
      ...prev,
      "Response Template Selection": "COMPLETED",
      "Response Draft": "IN PROGRESS",
    }));
    toast.success("Template selected successfully");
  };

  const handleProceedToDraft = () => {
    if (!selectedTemplate) {
      toast.error("Please select a response template first");
      return;
    }
    setStepTracker((prev) => ({
      ...prev,
      "Response Template Selection": "COMPLETED",
      "Response Draft": "IN PROGRESS",
    }));
    toast.success("Proceeded to Response Draft");
  };

  const handleFinalizeDraft = () => {
    setStepTracker((prev) => ({
      ...prev,
      "Response Draft": "COMPLETED",
      "Draft Approval": "IN PROGRESS",
    }));
    toast.success("Response Draft finalized and moved to Approval");
    setFinalizeDialogOpen(false);
  };

  const handleProceedToApproval = () => {
    setStepTracker((prev) => ({
      ...prev,
      "Response Draft": "COMPLETED",
      "Draft Approval": "IN PROGRESS",
    }));
    toast.success("Proceeded to Approval");
  };

  const handleApprove = () => {
    setStepTracker((prev) => ({
      ...prev,
      "Draft Approval": "COMPLETED",
      "Send for Bidding": "IN PROGRESS",
    }));
    toast.success("Draft approved successfully");
  };

  const handleReject = () => {
    setStepTracker((prev) => ({
      ...prev,
      "Draft Approval": "REJECTED",
      "Response Draft": "REJECTED",
    }));
    toast.error("Draft rejected");
  };

  const handleSendForBidding = () => {
    setStepTracker((prev) => ({
      ...prev,
      "Send for Bidding": "COMPLETED",
      Negotiation: "IN PROGRESS",
    }));
    toast.success("Response sent for bidding");
  };

  const handleRejectBid = () => {
    setStepTracker((prev) => ({
      ...prev,
      "Send for Bidding": "REJECTED",
    }));
    toast.error("Bid rejected");
  };

  const handleStartNegotiation = () => {
    setNegotiationDialogOpen(true);
  };

  const handleCompleteBid = () => {
    setStepTracker((prev) => ({
      ...prev,
      Negotiation: "COMPLETED",
    }));
    toast.success("Bid completed successfully");
  };

  /** ---------------- ACTION BUTTONS ---------------- */
  const stepActionButtons = useMemo(() => {
    const buttons = getBidActionButtons(
      currentStep,
      responseDetails?.id ?? "BID-001",
      () => setTemplateDialogOpen(true),
      () => setFinalizeDialogOpen(true),
      () => setNegotiationDialogOpen(true)
    );

    const actionMap: Record<string, () => void> = {
      "Select Response Template": () => setTemplateDialogOpen(true),
      "Proceed to Draft": handleProceedToDraft,
      "Finalize Response Draft": handleFinalizeDraft,
      "Proceed to Approval": handleProceedToApproval,
      Approve: handleApprove,
      Reject: handleReject,
      "Send for Bidding": handleSendForBidding,
      "Reject Bid": handleRejectBid,
      "Start Negotiation": handleStartNegotiation,
      "Complete Bid": handleCompleteBid,
    };

    return buttons.map((btn) => ({
      ...btn,
      btnFn: async () => {
        try {
          const fn = actionMap[btn.btnText];
          if (!fn) return;
          await fn();
        } catch (err) {
          console.error("Bid action error:", err);
          toast.error("Something went wrong");
        }
      },
    }));
  }, [currentStep, selectedTemplate, responseDetails]);

  /** ---------------- WORKFLOW ITEMS ---------------- */
  const items = useMemo(
    () =>
      buildBidWorkflowItems(stepTracker, isResponseCreator, isResponseReviewer),
    [stepTracker, isResponseCreator, isResponseReviewer]
  );

  /** ---------------- HANDLER PACKAGE ---------------- */
  const handlers = {
    openTemplateModal: () => setTemplateDialogOpen(true),
    openFinalize: () => setFinalizeDialogOpen(true),
    openNegotiationModal: () => setNegotiationDialogOpen(true),
    selectTemplate: handleTemplateSelect,
    proceedToDraft: handleProceedToDraft,
    proceedToApproval: handleProceedToApproval,
    approve: handleApprove,
    reject: handleReject,
    publish: handleSendForBidding,
    rejectPublish: handleRejectBid,
    actionButtons: stepActionButtons,
    selectedTemplate,
  };

  /** ---------------- UI RENDER ---------------- */
  return (
    <div className="flex-1 w-full mt-3">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Bid Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <WorkflowComponent items={items} handlers={handlers} />
          </CardDescription>
        </CardContent>
      </Card>

      {/* Template Selection Dialog */}
      <TemplateSelectorDialog
        isOpen={isTemplateDialogOpen}
        onClose={() => setTemplateDialogOpen(false)}
        onSelectTemplate={handleTemplateSelect}
      />

      {/* Finalize Draft Dialog */}
      {isFinalizeDialogOpen && (
        <div className="p-4 bg-white shadow-lg rounded-md border">
          <p className="mb-2 text-sm font-medium">
            Are you sure you want to finalize this response draft?
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleFinalizeDraft}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Confirm
            </button>
            <button
              onClick={() => setFinalizeDialogOpen(false)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Negotiation Dialog */}
      {isNegotiationDialogOpen && (
        <div className="p-4 bg-white shadow-lg rounded-md border">
          <p className="mb-2 text-sm font-medium">
            Negotiation process started.
          </p>
          <button
            onClick={() => {
              setNegotiationDialogOpen(false);
              handleCompleteBid();
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Complete Negotiation
          </button>
        </div>
      )}

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
