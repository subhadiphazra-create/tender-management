"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Eye } from "lucide-react";
import { SmartSelect } from "../ui/smart-select";
import CustomFormDialog from "./history-uploads/history-dialog/CustomFormDialog";

export interface FilterOption {
  label: string;
  value: string;
  field: string;
}

interface AppToolbarProps {
  onSearch: (term: string) => void;
  onFilterChange: (filters: Record<string, string[]>) => void;
  filterOptions: FilterOption[];
  showCreateButton?: boolean;
  showViewButton?: boolean;
  onCreate?: () => void;
  buttonText?: string;
  buttonIcon?: React.ReactNode; // ✅ custom icon for Create button

  // ✅ Optional dialog props
  showDialog?: boolean;
  dialogTitle?: string;
  dialogTriggerLabel?: string;
  dialogFields?: any[];
  dialogSchema?: any;
  onDialogSubmit?: (data: any) => void;
  dialogIcon?: React.ReactNode; // ✅ custom icon for Dialog trigger
}

export default function AppToolbar({
  onSearch,
  onFilterChange,
  filterOptions,
  showCreateButton,
  showViewButton,
  onCreate,
  buttonText,
  buttonIcon,
  showDialog = false,
  dialogTitle,
  dialogTriggerLabel,
  dialogFields,
  dialogSchema,
  onDialogSubmit,
  dialogIcon,
}: AppToolbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  // Group filters by field type (e.g., column, department, etc.)
  const grouped = useMemo(() => {
    return filterOptions.reduce<Record<string, FilterOption[]>>((acc, opt) => {
      if (!acc[opt.field]) acc[opt.field] = [];
      acc[opt.field].push(opt);
      return acc;
    }, {});
  }, [filterOptions]);

  // ✅ View dropdown options come dynamically from filterOptions
  const viewOptions = useMemo(
    () => filterOptions.map((opt) => ({ label: opt.label, value: opt.value })),
    [filterOptions]
  );

  return (
    <div className="flex mb-4 justify-between items-center gap-4">
      {/* 🔍 Left Section: Search + Filter */}
      <div className="flex items-center gap-2 w-full md:w-1/2">
        {/* Search Box */}
        <div className="flex-1 min-w-[220px]">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch(e.target.value);
            }}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex-1 min-w-[200px]">
          <SmartSelect
            isMultiSelect
            placeholder={
              <div className="flex items-center gap-1">
                <Filter className="w-4 h-4" /> <span>Filter</span>
              </div>
            }
            options={Object.values(grouped).flat()}
            value={selectedFilters}
            onChange={(vals) => {
              setSelectedFilters(vals as string[]);
              const filters: Record<string, string[]> = {};
              filters["column"] = vals as string[];
              onFilterChange(filters);
            }}
            showSearchbar
            className={"overflow-hidden"}
          />
        </div>
      </div>

      {/* 🧰 Right Section: Buttons + Dialog */}
      <div className="flex items-center justify-end gap-2 w-full md:w-1/2 flex-wrap">
        {/* Optional Custom Dialog */}
        {showDialog && dialogFields && dialogSchema && (
          <CustomFormDialog
            fields={dialogFields}
            schema={dialogSchema}
            title={dialogTitle || "Custom Dialog"}
            triggerLabel={
              <div className="flex items-center gap-1">
                {dialogIcon || <Plus className="w-4 h-4" />}
                <span>{dialogTriggerLabel || "Open Dialog"}</span>
              </div>
            }
            onSubmit={onDialogSubmit || (() => {})}
          />
        )}

        {/* Create Button */}
        {showCreateButton && (
          <Button onClick={onCreate} className="whitespace-nowrap flex items-center gap-1">
            {buttonIcon || <Plus className="w-4 h-4" />}
            <span>{buttonText || "Create"}</span>
          </Button>
        )}

        {/* View Column Selector */}
        {showViewButton && (
          <SmartSelect
            isMultiSelect
            placeholder={
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" /> <span>View</span>
              </div>
            }
            options={viewOptions}
            value={selectedColumns}
            onChange={(vals) => {
              setSelectedColumns(vals as string[]);
              const filters: Record<string, string[]> = {};
              filters["column"] = vals as string[];
              onFilterChange(filters);
            }}
            showSearchbar
            className={"w-[200px] overflow-hidden"}
          />
        )}
      </div>
    </div>
  );
}
