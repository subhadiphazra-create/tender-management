"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppToolbar, { FilterOption } from "@/components/main/AppToolbar";
import TemplateTable from "@/components/main/templates/TemplateTable";
import AppPaginationControls from "@/components/main/AppPaginationControls";
import { responseData } from "@/constants";
import { responseSchema } from "../../../../../schema/response-chema";
import { responseFields } from "@/constants/formFields";
import { Upload } from "lucide-react";

export default function TenderResponsePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "responseTitle",
    "department",
    "sector",
    "product_service",
    "country",
    "responseDeadline",
    "file",
  ]);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // ✅ Define columns for the table
  const columns = useMemo(
    () => [
      { key: "responseTitle", label: "Response Title" },
      { key: "department", label: "Department" },
      { key: "sector", label: "Sector" },
      { key: "product_service", label: "Product/Service" },
      { key: "country", label: "Country" },
      { key: "responseDeadline", label: "Deadline" },
      { key: "file", label: "File" },
    ],
    []
  );

  // ✅ Toolbar filter options
  const columnOptions: FilterOption[] = useMemo(
    () =>
      columns.map((col) => ({
        label: col.label,
        value: col.key,
        field: "column",
      })),
    [columns]
  );

  // ✅ Apply search and filter logic
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();

    let data = responseData.filter((row) => {
      // Search across visible columns
      if (term) {
        const match = visibleColumns.some((key) =>
          String((row as any)[key] || "")
            .toLowerCase()
            .includes(term)
        );
        if (!match) return false;
      }

      // Column filter
      if (filters.column && filters.column.length > 0) {
        const newVisible = visibleColumns.filter((col) =>
          filters.column.includes(col)
        );
        if (JSON.stringify(newVisible) !== JSON.stringify(visibleColumns)) {
          setVisibleColumns(newVisible);
        }
      }

      return true;
    });

    return data;
  }, [searchTerm, filters, visibleColumns]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // ✅ Format file display
  const formattedData = paginatedData.map((row) => ({
    ...row,
    file: (row.file as File)?.name || "No file uploaded",
  }));

  const handleSubmit = useCallback(async (data: any) => {
    console.log("✅ RFP Form Data:", data);
    try {
      const id = crypto.randomUUID();
      console.log("RFP uploaded successfully with ID:", id);
      // Optionally: call your API or mutation here
    } catch (error) {
      console.error("Error uploading RFP:", error);
    }
  }, []);

  return (
    <div className="p-6 flex flex-col min-h-screen">
      <AppToolbar
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        filterOptions={columnOptions}
        showDialog
        dialogTitle="Upload Response"
        dialogTriggerLabel="Upload Response"
        dialogFields={responseFields}
        dialogIcon={<Upload className="w-4 h-4" />}
        showViewButton
        dialogSchema={responseSchema}
        onDialogSubmit={handleSubmit}
      />

      {/* 📊 Table */}
      <div className="flex-grow mt-4">
        <TemplateTable
          columns={columns as any}
          data={formattedData as any}
          visibleColumns={visibleColumns}
        />
      </div>

      {/* 📑 Pagination */}
      <div className="mt-auto flex justify-between items-center border-t pt-3 text-sm text-muted-foreground">
        <div>Total: {filteredData.length} Responses</div>
        <AppPaginationControls
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
