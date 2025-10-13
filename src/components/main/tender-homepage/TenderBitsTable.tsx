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
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface ColumnDef {
  key: keyof TenderFormSchema | string;
  label: string;
}

interface TenderTableProps {
  columns: ColumnDef[];
  data: TenderFormSchema[];
}

export default function TenderBitsTable({ columns, data }: TenderTableProps) {
  const router = useRouter();

  // Helper to calculate days remaining
  const calculateTimeRemaining = (deadline: string) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `${diff} days left` : "Closed";
  };

  return (
    <div className="w-full border rounded-md overflow-hidden mt-3">
      <div className="overflow-auto max-h-[70vh]">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.key)} className="font-semibold">
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              data.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() =>
                    router.push(`/add-bits/${row.id}`)
                  }
                >
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>
                      {col.key === "status" ? (
                        <Badge className="bg-blue-500 text-white">Bid Pending</Badge>
                      ) : col.key === "timeRemaining" ? (
                        calculateTimeRemaining(row.submissionDeadline)
                      ) : col.key === "bidEndDate" ? (
                        new Date(row.submissionDeadline).toLocaleDateString()
                      ) : (
                        (row as any)[col.key] || "—"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-muted-foreground py-6"
                >
                  No tenders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
