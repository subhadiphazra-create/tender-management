"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { FormField } from "../../../../../types/type";
import FormInput from "../FormInput";
import departmentsData from "@/constants/department";

interface BasicInfoCardProps {
  fields: FormField[];
  title?: string;
}

const CustomFormCard: React.FC<BasicInfoCardProps> = ({ fields, title }) => {
  const { watch, setValue } = useFormContext();
  const [sectors, setSectors] = useState<string[]>([]);
  const [products, setProducts] = useState<string[]>([]);

  const selectedDept = watch("tender_department");

  useEffect(() => {
    const dept = departmentsData.find((d) => d.department === selectedDept);
    setSectors(dept?.sectors || []);
    setProducts(dept?.productsServices || []);

    if (!dept) {
      if (watch("sector")) setValue("sector", "");
      if (watch("product_service")) setValue("product_service", "");
    } else {
      if (!dept.sectors.includes(watch("sector"))) setValue("sector", "");
      if (!dept.productsServices.includes(watch("product_service")))
        setValue("product_service", "");
    }
  }, [selectedDept, setValue, watch]);

  // Inject dynamic department → sector/product options
  const fieldsWithDynamicOptions = fields.map((f) => {
    if (f.name === "tender_department") {
      return {
        ...f,
        options: departmentsData.map((d) => ({
          label: d.department,
          value: d.department,
        })),
        type: "select",
      };
    }
    if (f.name === "sector") {
      return {
        ...f,
        options: sectors.map((s) => ({ label: s, value: s })),
        type: "select",
      };
    }
    if (f.name === "product_service") {
      return {
        ...f,
        options: products.map((p) => ({ label: p, value: p })),
        type: "select",
      };
    }
    return f;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-6 mt-4">
          {fieldsWithDynamicOptions.map((field) => (
            <FormInput key={field.name} field={field} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomFormCard;
