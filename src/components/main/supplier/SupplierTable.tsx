// SupplierTable.tsx
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
import { Supplier } from "../../../../types/type";

interface ColumnDef {
  key: keyof Supplier | string;
  label: string;
}

interface SupplierTableProps {
  columns: ColumnDef[];
  data: Supplier[];
  visibleColumns: string[];
}

export default function SupplierTable({
  columns,
  data,
  visibleColumns,
}: SupplierTableProps) {
  const visibleCols = columns.filter((c) => visibleColumns.includes(String(c.key)));

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
                <TableRow key={idx} className="hover:bg-muted/30 transition-colors">
                  {visibleCols.map((col) => (
                    <TableCell key={String(col.key)}>
                      {(row as any)[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleCols.length} className="text-center text-muted-foreground py-6">
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
