// TendersPage.tsx
"use client";

import React, { useMemo, useState } from "react";
import AppToolbar, { FilterOption } from "@/components/main/AppToolbar";
import AppPaginationControls from "@/components/main/AppPaginationControls";
import { dummyTenderData } from "@/constants";
import TenderTable from "@/components/main/tender/TenderTable";
import { useRouter } from "next/navigation";

export default function TendersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const router = useRouter();
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "industry",
    "referenceNumber",
    "department",
    "budget",
    "submissionDeadline",
    "NoOfBids",
    "Status",
    "Actions",
  ]);

  const columns = useMemo(
    () => [
      { key: "industry", label: "Industry" },
      { key: "referenceNumber", label: "Reference Number" },
      { key: "department", label: "Department" },
      { key: "budget", label: "Estimated Value" },
      { key: "submissionDeadline", label: "Submission Deadline" },
      { key: "NoOfBids", label: "No Of Bids" },
      { key: "Status", label: "Status" },
      { key: "Actions", label: "Actions" },
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
    return dummyTenderData.filter((row) =>
      Object.keys(row).some(
        (key) =>
          String((row as any)[key]).toLowerCase().includes(term)
      )
    );
  }, [searchTerm]);

  const pageSize = 5;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="p-6 flex flex-col min-h-screen">
      <AppToolbar
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        filterOptions={columnOptions}
        showCreateButton
        showViewButton
        onCreate={() =>
          router.push("/internal/my-tender/create-tender")
        }
        buttonText="Create Tender"
      />

      <div className="flex-grow">
        <TenderTable columns={columns} data={paginatedData} visibleColumns={visibleColumns} />
      </div>

      <div className="mt-auto pt-4 flex justify-between items-center border-t text-sm text-muted-foreground">
        <div>Total: {filteredData.length} rows</div>
        <AppPaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
