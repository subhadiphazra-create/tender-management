"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function AppPaginationControls({
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm">
        Page {page} of {totalPages || 1}
      </span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
