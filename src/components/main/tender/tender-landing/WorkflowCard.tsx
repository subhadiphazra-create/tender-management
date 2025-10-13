// components/workflow/Workflow.tsx
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
  buildWorkflowItems,
  getActionButtons,
  Status,
} from "@/utils/workflowData";
import WorkflowComponent from "./WorkFlowComponent";
import TemplateSelectorDialog from "./TemplateSelectorDialog";
import { TemplateFormValues } from "../../../../../types/type";

export default function Workflow({
  draftDetails,
  currentUserGroups,
}: {
  draftDetails?: any;
  currentUserGroups?: any[];
}) {
  const router = useRouter();

  const initialTracker: Record<string, Status> =
    (draftDetails?.stepTracker as Record<string, Status>) ?? {
      Publish: "PENDING",
      Approval: "PENDING",
      Draft: "PENDING",
      "Template Selection": "IN PROGRESS",
      "Draft Creation": "COMPLETED",
    };

  const [stepTracker, setStepTracker] = useState<Record<string, Status>>(initialTracker);
  const [isTemplateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateFormValues | null>(null);

  const [isTenderCreator, setTenderCreator] = useState(false);
  const [isTenderReviewer, setTenderReviewer] = useState(false);

  useEffect(() => {
    if (currentUserGroups?.length) {
      const isCreator = currentUserGroups.some(
        (g) => g?.groupName === "Basic Data Access Group"
      );
      setTenderCreator(isCreator);
      setTenderReviewer(isCreator);
    }
  }, [currentUserGroups]);

  const currentStep = useMemo(
    () => Object.keys(stepTracker).find((k) => stepTracker[k] === "IN PROGRESS") ?? "",
    [stepTracker]
  );

  /** ----------------- HANDLERS ----------------- */
  const handleProceedToDraft = () => {
    if (!selectedTemplate) return false;
    setStepTracker((prev) => ({
      ...prev,
      "Template Selection": "COMPLETED",
      Draft: "IN PROGRESS",
    }));
    return true;
  };

  const handleFinalize = () => {
    if (!selectedTemplate) {
      toast.error("Please select a template before finalizing.");
      return;
    }

    setStepTracker((prev) => ({
      ...prev,
      Draft: "COMPLETED",
      Approval: "IN PROGRESS",
    }));

    toast.success("Draft finalized. Redirecting...");

    // Redirect directly to review-draft with selected template id
    router.push(
      `/internal/my-tender/${draftDetails?.id ?? "DRAFT-001"}/review-draft/${selectedTemplate.id}`
    );
  };

  const handleBackToTemplate = () => {
    setStepTracker((prev) => ({
      ...prev,
      "Template Selection": "IN PROGRESS",
      Draft: "PENDING",
      Approval: "PENDING",
    }));
  };

  const handleProceedToApproval = () => {
    setStepTracker((prev) => ({
      ...prev,
      Draft: "COMPLETED",
      Approval: "IN PROGRESS",
    }));
  };

  const handleApprove = () => {
    setStepTracker((prev) => ({
      ...prev,
      Approval: "COMPLETED",
      Publish: "IN PROGRESS",
    }));
  };

  const handleReject = () => {
    setStepTracker((prev) => ({
      ...prev,
      Approval: "REJECTED",
      Draft: "REJECTED",
      Publish: "REJECTED",
    }));
  };

  const handlePublish = () => {
    router.push(`/publish/${draftDetails?.id ?? "DRAFT-001"}`);
  };

  const handleRejectPublish = () => {
    setStepTracker((prev) => ({ ...prev, Publish: "REJECTED" }));
  };

  const handleTemplateSelect = (template: TemplateFormValues) => {
    setSelectedTemplate(template);
    setStepTracker((prev) => ({
      ...prev,
      "Template Selection": "COMPLETED",
      Draft: "IN PROGRESS",
    }));
  };

  /** ----------------- STEP ACTION BUTTONS ----------------- */
  const stepActionButtons = useMemo(() => {
    const buttons = getActionButtons(
      currentStep,
      draftDetails?.id ?? "DRAFT-001",
      () => setTemplateDialogOpen(true),
      handleFinalize // finalize now directly redirects
    );

    const actionMap: Record<string, () => void> = {
      Approve: () => { handleApprove(); toast.success("Tender approved successfully"); },
      Reject: () => { handleReject(); toast.error("Tender rejected"); },
      "Proceed to Draft": () => {
        const ok = handleProceedToDraft();
        ok ? toast.success("Proceeded to Draft successfully") : toast.error("Select a template first");
      },
      "Proceed to Approval": () => { handleProceedToApproval(); toast.success("Proceeded to Approval"); },
      "Publish Tender": () => { handlePublish(); toast.success("Published successfully"); },
      "Reject Tender": () => { handleRejectPublish(); toast.error("Publish rejected"); },
      "Back to Draft": () => { handleBackToTemplate(); toast("Back to Draft"); },
      "Back to Template Section": () => { handleBackToTemplate(); toast("Back to Template Section"); },
      Finalize: handleFinalize, // new direct finalize action
    };

    return buttons.map((btn) => ({
      ...btn,
      btnFn: async () => {
        try {
          await btn.btnFn?.();
          actionMap[btn.btnText]?.();
        } catch (err) {
          console.error("Action error", err);
          toast.error("Something went wrong");
        }
      },
    }));
  }, [currentStep, selectedTemplate, draftDetails]);

  const items = useMemo(
    () => buildWorkflowItems(stepTracker, isTenderCreator, isTenderReviewer),
    [stepTracker, isTenderCreator, isTenderReviewer]
  );

  const handlers = {
    openTemplateModal: () => setTemplateDialogOpen(true),
    selectTemplate: handleTemplateSelect,
    proceedToDraft: handleProceedToDraft,
    openFinalize: handleFinalize,
    backToTemplate: handleBackToTemplate,
    proceedToApproval: handleProceedToApproval,
    approve: handleApprove,
    reject: handleReject,
    publish: handlePublish,
    rejectPublish: handleRejectPublish,
    actionButtons: stepActionButtons,
    selectedTemplate,
  };

  return (
    <div className="flex-1 w-full mt-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <WorkflowComponent items={items} handlers={handlers} />
          </CardDescription>
        </CardContent>
      </Card>

      <TemplateSelectorDialog
        isOpen={isTemplateDialogOpen}
        onClose={() => setTemplateDialogOpen(false)}
        onSelectTemplate={handleTemplateSelect}
      />

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
