"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useForm,
  FormProvider,
  useFormContext,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../../../../types/type";
import FormInput from "../../tender/FormInput";
import departmentsData from "@/constants/department";
import { z } from "zod";

interface CustomFormDialogProps<T extends z.ZodTypeAny> {
  fields: FormField[];
  schema: T;
  title?: string;
  triggerLabel?: string;
  widthInPercentage?:string;
  heightInPercentage?:string;
  onSubmit?: (data: z.infer<T>) => void;
}

const DynamicFields: React.FC<{ fields: FormField[] }> = ({ fields }) => {
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
    <div className="grid grid-cols-3 gap-6 mt-4">
      {fieldsWithDynamicOptions.map((field) => (
        <FormInput key={field.name} field={field} />
      ))}
    </div>
  );
};

const CustomFormDialog = <T extends z.ZodTypeAny>({
  fields,
  schema,
  title = "Create New Entry",
  triggerLabel = "Open Form",
  onSubmit,
  widthInPercentage = "80%",
  heightInPercentage = "80%",
}: CustomFormDialogProps<T>) => {
  const [open, setOpen] = useState(false);
  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
  });

  const handleSubmit: SubmitHandler<z.infer<T>> = (data) => {
    console.log("Form Data Submitted:", data);
    onSubmit?.(data);
    setOpen(false);
    methods.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>

      <DialogContent className={`min-w-[${widthInPercentage}] max-h-[${heightInPercentage}] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
            <DynamicFields fields={fields} />

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CustomFormDialog;
