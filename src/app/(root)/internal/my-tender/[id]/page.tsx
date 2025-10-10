"use client";

import SummaryCard from "@/components/main/tender/tender-landing/SummaryCard";
import TenderDetailsView from "@/components/main/tender/tender-landing/TenderDetailsReview";
import Workflow from "@/components/main/tender/tender-landing/WorkflowCard";
import { dummyTenderData } from "@/constants";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const TenderPage = (props: Props) => {
  const { id } = useParams();

  const workflowItems = [
    { title: "Draft Creation", status: "COMPLETED", expandable: true },
    { title: "Approval", status: "IN PROGRESS", expandable: true },
    { title: "Publication", status: "PENDING", expandable: true },
    { title: "Submission Review", status: "PENDING", expandable: true },
  ];

  return (
    <div className="p-6 flex flex-row max-h-screen">
      <div className="w-1/2">
      <SummaryCard draftDetails={dummyTenderData[0]}/>
      <Workflow/>

      </div>
      <TenderDetailsView details={dummyTenderData[0]} />
    </div>
  );
};

export default TenderPage;
