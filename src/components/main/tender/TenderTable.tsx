// TenderTable.tsx
"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TenderFormSchema } from "../../../../schema/tenderFormSchema";
import { currencySymbols } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface ColumnDef {
  key: keyof TenderFormSchema | string;
  label: string;
}

interface TenderTableProps {
  columns: ColumnDef[];
  data: TenderFormSchema[];
  visibleColumns: string[];
}

export default function TenderTable({
  columns,
  data,
  visibleColumns,
}: TenderTableProps) {
  const visibleCols = columns.filter((c) =>
    visibleColumns.includes(String(c.key))
  );

  const router = useRouter();

  return (
    <div className="w-full border rounded-md overflow-hidden mt-3">
      <div className="overflow-auto max-h-[70vh]">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {visibleCols.map((col) => (
                <TableHead key={String(col.key)} className="font-semibold">
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              data.map((row, idx) => (
                  <TableRow
                    key={idx}
                    className="hover:bg-muted/30 transition-colors"
                    onClick={() => router.push(`/internal/my-tender/${row.id}`)}
                  >
                    {visibleCols.map((col) => (
                      <TableCell key={String(col.key)}>
                        {col.key === "budget" ? (
                          `${
                            currencySymbols[row.currency] || ""
                          } ${row.budget.toLocaleString()}`
                        ) : col.key === "submissionDeadline" ? (
                          new Date(row.submissionDeadline).toLocaleDateString()
                        ) : col.key === "NoOfBids" ? (
                          0 // Example placeholder
                        ) : col.key === "Status" ? (
                          <Badge className="bg-blue-500"> Open</Badge>
                        ) : col.key === "Actions" ? (
                          <button>No Action</button>
                        ) : (
                          (row as any)[col.key]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={visibleCols.length}
                  className="text-center text-muted-foreground py-6"
                >
                  No rows found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
