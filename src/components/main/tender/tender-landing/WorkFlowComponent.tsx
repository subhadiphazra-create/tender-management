// components/workflow/WorkflowComponent.tsx
"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Items, RfpDraftActionBtn } from "@/utils/workflowData";

type Handlers = {
  openTemplateModal: () => void;
  selectTemplate: () => void;
  proceedToDraft: () => void;
  openFinalize: () => void;
  finalizeConfirm: () => void;
  backToTemplate: () => void;
  proceedToApproval: () => void;
  approve: () => void;
  reject: () => void;
  publish: () => void;
  rejectPublish: () => void;
  actionButtons: RfpDraftActionBtn[];
  selectedTemplate: string | null;
};

export default function WorkflowComponent({
  items,
  handlers,
}: {
  items: Items[];
  handlers: Handlers;
}) {
  // Defensive: ensure actionButtons is an array
  const actionButtons = handlers?.actionButtons ?? [];

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.key} className="border-b px-2 py-2 flex justify-between items-center">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <span className="text-base font-medium">{item.name}</span>

                {/* Only render DropdownMenu when item.dropdown is true AND we have action buttons */}
                {item.dropdown && Array.isArray(actionButtons) && actionButtons.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="ml-2 px-2 text-sm focus:outline-none" aria-label={`${item.name} actions`}>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start">
                      <DropdownMenuGroup>
                        {actionButtons.map((option, ind) => (
                          <DropdownMenuItem
                            key={ind}
                            onClick={() => {
                              try {
                                // call safely
                                option?.btnFn && option.btnFn();
                              } catch (err) {
                                console.error("action btn error", err);
                              }
                            }}
                          >
                            <span className="mr-2">{option.btnIcon}</span>
                            <span className="ml-2">{option.btnText}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

            </div>
              <span className={`text-sm font-medium ${item.color}`}>{item.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
