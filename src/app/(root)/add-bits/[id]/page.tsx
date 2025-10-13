"use client";

import SummaryCard from "@/components/main/tender/tender-landing/SummaryCard";
import TenderDetailsView from "@/components/main/tender/tender-landing/TenderDetailsReview";
import Workflow from "@/components/main/tender/tender-landing/WorkflowCard";
import {
  dummyTenderData,
  dummyTenderExtendedData,
  dummyUserGroups,
} from "@/constants";
import { useParams } from "next/navigation";
import React from "react";
import { RfpDraft, UserGroup } from "../../../../../types/type";
import TenderDetailsBitsView from "@/components/main/tender-homepage/tender-bits-allocation/TenderDetailsBitsView";

type Props = {};

const AddBitsPage = (props: Props) => {
  const { id } = useParams();

  const draftExtendedDetails: RfpDraft = dummyTenderExtendedData[0];
  const draftDetails = dummyTenderData[0];
  const currentUserGroups: UserGroup[] = dummyUserGroups;

  return (
    <div className="p-6 flex flex-row max-h-screen">
      <div className="w-1/2">
        <SummaryCard draftDetails={dummyTenderData[0]} />
        <Workflow
          draftDetails={draftExtendedDetails}
          currentUserGroups={currentUserGroups}
        />
      </div>
      <TenderDetailsBitsView details={dummyTenderData[0]} />
    </div>
  );
};

export default AddBitsPage;
