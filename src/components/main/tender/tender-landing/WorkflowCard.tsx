// components/workflow/Workflow.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  buildWorkflowItems,
  getActionButtons,
} from "@/utils/workflowData";
import WorkflowComponent from "./WorkFlowComponent";
import PlaceholderModal from "./PlaceholderModel";

export default function Workflow({
  draftDetails,
  currentUserGroups,
}: {
  draftDetails?: any;
  currentUserGroups?: any[];
}) {
  const [currentStep, setcurrentStep] = useState<string>("");
  const [isTemplateDialogOpen, setisTemplateDialogOpen] = useState(false);
  const [isFinalizeDraftDialogOpen, setisFinalizeDraftDialogOpen] =
    useState(false);

  const [isTenderCreator, setTenderCreator] = useState(false);
  const [isTenderReviewer, setTenderReviewer] = useState(false);

  const router = useRouter();
  const stepTracker = draftDetails?.stepTracker ?? {};
  const draftId = draftDetails?.id ?? "DRAFT-001";

  useEffect(() => {
    for (let step in stepTracker) {
      if (stepTracker[step] === "IN PROGRESS") {
        setcurrentStep(step);
        break;
      }
    }
  }, [stepTracker]);

  useEffect(() => {
    if (currentUserGroups) {
      const isCreator = currentUserGroups.some(
        (g) => g.groupName === "Basic Data Access Group"
      );
      setTenderCreator(isCreator);
      setTenderReviewer(isCreator);
    }
  }, [currentUserGroups]);

  const RfpDraftActionBtns = useMemo(
    () =>
      getActionButtons(
        currentStep,
        draftId,
        () => setisTemplateDialogOpen(true),
        () => setisFinalizeDraftDialogOpen(true)
      ),
    [currentStep]
  );

  const items = buildWorkflowItems(stepTracker, isTenderCreator, isTenderReviewer);

  return (
    <>
      <div className="flex-1 w-full mt-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <WorkflowComponent
                items={items}
                RfpDraftActionBtns={RfpDraftActionBtns}
              />
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <PlaceholderModal isOpen={isTemplateDialogOpen} title="Template Selection" />
      <PlaceholderModal
        isOpen={isFinalizeDraftDialogOpen}
        title="Finalize Tender Draft"
      />
    </>
  );
}
