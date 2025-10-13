"use client";

import DraftReview from "@/components/main/tender/tender-landing/ReviewDraft";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const params = useParams(); // params is an object
  const { id, templateId } = params as { id: string; templateId: string }; // destructure params

  if (!id || !templateId) {
    return <div className="p-6">Invalid draft or template ID</div>;
  }

  return (
    <div className="p-6 max-h-screen">
      <DraftReview id={id} templateId={templateId} />
    </div>
  );
};

export default Page;
