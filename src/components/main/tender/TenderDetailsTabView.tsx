"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DetailCard } from "./tender-landing/DetailCard";
import { tabSections } from "@/constants/tabsSection";
export default function TenderDetailsTabView({ details }: { details: any }) {
  const [activeTab, setActiveTab] = useState("Basic Details");

  // 🧩 Main Tabs Configuration

  return (
    <div className="w-full">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full flex flex-col gap-4"
      >
        <TabsList className="flex flex-wrap justify-start w-full">
          {tabSections.map((tab) => (
            <TabsTrigger key={tab.title} value={tab.title}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabSections.map((tab) => (
          <TabsContent key={tab.title} value={tab.title}>
            <div className="flex flex-col gap-4">
              {tab.subSections.map((sub, index) => {
                const sectionData = sub.fields.map((f) => ({
                  label: f.label,
                  value: details?.[f.key] || "—",
                }));
                return (
                  <DetailCard
                    key={index}
                    title={sub.title}
                    data={sectionData}
                    columns={3}
                  />
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
