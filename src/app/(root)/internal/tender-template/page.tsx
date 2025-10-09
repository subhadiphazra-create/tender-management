"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppToolbar, { FilterOption } from "@/components/main/AppToolbar";
import TemplateTable from "@/components/main/templates/TemplateTable";
import AppPaginationControls from "@/components/main/AppPaginationControls";
import { sampleTemplates } from "@/constants";
import { TemplateFormValues } from "../../../../../types/type";

export default function TemplatesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "templateName",
    "department",
    "sector",
    "product",
  ]);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const columns = useMemo(
    () => [
      { key: "templateName", label: "Template Name" },
      { key: "department", label: "Template Department" },
      { key: "sector", label: "Template Sector" },
      { key: "product", label: "Template Product" },
    ],
    []
  );

  const columnOptions: FilterOption[] = useMemo(
    () =>
      columns.map((col) => ({
        label: col.label,
        value: col.key,
        field: "column",
      })),
    [columns]
  );

  // 🔍 Apply search + column filter
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return sampleTemplates.filter((row) => {
      // Search across visible columns
      if (term) {
        const match = visibleColumns.some((key) =>
          String((row as any)[key]).toLowerCase().includes(term)
        );
        if (!match) return false;
      }

      // If filter selected (columns), show only rows matching those columns
      if (filters.column && filters.column.length > 0) {
        // If a column is filtered out, hide it from visibleColumns too
        const newVisible = visibleColumns.filter((col) =>
          filters.column?.includes(col)
        );
        if (JSON.stringify(newVisible) !== JSON.stringify(visibleColumns)) {
          setVisibleColumns(newVisible);
        }
      }

      return true;
    });
  }, [searchTerm, filters, visibleColumns]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="p-6 flex flex-col min-h-screen">
      {/* Toolbar */}
      <AppToolbar
        onSearch={setSearchTerm}
        onFilterChange={(f) => setFilters(f)}
        filterOptions={columnOptions}
        showCreateButton
        showViewButton
        onCreate={() =>
          router.push("/internal/tender-template/create-template")
        }
        buttonText="Create Template"
      />

      {/* Table */}
      <div className="flex-grow">
        <TemplateTable
          columns={columns as any}
          data={paginatedData as TemplateFormValues[]}
          visibleColumns={visibleColumns}
        />
      </div>

      {/* Pagination */}
      <div className="mt-auto pt-4 flex justify-between items-center border-t pt-3 text-sm text-muted-foreground">
        <div>Total: {filteredData.length} rows</div>
        <AppPaginationControls
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
