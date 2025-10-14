import AnalyticsGrid from "@/components/main/analytics/AnalyticsGrid";
import PageBackHeader from "@/components/main/AppBackHeader";
import { analyticsBuyerData } from "@/constants/analyticsChartData";
import React from "react";

type Props = {};

const page = (props: Props) => {

  return (
    <div className="p-6 text-gray-100 bg-[#0b0b0b] max-h-screen w-full">
    <PageBackHeader title="Buyer Analytics Dashboard"/>
      <AnalyticsGrid data={analyticsBuyerData} />
    </div>
  );
};

export default page;
