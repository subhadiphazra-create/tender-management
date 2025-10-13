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
import { MoreHorizontal } from "lucide-react";

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
              data.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                  {visibleCols.map((col) => {
                    const isActionCol = col.key === "Actions";
                    const isStatusCol = col.key === "Status";
                    const isClickable =
                      !isActionCol && !isStatusCol; // only non-action, non-status cells are clickable

                    return (
                      <TableCell
                        key={String(col.key)}
                        className={`${isClickable ? "cursor-pointer" : ""}`}
                        onClick={() => {
                          if (isClickable) {
                            router.push(row.status === "published" ? `/internal/my-tender/published-tender/${row.id}` :  `/internal/my-tender/${row.id}`);
                          }
                        }}
                      >
                        {col.key === "budget" ? (
                          `${
                            currencySymbols[row.currency] || ""
                          } ${row.budget.toLocaleString()}`
                        ) : col.key === "submissionDeadline" ? (
                          new Date(row.submissionDeadline).toLocaleDateString()
                        ) : col.key === "NoOfBids" ? (
                          0
                        ) : isStatusCol ? (
                          row.status === "published" ? (
                            <Badge className="bg-green-500 text-white">Published</Badge>
                          ) : (
                            <Badge className="bg-blue-500 text-white">Open</Badge>
                          )
                        ) : isActionCol ? (
                          row.status === "published" ? (
                            <span className="text-gray-400">No Action</span>
                          ) : (
                            <button
                              className="p-1 rounded hover:bg-muted cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation(); // prevent row click
                                router.push(`/internal/my-tender/edit-tender/${row.id}`);
                              }}
                            >
                              <MoreHorizontal size={20} />
                            </button>
                          )
                        ) : (
                          (row as any)[col.key]
                        )}
                      </TableCell>
                    );
                  })}
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
