"use client";

import PageBackHeader from "@/components/main/AppBackHeader";
import TenderForm from "@/components/main/tender/TenderForm";
import { useParams } from "next/navigation";

export default function Page() {
  const { tenderId } = useParams<{ tenderId: string }>();

  return (
    <div className="p-6 text-gray-100 bg-[#0b0b0b] max-h-screen w-full">
      <PageBackHeader title="Edit Tender" />
      <TenderForm tenderId={tenderId} />
    </div>
  );
}
