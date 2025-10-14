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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import DeleteDialog from "./DeleteDialog";

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

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<TenderFormSchema | null>(
    null
  );

  const handleDelete = () => {
    console.log("Deleted:", selectedRow?.id);
    setDeleteDialogOpen(false);
  };

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
                <TableRow
                  key={row.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {visibleCols.map((col) => {
                    const isActionCol = col.key === "Actions";
                    const isStatusCol = col.key === "Status";
                    const isClickable = !isActionCol && !isStatusCol;

                    return (
                      <TableCell
                        key={String(col.key)}
                        className={`${isClickable ? "cursor-pointer" : ""}`}
                        onClick={() => {
                          if (isClickable) {
                            router.push(
                              row.status === "published"
                                ? `/internal/my-tender/published-tender/${row.id}`
                                : `/internal/my-tender/${row.id}`
                            );
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
                            <Badge className="bg-green-500 text-white">
                              Published
                            </Badge>
                          ) : (
                            <Badge className="bg-blue-500 text-white">
                              Open
                            </Badge>
                          )
                        ) : isActionCol ? (
                          row.status === "published" ? (
                            <span className="text-gray-400">No Action</span>
                          ) : (
                            <div className="flex items-center">
                              {/* Dropdown for Edit / Delete */}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="p-1"
                                  >
                                    <MoreHorizontal size={20} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      router.push(
                                        `/internal/my-tender/edit-tender/${row.id}`
                                      );
                                    }}
                                  >
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedRow(row);
                                      setDeleteDialogOpen(true);
                                    }}
                                  >
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
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

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        itemName={selectedRow?.title || ""}
        onDelete={handleDelete}
      />
    </div>
  );
}
