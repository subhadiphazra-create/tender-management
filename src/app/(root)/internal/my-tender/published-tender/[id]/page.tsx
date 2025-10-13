"use client";

import React, { useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TenderDetailsView from "@/components/main/tender/tender-landing/TenderDetailsReview";
import { dummyTenderData } from "@/constants";
import { useParams } from "next/navigation";
import TenderDetailsTabView from "@/components/main/tender/TenderDetailsTabView";
import ReadOnlyEditor from "@/components/main/read-only-text-editor";

type Props = {};

const accordionItems = [
  { id: "tender-details", title: "Tender Details" },
  { id: "uploaded-tender", title: "Uploaded Tender" },
  { id: "bid-list", title: "Bid List" },
];

const PublishedTenderPage = (props: Props) => {
  const editorRef = useRef(null);

  const { id } = useParams();
  const [openAccordion, setOpenAccordion] = useState<string | false>(false);

  const handleAccordionChange = (value: string | false) => {
    setOpenAccordion(value);
  };

  return (
    <div className="p-6 flex flex-col gap-4 max-h-screen">
      <Accordion
        type="single"
        collapsible
        value={openAccordion}
        onValueChange={handleAccordionChange}
      >
        {accordionItems.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              {item.id === "tender-details" && (
                <TenderDetailsTabView details={dummyTenderData[0]} />
              )}
              {item.id === "uploaded-tender" && (
                <ReadOnlyEditor
                  height={725}
                  onChange={() => {}}
                  ref={editorRef}
                />
              )}
              {item.id === "bid-list" && (
                <div>
                  <p>No bids available yet.</p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PublishedTenderPage;
