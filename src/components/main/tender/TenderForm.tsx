"use client";
import React from "react";
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

export default function TenderForm() {
  const form = useForm({
    resolver: zodResolver(tenderFormSchema),
    defaultValues: {},
  });

  const onSubmit = (data: any) => console.log(data);

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
        <Button type="submit" className="w-32">
          Submit Tender
        </Button>
      </form>
    </FormProvider>
  );
}
