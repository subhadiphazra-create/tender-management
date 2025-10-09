"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileTabs, regulationOptions } from "@/constants";
import {
  SupplierFormType,
  supplierSchema,
} from "../../../../../schema/supplierSchema";

interface Props {
  triggerText?: string;
}

export default function SupplierEditDialog({
  triggerText = "Edit Supplier Details",
}: Props) {
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const supplierData = profileTabs.find((t) => t.id === "2")?.subTabs || [];

  const { register, handleSubmit, setValue, watch } = useForm<SupplierFormType>(
    {
      resolver: zodResolver(supplierSchema),
      defaultValues: supplierData[0].data,
    }
  );

  const totalTabs = supplierData.length;
  const nextTab = () => setCurrentTab((p) => Math.min(p + 1, totalTabs - 1));
  const prevTab = () => setCurrentTab((p) => Math.max(p - 1, 0));

  const onSubmit = (data: SupplierFormType) => {
    console.log("Supplier Form Submitted:", data);
    setOpen(false);
  };

  const selectedRegulations = watch("regulations") || [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-gray-900 text-white border border-gray-700 hover:bg-gray-800"
          variant={"outline"}
        >
          {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:min-w-[80%] sm:h-[80%] w-full bg-[#121212] border border-gray-800 rounded-lg flex flex-col overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-2 border-b border-gray-800">
          <DialogTitle className="text-xl font-semibold text-gray-100">
            {supplierData[currentTab]?.title}
          </DialogTitle>
        </DialogHeader>

        {/* Form Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(supplierData[currentTab]?.fields || {}).map(
                ([key, label]) => {
                  // Supplier Type
                  if (key === "supplierType")
                    return (
                      <div key={key} className="flex flex-col">
                        <Label className="text-gray-300 mb-3">{label}</Label>
                        <Select
                          onValueChange={(val) =>
                            setValue(key as keyof SupplierFormType, val)
                          }
                        >
                          <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-gray-100">
                            <SelectValue placeholder="Select Supplier Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Manufacturer",
                              "Distributor",
                              "Service Provider",
                            ].map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );

                  // Tax Compliance
                  if (key === "taxCompliant")
                    return (
                      <div key={key} className="flex flex-col">
                        <Label className="text-gray-300 mb-3">{label}</Label>
                        <Select
                          onValueChange={(val) =>
                            setValue(key as keyof SupplierFormType, val)
                          }
                        >
                          <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-gray-100">
                            <SelectValue placeholder="Select Option" />
                          </SelectTrigger>
                          <SelectContent>
                            {["Yes", "No"].map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );

                  // Legal Structure
                  if (key === "legalStructure")
                    return (
                      <div key={key} className="flex flex-col">
                        <Label className="text-gray-300 mb-3">{label}</Label>
                        <Select
                          onValueChange={(val) =>
                            setValue(key as keyof SupplierFormType, val)
                          }
                        >
                          <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-gray-100">
                            <SelectValue placeholder="Select Legal Structure" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Sole Partnership",
                              "Limited Liability Company",
                              "Corporation",
                            ].map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );

                  // Regulations Multi-select (Checkboxes)
                  if (key === "regulations")
                    return (
                      <div key={key} className="flex flex-col">
                        <Label className="text-gray-300 mb-3">{label}</Label>
                        <div className="space-y-2">
                          {regulationOptions.map((opt) => (
                            <label
                              key={opt}
                              className="flex items-center space-x-2 text-gray-300"
                            >
                              <Checkbox
                                checked={selectedRegulations.includes(opt)}
                                onCheckedChange={(checked) => {
                                  const newValues = checked
                                    ? [...selectedRegulations, opt]
                                    : selectedRegulations.filter(
                                        (v) => v !== opt
                                      );
                                  setValue(
                                    key as keyof SupplierFormType,
                                    newValues
                                  );
                                }}
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    );

                  // File Uploads
                  if (
                    [
                      "sla",
                      "profileFile",
                      "financialStatementFile",
                      "certifications",
                      "references",
                      "signature",
                    ].includes(key)
                  )
                    return (
                      <div key={key} className="flex flex-col">
                        <Label className="text-gray-300 mb-3">{label}</Label>
                        <Input
                          type="file"
                          className="bg-[#1a1a1a] border-gray-700 text-gray-100 p-2 rounded-md"
                          onChange={(e) =>
                            setValue(
                              key as keyof SupplierFormType,
                              e.target.files?.[0]
                            )
                          }
                        />
                      </div>
                    );

                  // Date Field
                  if (key === "date")
                    return (
                      <div key={key} className="flex flex-col">
                        <Label className="text-gray-300 mb-3">{label}</Label>
                        <Input
                          type="date"
                          {...register(key as keyof SupplierFormType)}
                          className="bg-[#1a1a1a] border-gray-700 text-gray-100 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    );

                  // Default Input
                  return (
                    <div key={key} className="flex flex-col">
                      <Label className="text-gray-300 mb-3">{label}</Label>
                      <Input
                        {...register(key as keyof SupplierFormType)}
                        className="bg-[#1a1a1a] border-gray-700 text-gray-100 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  );
                }
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800 flex justify-between bg-[#121212]">
          {currentTab > 0 ? (
            <Button
              variant="outline"
              onClick={prevTab}
              className="border-gray-700 text-gray-200 hover:bg-gray-800"
            >
              Prev
            </Button>
          ) : (
            <div />
          )}
          <Button
            onClick={
              currentTab === totalTabs - 1 ? handleSubmit(onSubmit) : nextTab
            }
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {currentTab === totalTabs - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}