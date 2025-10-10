"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ---------- Reusable DataItem ----------
export const DataItem = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string | number | null;
  className?: string;
}) => (
  <div className={`space-y-1 ${className}`}>
    <p className="font-medium text-sm">{label}</p>
    <p className="text-sm text-muted-foreground">
      {value !== null && value !== undefined && value !== "" ? value : "N/A"}
    </p>
  </div>
);

// ---------- Reusable DetailCard ----------
export const DetailCard = ({
  title,
  data,
  columns = 3,
}: {
  title: string;
  data: { label: string; value: any }[];
  columns?: number; // optional column layout flexibility
}) => (
  <Card className="shadow-sm border rounded-2xl">
    <CardHeader>
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className={`grid grid-cols-${columns} gap-6`}>
        {data.map((item, i) => (
          <DataItem key={i} label={item.label} value={item.value} />
        ))}
      </div>
    </CardContent>
  </Card>
);
