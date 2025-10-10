"use client";

import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { DetailCard } from "./DetailCard";
import moment from "moment";
import { Tooltip } from "@/components/ui/tooltip";

interface TenderDraftDetailsProps {
  draftDetails: any;
}

export default function SummaryCard({ draftDetails }: TenderDraftDetailsProps) {
  const momentObj = moment(draftDetails?.submissionDeadline);
  const isAfter = momentObj.isAfter(moment(), "day");

  // ---- Build detail data ----
  const tenderData = [
    { label: "Tender Name", value: draftDetails?.title },
    {
      label: "Industry",
      value: draftDetails?.tender_department ?? "N/A",
    },
    {
      label: "Budget",
      value: draftDetails?.budget ?? "N/A",
    },
    {
      label: "Submission Deadline",
      value: draftDetails?.submissionDeadline ?? "N/A",
    },
    {
      label: "Reference No",
      value: draftDetails?.referenceNumber ?? "N/A",
    },
  ];

  return (
    <div className="w-full">
      {/* Reusable Detail Card */}
      <DetailCard title="Tender Details" data={tenderData} columns={1} />
    </div>
  );
}
