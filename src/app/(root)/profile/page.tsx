"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Documents from "@/components/main/profile-components/Documents";
import ProcurementInformation from "@/components/main/profile-components/ProcurementInformation";
import ContactDetails from "@/components/main/profile-components/ContactDetails";
import BasicInformation from "@/components/main/profile-components/BasicInformation";
import { UserRoundPen } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-6 text-gray-100 bg-[#0b0b0b] max-h-screen w-full">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="buyer" className="w-auto">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger value="buyer" className="data-[state=active]:bg-gray-800">
              Buyer Details
            </TabsTrigger>
            <TabsTrigger value="supplier" className="data-[state=active]:bg-gray-800">
           Supplier Details
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button variant="outline" className="bg-gray-900 border-gray-700 hover:bg-gray-800">
            <UserRoundPen className="w-5 h-5" /> Edit Buyer Profile
          </Button>
          <Button variant="outline" className="bg-gray-900 border-gray-700 hover:bg-gray-800">
            <UserRoundPen className="w-5 h-5" /> Edit Supplier Profile
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="basic-info" className="mt-4">
        <TabsList className="bg-gray-900 border border-gray-800">
          <TabsTrigger value="basic-info" className="data-[state=active]:bg-gray-800">
            Basic Information
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-gray-800">
            Contact Details
          </TabsTrigger>
          <TabsTrigger value="procurement" className="data-[state=active]:bg-gray-800">
            Procurement Information
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-gray-800">
            Documents
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 bg-[#121212] border border-gray-800 rounded-lg p-6">
          <TabsContent value="basic-info">
            <BasicInformation />
          </TabsContent>
          <TabsContent value="contact">
            <ContactDetails />
          </TabsContent>
          <TabsContent value="procurement">
            <ProcurementInformation />
          </TabsContent>
          <TabsContent value="documents">
            <Documents />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
