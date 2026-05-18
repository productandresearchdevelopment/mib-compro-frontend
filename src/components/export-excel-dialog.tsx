"use client";

import { useEffect, ReactNode } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Download04Icon } from "@hugeicons/core-free-icons";
import { BaseModal } from "@/components/base-modal";
import { DateField } from "@/components/form-fields";

const baseExportSchema = z.object({
  start_date: z.date({ message: "Start date is required" }),
  end_date: z.date({ message: "End date is required" }),
});

export type BaseExportFormValues = z.infer<typeof baseExportSchema>;

interface ExportExcelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (values: Record<string, unknown>) => Promise<void>;
  isLoading?: boolean;
  extraSchema?: z.ZodObject<z.ZodRawShape>;
  extraFields?: (form: UseFormReturn<Record<string, unknown>>) => ReactNode;
  defaultValues?: Record<string, unknown>;
  hiddenValues?: Record<string, unknown>;
}

export function ExportExcelDialog({
  isOpen,
  onClose,
  onExport,
  isLoading,
  extraSchema,
  extraFields,
  defaultValues = {},
  hiddenValues = {},
}: ExportExcelDialogProps) {
  const finalSchema = extraSchema
    ? baseExportSchema
        .merge(extraSchema)
        .refine(
          (data) =>
            (data as BaseExportFormValues).end_date >=
            (data as BaseExportFormValues).start_date,
          {
            message: "End date must be after or equal to start date",
            path: ["end_date"],
          },
        )
    : baseExportSchema.refine(
        (data) =>
          (data as BaseExportFormValues).end_date >=
          (data as BaseExportFormValues).start_date,
        {
          message: "End date must be after or equal to start date",
          path: ["end_date"],
        },
      );

  const form = useForm<Record<string, unknown>>({
    resolver: zodResolver(finalSchema),
    defaultValues: {
      start_date: undefined,
      end_date: undefined,
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (isOpen) {
      Object.entries(defaultValues).forEach(([key, value]) => {
        form.setValue(key, value);
      });
    }
  }, [isOpen, form, defaultValues]);

  const handleExport = async (values: Record<string, unknown>) => {
    try {
      const finalValues = {
        ...values,
        ...hiddenValues,
      };

      await onExport(finalValues);
      form.reset();
      onClose();
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      form.reset();
      onClose();
    }
  };

  return (
    <BaseModal
      open={isOpen}
      onClose={handleClose}
      title="Export to Excel"
      description="Select the date range for the data you want to export."
      icon={Download04Icon}
      leftActions={[
        {
          label: "Cancel",
          onClick: handleClose,
          variant: "outline",
          disabled: isLoading,
        },
      ]}
      rightActions={[
        {
          label: "Export",
          onClick: form.handleSubmit(handleExport),
          type: "submit",
          loading: isLoading,
          disabled: isLoading,
        },
      ]}
      maxWidth="sm:max-w-4xl"
      minHeight="auto"
      maxHeight="80vh"
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleExport)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <DateField
              control={form.control}
              name="start_date"
              label="Start Date"
              required
              placeholder="Select start date"
              disableFuture
            />

            <DateField
              control={form.control}
              name="end_date"
              label="End Date"
              required
              placeholder="Select end date"
            />
          </div>

          {extraFields && extraFields(form)}
        </form>
      </FormProvider>
    </BaseModal>
  );
}
