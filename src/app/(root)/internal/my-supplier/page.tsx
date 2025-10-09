// SuppliersPage.tsx
"use client";

import React, { useMemo, useState } from "react";
import AppToolbar, { FilterOption } from "@/components/main/AppToolbar";
import AppPaginationControls from "@/components/main/AppPaginationControls";
import { dummySuppliers } from "@/constants/dummySuppliers";
import SupplierTable from "@/components/main/supplier/SupplierTable";

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "companyName",
    "contactName",
    "contactEmail",
  ]);

  const columns = useMemo(
    () => [
      { key: "companyName", label: "Tender Name" },
      { key: "contactName", label: "Contact Person" },
      { key: "contactEmail", label: "Contact Email" },
    ],
    []
  );

  const columnOptions: FilterOption[] = useMemo(
    () => columns.map((col) => ({ label: col.label, value: col.key, field: "column" })),
    [columns]
  );

  // Search/filter logic
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return dummySuppliers.filter((row) =>
      Object.keys(row).some(
        (key) => String((row as any)[key]).toLowerCase().includes(term)
      )
    );
  }, [searchTerm]);

  const pageSize = 5;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="p-6 flex flex-col min-h-screen">
      {/* Toolbar without Create button */}
      <AppToolbar
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        filterOptions={columnOptions}
        showCreateButton={false}
        showViewButton
      />

      {/* Table */}
      <div className="flex-grow">
        <SupplierTable
          columns={columns}
          data={paginatedData}
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
