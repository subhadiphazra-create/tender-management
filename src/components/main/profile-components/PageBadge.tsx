"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface PageBadgeProps {
  current: number;
  total: number;
}

export default function PageBadge({ current, total }: PageBadgeProps) {
  return (
    <Badge className="bg-gray-700 text-white px-3 py-1 rounded-full">
      {current} / {total}
    </Badge>
  );
}
