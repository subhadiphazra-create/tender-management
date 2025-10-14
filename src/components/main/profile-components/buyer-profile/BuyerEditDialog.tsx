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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileTabs } from "@/constants";
import { BuyerFormType, buyerSchema } from "../../../../../schema/buyerScema";
import PageBadge from "../PageBadge";

interface Props {
  triggerText?: string;
}

export default function BuyerEditDialog({
  triggerText = "Edit Buyer Details",
}: Props) {
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const buyerData = profileTabs.find((t) => t.id === "1")?.subTabs || [];

  const { register, handleSubmit, setValue } = useForm<BuyerFormType>({
    resolver: zodResolver(buyerSchema),
    defaultValues: profileTabs[0].subTabs[0].data,
  });

  const totalTabs = buyerData.length;
  const nextTab = () => setCurrentTab((p) => Math.min(p + 1, totalTabs - 1));
  const prevTab = () => setCurrentTab((p) => Math.max(p - 1, 0));

  const onSubmit = (data: BuyerFormType) => {
    console.log("Form Submitted:", data);
    setOpen(false);
  };

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
            {buyerData[currentTab]?.title}
          </DialogTitle>
        </DialogHeader>
        {/* Form Scrollable Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(buyerData[currentTab]?.fields || {}).map(
                ([key, label]) => {
                  // Business Type Select
                  if (key === "businessType")
                    return (
                      <div key={key} className="flex flex-col">
                        <Label className="text-gray-300 mb-3">{label}</Label>
                        <Select
                          onValueChange={(val) =>
                            setValue(key as keyof BuyerFormType, val)
                          }
                        >
                          <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select Business Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Corporation",
                              "LLC",
                              "Partnership",
                              "Sole Proprietorship",
                            ].map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );

                  // Annual Revenue Select
                  if (key === "annualRevenue")
                    return (
                      <div key={key} className="flex flex-col">
                        <Label className="text-gray-300 mb-3">{label}</Label>
                        <Select
                          onValueChange={(val) =>
                            setValue(key as keyof BuyerFormType, val)
                          }
                        >
                          <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select Revenue Range" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Less than $1M",
                              "$1M - $10M",
                              "$10M - $50M",
                              "More than $50M",
                            ].map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );

                  // File Upload
                  if (key === "businessRegCert")
                    return (
                      <div key={key} className="flex flex-col">
                        <Label className="text-gray-300 mb-3">{label}</Label>
                        <Input
                          type="file"
                          className="bg-[#1a1a1a] border-gray-700 text-gray-100 p-2 rounded-md"
                          onChange={(e) =>
                            setValue(
                              key as keyof BuyerFormType,
                              e.target.files?.[0]
                            )
                          }
                        />
                      </div>
                    );

                  // Default Input
                  return (
                    <div key={key} className="flex flex-col">
                      <Label className="text-gray-300 mb-3">{label}</Label>
                      <Input
                        {...register(key as keyof BuyerFormType)}
                        className="bg-[#1a1a1a] border-gray-700 text-gray-100 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  );
                }
              )}
            </div>
          </form>
        </div>
        <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between bg-[#121212]">
          {/* Prev Button */}
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

          {/* Page Badge */}
          <PageBadge current={currentTab + 1} total={totalTabs} />

          {/* Next / Submit Button */}
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
