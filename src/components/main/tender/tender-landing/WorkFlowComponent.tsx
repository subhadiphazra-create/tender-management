// components/workflow/WorkflowComponent.tsx
"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Items, RfpDraftActionBtns } from "../../../../../types/type";

const WorkflowComponent = ({
  items,
  RfpDraftActionBtns,
}: {
  items: Items[];
  RfpDraftActionBtns: RfpDraftActionBtns[];
}) => {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="border-b px-4 py-2 flex justify-between items-center"
        >
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-base font-medium">{item.name}</span>

              {item.dropdown && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="ml-2 px-2 text-sm focus:outline-none">
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="start">
                    <DropdownMenuGroup>
                      {RfpDraftActionBtns.map((option, ind) => (
                        <DropdownMenuItem key={ind} onClick={option.btnFn}>
                          {option.btnIcon}
                          <span className="ml-2">{option.btnText}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <span className={`text-sm font-medium ${item.color}`}>
              {item.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkflowComponent;
