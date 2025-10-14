"use client";

import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { tenderFormSchema } from "../../../../schema/tenderFormSchema";
import {
  attachmentsFields,
  basicInfoFields,
  bidSecurityFields,
  eligibilityFields,
  evaluationCriteriaFields,
  organizationInfoFields,
  scheduleOfEventsFields,
  submissionRequirementsFields,
  technicalFields,
  termsAndConditionsFields,
} from "@/constants/formFields";
import CustomFormCard from "./form-cards/CustomFormCard";
import { dummyTenderData } from "@/constants";
import type { z } from "zod";

type TenderFormValues = z.infer<typeof tenderFormSchema>;

interface TenderFormProps {
  tenderId?: string;
}

export default function TenderForm({ tenderId }: TenderFormProps) {
  const form = useForm<TenderFormValues>({
    resolver: zodResolver(tenderFormSchema),
    defaultValues: {},
  });

  // 🔹 Load data if editing
  useEffect(() => {
    if (tenderId) {
      const tender = dummyTenderData.find((t) => t.id === tenderId);
      if (tender) {
        form.reset(tender);
      }
    }
  }, [tenderId, form]);

  const onSubmit = (data: TenderFormValues) => {
    if (tenderId) {
      console.log("✅ Updating Tender:", tenderId, data);
      // TODO: call API for update
    } else {
      console.log("🆕 Creating New Tender:", data);
      // TODO: call API for creation
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <CustomFormCard fields={basicInfoFields} title="Basic Information" />
        <CustomFormCard
          fields={organizationInfoFields}
          title="Organization Information"
        />
        <CustomFormCard
          fields={eligibilityFields}
          title="Eligibility Requirements"
        />
        <CustomFormCard
          fields={technicalFields}
          title="Technical Specifications"
        />
        <CustomFormCard
          fields={evaluationCriteriaFields}
          title="Evaluation Criteria"
        />
        <CustomFormCard fields={bidSecurityFields} title="Bid Security" />
        <CustomFormCard
          title="Submission Requirements"
          fields={submissionRequirementsFields}
        />
        <CustomFormCard
          title="Schedule of Events"
          fields={scheduleOfEventsFields}
        />
        <CustomFormCard
          title="Terms and Conditions"
          fields={termsAndConditionsFields}
        />
        <CustomFormCard title="Attachments" fields={attachmentsFields} />

        <Button type="submit" className="w-40 mt-4">
          {tenderId ? "Update Tender" : "Create Tender"}
        </Button>
      </form>
    </FormProvider>
  );
}
