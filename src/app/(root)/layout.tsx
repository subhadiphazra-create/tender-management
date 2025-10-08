import Sidebar from "@/components/main/AppSidebar";
import React from "react";

const RootSectionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen bg-[#0b0b0b] text-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content area (takes full remaining width) */}
      <div className="flex-1 min-h-screen overflow-y-auto">
        {children}
      </div>
    </main>
  );
};

export default RootSectionLayout;
