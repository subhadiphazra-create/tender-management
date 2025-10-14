import AnalyticsGrid from "@/components/main/analytics/AnalyticsGrid";
import PageBackHeader from "@/components/main/AppBackHeader";
import { analyticsSupplierData } from "@/constants/analyticsChartData";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="p-6 text-gray-100 bg-[#0b0b0b] max-h-screen w-full">
      <PageBackHeader title="Supplier Analytics Dashboard" />
      <AnalyticsGrid data={analyticsSupplierData} />
    </div>
  );
};

export default page;
