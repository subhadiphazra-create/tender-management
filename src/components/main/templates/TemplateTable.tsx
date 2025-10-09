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
import { TemplateFormValues } from "../../../../types/type";

interface ColumnDef {
  key: keyof TemplateFormValues;
  label: string;
}

interface TemplateTableProps {
  columns: ColumnDef[];
  data: TemplateFormValues[];
  visibleColumns: string[];
}

export default function TemplateTable({
  columns,
  data,
  visibleColumns,
}: TemplateTableProps) {
  const visibleCols = columns.filter((c) =>
    visibleColumns.includes(String(c.key))
  );

  return (
    <div className="w-full border rounded-md overflow-hidden mt-3">
      <div className="overflow-auto max-h-[70vh]">
        <Table>
          {/* === Table Header === */}
          <TableHeader className="bg-muted/50">
            <TableRow>
              {visibleCols.map((col) => (
                <TableHead key={String(col.key)} className="font-semibold">
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* === Table Body === */}
          <TableBody>
            {data.length > 0 ? (
              data.map((row, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {visibleCols.map((col) => (
                    <TableCell key={String(col.key)}>
                      {String(row[col.key])}
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
