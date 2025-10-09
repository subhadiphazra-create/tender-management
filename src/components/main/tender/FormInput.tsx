"use client";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SmartSelect } from "@/components/ui/smart-select"; // ✅ import your SmartSelect
import { FormField } from "../../../../types/type";

interface FormInputProps {
  field: FormField;
}

const FormInput: React.FC<FormInputProps> = ({ field }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[field.name]?.message as string | undefined;

  // 🔹 Render Select field using SmartSelect
  if (field.type === "select" && field.options) {
    return (
      <div
        className={`space-y-2 ${
          field.colSpan ? `col-span-${field.colSpan}` : ""
        }`}
      >
        <Label>{field.label}</Label>
        <Controller
          name={field.name}
          control={control}
          render={({ field: ctrlField }) => (
            <SmartSelect
              options={field.options || []}
              value={ctrlField.value || ""}
              onChange={ctrlField.onChange}
              placeholder={field.placeholder || `Select ${field.label}`}
              showSearchbar={true}  // ✅ enable search by default
              isMultiSelect={false} // ✅ single select by default
            />
          )}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  // 🔹 Textarea
  if (field.isTextarea) {
    return (
      <div
        className={`space-y-2 ${
          field.colSpan ? `col-span-${field.colSpan}` : ""
        }`}
      >
        <Label>{field.label}</Label>
        <Textarea
          {...register(field.name, { valueAsNumber: field.valueAsNumber })}
          placeholder={field.placeholder}
          className="h-24"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  // 🔹 File input
  if (field.type === "file") {
    return (
      <div
        className={`space-y-2 ${
          field.colSpan ? `col-span-${field.colSpan}` : ""
        }`}
      >
        <Label>{field.label}</Label>
        <Input type="file" {...register(field.name)} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  // 🔹 Default text/number/date/email/tel input
  return (
    <div
      className={`space-y-2 ${
        field.colSpan ? `col-span-${field.colSpan}` : ""
      }`}
    >
      <Label>{field.label}</Label>
      <Input
        {...register(field.name, { valueAsNumber: field.valueAsNumber })}
        type={field.type || "text"}
        placeholder={field.placeholder}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormInput;
