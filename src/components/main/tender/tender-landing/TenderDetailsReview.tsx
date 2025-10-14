"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRef } from "react";
import { DetailCard } from "./DetailCard";
import ReadOnlyEditor from "../../read-only-text-editor";
import { tenderDetailsSections } from "@/constants/tenderDetailsConfig";

export default function TenderDetailsView({ details }: { details: any }) {
  const editorRef = useRef(null);

  return (
    <div className="relative w-full max-h-screen flex flex-col">
      {/* Header with Tabs */}
      <div className="sticky top-0 z-10 bg-background shadow-sm px-4 py-2 border-b">
        <Tabs defaultValue="tender-details" className="w-full">
          <TabsList className="flex w-fit">
            <TabsTrigger value="tender-content">Tender Content</TabsTrigger>
            <TabsTrigger value="tender-details">Tender Details</TabsTrigger>
          </TabsList>

          <div className="relative flex-1">
            {/* ✅ Tender Details tab with shadcn ScrollArea */}
            <TabsContent
              value="tender-details"
              className="p-0"
            >
              <ScrollArea className="h-[calc(100vh-100px)] p-4">
                <div className="space-y-6">
                  {tenderDetailsSections.map((section) => (
                    <DetailCard
                      key={section.title}
                      title={section.title}
                      data={section.fields.map((field) => ({
                        label: field.label,
                        value: details[field.key] ?? "N/A",
                      }))}
                    />
                  ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </TabsContent>

            {/* Tender Content tab (ReadOnly Editor) */}
            <TabsContent
              value="tender-content"
              className="h-[calc(100vh-100px)] overflow-y-auto p-4"
            >
              <ReadOnlyEditor
                height={725}
                onChange={() => {}}
                ref={editorRef}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
