"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon";
import { UserRoundPen } from "lucide-react";
import { profileTabs } from "@/constants";
import TabRenderer from "@/components/main/profile-components/profile-data-render";
import BuyerEditDialog from "@/components/main/profile-components/BuyerEdit/BuyerEditDialog";
import SupplierEditDialog from "@/components/main/profile-components/SupplierEdit/SupplierEditDialog";

export default function ProfilePage() {
  const [activeMainTab, setActiveMainTab] = useState(profileTabs[0].id);
  const [activeSubTab, setActiveSubTab] = useState(
    profileTabs[0].subTabs[0].title
  );

  const activeMain = profileTabs.find((tab) => tab.id === activeMainTab);

  return (
    <div className="p-6 text-gray-100 bg-[#0b0b0b] max-h-screen w-full">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <Tabs
          value={activeMainTab}
          onValueChange={(val) => {
            setActiveMainTab(val);
            setActiveSubTab(
              profileTabs.find((t) => t.id === val)?.subTabs[0].title ?? ""
            );
          }}
          className="w-auto"
        >
          <TabsList className="bg-gray-900 border border-gray-800">
            {profileTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 data-[state=active]:bg-gray-800"
              >
                <Icon name={tab.icon} className="w-4 h-4" />
                {tab.mainTabsTitle}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Edit Buttons */}
        <div className="flex gap-2">
          {profileTabs.map((tab) =>
            tab.id === "1" ? (
              <BuyerEditDialog
                key={tab.id}
                triggerText={`Edit ${tab.mainTabsTitle}`}
              />
            ) : (
              <SupplierEditDialog
                key={tab.id}
                triggerText={`Edit ${tab.mainTabsTitle}`}
              />
            )
          )}
        </div>
      </div>

      {/* Sub Tabs */}
      {activeMain && (
        <Tabs
          value={activeSubTab}
          onValueChange={(val) => setActiveSubTab(val)}
          className="mt-4"
        >
          <TabsList className="bg-gray-900 border border-gray-800 flex flex-wrap w-full">
            {activeMain.subTabs.map((sub) => (
              <TabsTrigger
                key={sub.title}
                value={sub.title}
                className="data-[state=active]:bg-gray-800 whitespace-nowrap"
              >
                {sub.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-6 bg-[#121212] border border-gray-800 rounded-lg p-6">
            {activeMain.subTabs.map((sub) => (
              <TabsContent key={sub.title} value={sub.title}>
                <TabRenderer fields={sub.fields} data={sub.data} />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      )}
    </div>
  );
}
