// components/TemplateForm.tsx
"use client";

import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  templateSchema,
  TemplateSchemaType,
} from "../../../../schema/templateSchema";
import departmentsData from "@/constants/department";
import { Option, SmartSelect } from "@/components/ui/smart-select";
import KendoEditor from "../text-editor-component";

export default function TemplateForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<TemplateSchemaType>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      templateName: "",
      department: "",
      sector: "",
      product: "",
      editorValue: "",
    },
  });

  const editorRef = useRef<any>(null);

  // derive options
  const departmentOptions: Option[] = departmentsData.map((d) => ({
    label: d.department,
    value: d.department,
  }));

  const selectedDepartment = watch("department");
  const selectedSector = watch("sector");

  const sectorOptions: Option[] = useMemo(() => {
    const dept = departmentsData.find(
      (d) => d.department === selectedDepartment
    );
    return (dept?.sectors || []).map((s) => ({ label: s, value: s }));
  }, [selectedDepartment]);

  const productOptions: Option[] = useMemo(() => {
    const dept = departmentsData.find(
      (d) => d.department === selectedDepartment
    );
    // if sector is chosen, optionally filter products by sector — but original data isn't 1:1; we show all products for dept
    return (dept?.productsServices || []).map((p) => ({ label: p, value: p }));
  }, [selectedDepartment, selectedSector]);

  const onSubmit = (data: TemplateSchemaType) => {
    // you can access the Kendo editor via editorRef.current if needed
    console.log("submit", data);
    alert("Form submitted - check console");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-4">
          <Label className="text-gray-300 mb-3">Template Name</Label>
          <Input
            {...register("templateName")}
            placeholder="Template Name"
            className="bg-[#1a1a1a] border-gray-700 text-gray-100 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.templateName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.templateName.message}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <Label className="text-gray-300 mb-3">Department</Label>
          <SmartSelect
            options={departmentOptions}
            value={watch("department")}
            onChange={(v) => {
              setValue("department", String(v || ""));
              // reset dependent fields
              setValue("sector", "");
              setValue("product", "");
            }}
            placeholder="Select dept"
            showSearchbar
            showFilter={false}
            className="bg-[#1a1a1a] border-gray-700 text-gray-100 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.department && (
            <p className="text-red-500 text-sm mt-1">
              {errors.department.message}
            </p>
          )}
        </div>

        <div className="col-span-3">
          <Label className="text-gray-300 mb-3">Sector</Label>
          <SmartSelect
            options={sectorOptions}
            value={watch("sector")}
            onChange={(v) => {
              setValue("sector", String(v || ""));
              setValue("product", "");
            }}
            placeholder="Select sector"
            showSearchbar
            showFilter={false}
            className="bg-[#1a1a1a] border-gray-700 text-gray-100 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.sector && (
            <p className="text-red-500 text-sm mt-1">{errors.sector.message}</p>
          )}
        </div>

        <div className="col-span-3">
          <Label className="text-gray-300 mb-3">Product</Label>
          <SmartSelect
            options={productOptions}
            value={watch("product")}
            onChange={(v) => setValue("product", String(v || ""))}
            placeholder="Select product"
            showSearchbar
            showFilter={false}
            className="bg-[#1a1a1a] border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
          {errors.product && (
            <p className="text-red-500 text-sm mt-1">
              {errors.product.message}
            </p>
          )}
        </div>

        <div className="col-span-12 flex justify-end gap-3 mt-2">
          <Button variant="outline" type="button">
            Generate With AI
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </div>

      {/* Editor block */}
      <div>
        <Label>Template Content</Label>
        <div className="mt-2">
          <KendoEditor
            initialContent=""
            onChange={(content: string) => {
              setValue("editorValue", content, { shouldValidate: true });
            }}
            height={550}
            ref={editorRef}
          />
        </div>
        {errors.editorValue && (
          <p className="text-red-500 text-sm mt-1">
            {errors.editorValue.message}
          </p>
        )}
      </div>
    </form>
  );
}
