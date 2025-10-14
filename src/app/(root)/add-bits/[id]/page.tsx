"use client";

import SummaryCard from "@/components/main/tender/tender-landing/SummaryCard";
import {
  dummyBidWorkflowData,
  dummyTenderData,
  dummyUserGroups,
} from "@/constants";
import { useParams } from "next/navigation";
import React from "react";
import { UserGroup } from "../../../../../types/type";
import TenderDetailsBitsView from "@/components/main/tender-homepage/tender-bits-allocation/TenderDetailsBitsView";
import BidWorkflow from "@/components/main/tender-homepage/tender-bits-allocation/BidWorkflow";

type Props = {};

const AddBitsPage = (props: Props) => {
  const { id } = useParams();

  const draftDetails = dummyBidWorkflowData[0];
  const currentUserGroups: UserGroup[] = dummyUserGroups;

  return (
    <div className="p-6 flex flex-row max-h-screen">
      <div className="w-1/2">
        <SummaryCard draftDetails={dummyTenderData[0]} columns={2} />
        <BidWorkflow
          responseDetails={draftDetails}
          currentUserGroups={currentUserGroups}
        />
      </div>
      <TenderDetailsBitsView details={dummyTenderData[0]} />
    </div>
  );
};

export default AddBitsPage;
