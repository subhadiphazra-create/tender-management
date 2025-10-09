import PageBackHeader from "@/components/main/AppBackHeader";
import TemplateForm from "@/components/main/templates/TemplateForm";
import React from "react";

export default function Page() {
  return (
    <div className="p-6 text-gray-100 bg-[#0b0b0b] max-h-screen w-full">
        <PageBackHeader />
        <div >
          <TemplateForm />
        </div>
    </div>
  );
}
