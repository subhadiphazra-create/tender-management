"use client";

import React, { useMemo, useState } from "react";
import AppToolbar, { FilterOption } from "@/components/main/AppToolbar";
import AppPaginationControls from "@/components/main/AppPaginationControls";
import { dummyTenderData } from "@/constants";
import TenderBitsTable from "./TenderBitsTable";
import { useRouter } from "next/navigation";

export default function SupplierHomeComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const router = useRouter();

  // Define columns
  const columns = useMemo(
    () => [
      { key: "title", label: "Tender Subject" },
      { key: "industry", label: "Industry" },
      { key: "status", label: "Status" },
      { key: "timeRemaining", label: "Time Remaining" },
      { key: "bidEndDate", label: "Bid End Date" },
      { key: "organizationName", label: "Tender Company" },
    ],
    []
  );

  // For toolbar column filter dropdown (optional)
  const columnOptions: FilterOption[] = useMemo(
    () =>
      columns.map((col) => ({
        label: col.label,
        value: col.key,
        field: "column",
      })),
    [columns]
  );

  // Filter/Search
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return dummyTenderData.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(term)
      )
    );
  }, [searchTerm]);

  // Pagination logic
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Compute derived values (timeRemaining, bidEndDate)
  const processedData = paginatedData.map((item) => {
    const endDate = new Date(item.submissionDeadline);
    const now = new Date();
    const diff = Math.max(0, endDate.getTime() - now.getTime());
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return {
      ...item,
      timeRemaining: daysLeft > 0 ? `${daysLeft} days left` : "Closed",
      bidEndDate: endDate.toLocaleDateString(),
      status: "Bid Pending", // static text as required
    };
  });

  return (
    <div className="p-6 flex flex-col min-h-screen">
      <AppToolbar
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        filterOptions={columnOptions}
        // showCreateButton
        showViewButton
        onCreate={() => router.push("/internal/my-tender/create-tender")}
        buttonText="Create Tender"
      />

      <div className="flex-grow mt-4">
        <TenderBitsTable columns={columns} data={processedData} visibleColumns={columns.map(c => c.key)} />
      </div>

      <div className="mt-auto pt-4 flex justify-between items-center border-t text-sm text-muted-foreground">
        <div>Total: {filteredData.length} tenders</div>
        <AppPaginationControls
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
