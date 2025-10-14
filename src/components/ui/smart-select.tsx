"use client";

import * as React from "react";
import { Check, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface Option {
  label: string;
  value: string;
  [key: string]: any;
}

type ClassNameProp =
  | string
  | {
      trigger?: string;
      popover?: string;
      option?: string;
    };

interface SmartSelectProps {
  options: Option[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  isMultiSelect?: boolean;
  filterKey?: string;
  showFilter?: boolean;
  showSearchbar?: boolean;
  className?: ClassNameProp;
}

export function SmartSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  isMultiSelect = false,
  filterKey,
  showFilter = false,
  showSearchbar = false,
  className,
}: SmartSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [filterValue, setFilterValue] = React.useState<string>("All");

  // Refs for trigger width
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState(0);

  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef.current, open]);

  // Class names
  const triggerClass = typeof className === "string" ? className : className?.trigger;
  const popoverClass = typeof className === "object" ? className?.popover : undefined;
  const optionClass = typeof className === "object" ? className?.option : undefined;

  // Filter values
  const filterValues =
    showFilter && filterKey
      ? ["All", ...Array.from(new Set(options.map((o) => o[filterKey])))]
      : [];

  // Filtered options
  const filteredOptions = options.filter((opt) => {
    const matchesFilter =
      !showFilter || filterValue === "All" || opt[filterKey || ""] === filterValue;
    const matchesSearch =
      !showSearchbar || opt.label.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  /** ---------------------- MULTI SELECT ---------------------- */
  if (isMultiSelect) {
    const selectedValues = Array.isArray(value) ? value : [];
    const toggleValue = (val: string) => {
      if (selectedValues.includes(val)) {
        onChange(selectedValues.filter((v) => v !== val));
      } else {
        onChange([...selectedValues, val]);
      }
    };

    const clearAll = () => onChange([]);
    const selectedOptions = options.filter((opt) =>
      selectedValues.includes(opt.value)
    );

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between flex items-center min-h-[42px] px-2",
              triggerClass
            )}
          >
            {selectedOptions.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1 flex-1 overflow-hidden">
                {selectedOptions.slice(0, 3).map((opt) => (
                  <Badge
                    key={opt.value}
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full truncate max-w-[120px]"
                  >
                    <span className="truncate">{opt.label}</span>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleValue(opt.value);
                      }}
                      className="ml-1 rounded-full p-0.5 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </div>
                  </Badge>
                ))}
                {selectedOptions.length > 3 && (
                  <Badge
                    variant="outline"
                    className="rounded-full px-2 py-0.5 text-xs"
                  >
                    +{selectedOptions.length - 3}
                  </Badge>
                )}
              </div>
            ) : (
              <span className="text-muted-foreground truncate">{placeholder}</span>
            )}

            {selectedOptions.length > 0 && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  clearAll();
                }}
                className="ml-2 rounded-full p-1 hover:bg-muted cursor-pointer"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className={cn("p-0", popoverClass)}
          style={{ width: triggerWidth }} // ✅ dynamic width
        >
          {showFilter && filterKey && (
            <div className="p-2 border-b">
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Filter by ${filterKey}`} />
                </SelectTrigger>
                <SelectContent>
                  {filterValues.map((val) => (
                    <SelectItem key={val} value={val || ""}>
                      {val}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Command>
            {showSearchbar && (
              <CommandInput
                placeholder={`Search in ${
                  showFilter ? filterValue : "options"
                }...`}
                value={search}
                onValueChange={setSearch}
              />
            )}
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleValue(option.value)}
                    className={cn("flex items-center w-full", optionClass)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <div className="truncate w-full">{option.label}</div>
                    {filterKey && option[filterKey] && (
                      <span className="text-xs text-gray-400 ml-2">
                        ({option[filterKey]})
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }

  /** ---------------------- SINGLE SELECT ---------------------- */
  const selectedValue = Array.isArray(value) ? value[0] : value;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between flex items-center min-h-[42px] px-2",
            triggerClass
          )}
        >
          {selectedValue ? (
            <div className="truncate">{options.find((o) => o.value === selectedValue)?.label}</div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn("p-0", popoverClass)}
        style={{ width: triggerWidth }} // ✅ dynamic width
      >
        {showFilter && filterKey && (
          <div className="p-2 border-b">
            <Select value={filterValue} onValueChange={setFilterValue}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Filter by ${filterKey}`} />
              </SelectTrigger>
              <SelectContent>
                {filterValues.map((val) => (
                  <SelectItem key={val} value={val || ""}>
                    {val}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Command>
          {showSearchbar && (
            <CommandInput
              placeholder={`Search in ${
                showFilter ? filterValue : "options"
              }...`}
              value={search}
              onValueChange={setSearch}
            />
          )}
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn("flex items-center w-full", optionClass)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      option.value === selectedValue ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="truncate w-full">{option.label}</div>
                  {filterKey && option[filterKey] && (
                    <span className="text-xs text-gray-400 ml-2">
                      ({option[filterKey]})
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
