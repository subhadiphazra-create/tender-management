"use client";

import React from "react";
import AnalyticsCard from "./AnalyticsCard";
import { AnalyticsData } from "@/constants/analyticsChartData";

export default function AnalyticsGrid({ data }: { data: AnalyticsData[] }) {
  console.log("Analytics data through props",data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 w-full p-4">
      {data.map((item) => (
        <AnalyticsCard key={item.id} item={item} />
      ))}
    </div>
  );
}
