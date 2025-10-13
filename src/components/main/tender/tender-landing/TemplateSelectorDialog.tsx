"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ReadOnlyEditor from "@/components/main/read-only-text-editor";
import { TemplateFormValues } from "../../../../../types/type";
import { sampleTemplates } from "@/constants";
import { cn } from "@/lib/utils";

interface TemplateSelectorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: TemplateFormValues) => void;
}

export default function TemplateSelectorDialog({
  isOpen,
  onClose,
  onSelectTemplate,
}: TemplateSelectorDialogProps) {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateFormValues | null>(null);

  const handleSelect = (template: TemplateFormValues | undefined) => {
    if (!template) return;
    setSelectedTemplate(template);
  };

  const handleSubmit = () => {
    if (!selectedTemplate) return;
    onSelectTemplate(selectedTemplate);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[80%] h-[90dvh] p-6">
        <DialogHeader>
          <DialogTitle>Select a Template</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {/* Left Section - Cards */}
          <div className="col-span-1 overflow-y-auto h-[70dvh] p-2 space-y-2">
            <RadioGroup
              value={selectedTemplate?.templateName}
              onValueChange={(val) =>
                handleSelect(sampleTemplates.find((t) => t.templateName === val))
              }
              className="space-y-2"
            >
              {sampleTemplates.map((template) => (
                <Card
                  key={template.templateName}
                  onClick={() => handleSelect(template)}
                  className={cn(
                    "cursor-pointer p-4 border w-full rounded-lg transition",
                    selectedTemplate?.templateName === template.templateName
                      ? "border-blue-500 shadow-sm bg-gray-800"
                      : "border-gray-200"
                  )}
                >
                  <CardContent className="flex justify-between items-center h-full p-0">
                    <div>
                      <h3 className="font-semibold">{template.templateName}</h3>
                      <p className="text-sm text-gray-500">
                        {template.sector}, {template.product}
                      </p>
                    </div>
                    <RadioGroupItem
                      value={template.templateName}
                      className="h-5 w-5 border-gray-400"
                    />
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </div>

          {/* Right Section - Preview */}
          <div className="col-span-2 h-[70dvh] p-2 border rounded-lg">
            <ReadOnlyEditor
              key={selectedTemplate?.templateName ?? "empty"} // ✅ key forces re-render
              value={selectedTemplate?.editorValue ?? ""}
              height={600}
              onChange={() => {}}
            />
          </div>
        </div>

        <DialogFooter>
          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!selectedTemplate}>
              Confirm Selection
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
