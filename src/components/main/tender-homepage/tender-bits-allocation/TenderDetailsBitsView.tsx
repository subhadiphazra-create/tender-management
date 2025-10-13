"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRef } from "react";
import ReadOnlyEditor from "../../read-only-text-editor";
import { tenderDetailsSections } from "@/constants/tenderDetailsConfig";
import { DetailCard } from "../../tender/tender-landing/DetailCard";
import { Card, CardContent } from "@/components/ui/card";

export default function TenderDetailsBitsView({ details }: { details: any }) {
  const editorRef = useRef(null);

  return (
    <div className="relative w-full max-h-screen flex flex-col">
      <div className="sticky top-0 z-10 bg-background shadow-sm px-4 py-2 border-b">
        <Tabs defaultValue="tender-details" className="w-full">
          <TabsList className="flex w-fit">
            <TabsTrigger value="tender-details">Tender Details</TabsTrigger>
            <TabsTrigger value="prerequisites">Prerequisites</TabsTrigger>
            <TabsTrigger value="tender-documents">Tender documents</TabsTrigger>
            <TabsTrigger value="my-response">My Response</TabsTrigger>
          </TabsList>

          <div className="relative flex-1">
            <TabsContent
              value="tender-details"
              className="h-[calc(100vh-100px)] overflow-y-auto p-4 space-y-6"
            >
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
            </TabsContent>

            <TabsContent
              value="prerequisites"
              className="h-[calc(100vh-100px)] overflow-y-auto p-4"
            >
              <Tabs defaultValue="prerequisite-overview" className="w-full">
                <TabsList className="flex w-fit">
                  <TabsTrigger value="prerequisite-overview">Prerequisite Overview</TabsTrigger>
                  <TabsTrigger value="supporting-documents">
                    Supporting document
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="prerequisite-overview"
                  className="h-[calc(100vh-100px)] overflow-y-auto p-4"
                >
                  <ReadOnlyEditor
                    height={725}
                    onChange={() => {}}
                    ref={editorRef}
                  />
                </TabsContent>
                 <TabsContent
                  value="supporting-documents"
                  className="h-[calc(100vh-100px)] overflow-y-auto p-4"
                >
                  <Card>
                    <CardContent>
                      No files avilable
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>
            <TabsContent
              value="tender-documents"
              className="h-[calc(100vh-100px)] overflow-y-auto p-4"
            >
              <ReadOnlyEditor
                height={725}
                onChange={() => {}}
                ref={editorRef}
              />
            </TabsContent>
            <TabsContent
              value="my-response"
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
