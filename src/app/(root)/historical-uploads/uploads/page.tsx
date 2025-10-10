"use client";

import React, { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AppToolbar, { FilterOption } from "@/components/main/AppToolbar";
import TemplateTable from "@/components/main/templates/TemplateTable";
import AppPaginationControls from "@/components/main/AppPaginationControls";
import { rfpData } from "@/constants";
import { rfpFields } from "@/constants/formFields";
import { rfpSchema } from "../../../../../schema/rfp-schema";
import { Upload } from "lucide-react";

export default function ResponseUploadPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "rfpTitle",
    "tender_department",
    "sector",
    "product_service",
    "country",
    "rfpDeadline",
    "file",
  ]);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // ✅ Column definitions
  const columns = useMemo(
    () => [
      { key: "rfpTitle", label: "RFP Title" },
      { key: "tender_department", label: "Department" },
      { key: "sector", label: "Sector" },
      { key: "product_service", label: "Product/Service" },
      { key: "country", label: "Country" },
      { key: "rfpDeadline", label: "Deadline" },
      { key: "file", label: "File" },
    ],
    []
  );

  // ✅ Convert columns to filter options
  const columnOptions: FilterOption[] = useMemo(
    () =>
      columns.map((col) => ({
        label: col.label,
        value: col.key,
        field: "column",
      })),
    [columns]
  );

  // ✅ Handle dialog form submission
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

  // ✅ Apply search and filter logic
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();

    let data = rfpData.filter((row) => {
      if (!term) return true;
      // Search in visible columns
      return visibleColumns.some((key) =>
        String((row as any)[key] || "")
          .toLowerCase()
          .includes(term)
      );
    });

    // Filter logic — toggle visible columns dynamically
    if (filters.column && filters.column.length > 0) {
      const newVisible = columns
        .map((c) => c.key)
        .filter((key) => filters.column?.includes(key));

      if (JSON.stringify(newVisible) !== JSON.stringify(visibleColumns)) {
        setVisibleColumns(newVisible);
      }
    }

    return data;
  }, [searchTerm, filters, visibleColumns, columns]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // ✅ Format data for display
  const formattedData = paginatedData.map((row) => ({
    ...row,
    file: (row.file as File)?.name || "No file uploaded",
  }));

  return (
    <div className="p-6 flex flex-col min-h-screen">
      {/* 🧭 Toolbar with optional dialog */}
      <AppToolbar
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        filterOptions={columnOptions}
        showViewButton
        showDialog
        dialogTitle="Upload RFP"
        dialogIcon={<Upload className="w-4 h-4" />} // ✅ custom dialog icon
        dialogTriggerLabel="Add RFP"
        dialogFields={rfpFields}
        dialogSchema={rfpSchema}
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
        <div>Total: {filteredData.length} RFPs</div>
        <AppPaginationControls
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
