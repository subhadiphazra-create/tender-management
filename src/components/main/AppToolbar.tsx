"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Eye } from "lucide-react";
import { SmartSelect } from "../ui/smart-select";

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
  buttonText?:string;
}

export default function AppToolbar({
  onSearch,
  onFilterChange,
  filterOptions,
  showCreateButton,
  showViewButton,
  onCreate,
  buttonText,
}: AppToolbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "templateName",
    "department",
    "sector",
    "product",
  ]);

  const grouped = useMemo(() => {
    return filterOptions.reduce<Record<string, FilterOption[]>>((acc, opt) => {
      if (!acc[opt.field]) acc[opt.field] = [];
      acc[opt.field].push(opt);
      return acc;
    }, {});
  }, [filterOptions]);

  const allOptions = [
    { label: "Template Name", value: "templateName" },
    { label: "Department", value: "department" },
    { label: "Sector", value: "sector" },
    { label: "Product", value: "product" },
  ];

  return (
    <div className="flex mb-4">
      {/* Left Section: Search + Filter */}
      <div className="flex items-center gap-2 w-full md:w-1/2">
        <div className="w-full md:w-1/2 min-w-[220px]">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch(e.target.value);
            }}
          />
        </div>

        <div className="w-1/2">
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
            className={"w-1/2 overflow-hidden"}
          />
        </div>
      </div>

      {/* Right Section: Create + View */}
      <div className="flex flex-wrap items-center justify-end gap-2 w-full md:w-1/2">
        {showCreateButton && (
          <Button onClick={onCreate} className="whitespace-nowrap">
            <Plus className="w-4 h-4 mr-1" /> {buttonText}
          </Button>
        )}

        {showViewButton && (
          <SmartSelect
            isMultiSelect
            placeholder={
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" /> <span>View</span>
              </div>
            }
            options={allOptions}
            value={selectedColumns}
            onChange={(vals) => {
              setSelectedColumns(vals as string[]);
              const filters: Record<string, string[]> = {};
              filters["column"] = vals as string[];
              onFilterChange(filters);
            }}
            showSearchbar
            className={"w-1/4 overflow-hidden"}
          />
        )}
      </div>
    </div>
  );
}
