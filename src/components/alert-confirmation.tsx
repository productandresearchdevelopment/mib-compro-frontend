"use client";

import { HugeiconsIconProps } from "@hugeicons/react";
import {
  Delete02Icon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  Undo02Icon,
} from "@hugeicons/core-free-icons";
import { BaseModal } from "@/components/base-modal";

export type AlertVariant = "default" | "destructive" | "success" | "warning";

interface AlertConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: AlertVariant;
  isLoading?: boolean;
}

const variantConfig: Record<
  AlertVariant,
  {
    icon: HugeiconsIconProps["icon"];
    buttonClass: string;
  }
> = {
  default: {
    icon: CheckmarkCircle02Icon,
    buttonClass:
      "bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30",
  },
  destructive: {
    icon: Delete02Icon,
    buttonClass:
      "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30",
  },
  success: {
    icon: Undo02Icon,
    buttonClass:
      "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30",
  },
  warning: {
    icon: AlertCircleIcon,
    buttonClass:
      "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30",
  },
};

export const AlertConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  isLoading = false,
}: AlertConfirmationProps) => {
  const config = variantConfig[variant];

  return (
    <BaseModal
      open={isOpen}
      onClose={onClose}
      title={title}
      description="Please confirm your action."
      icon={config.icon}
      leftActions={[
        {
          label: cancelText,
          onClick: onClose,
          variant: "outline",
          disabled: isLoading,
        },
      ]}
      rightActions={[
        {
          label: isLoading ? "Processing..." : confirmText,
          onClick: onConfirm,
          loading: isLoading,
          disabled: isLoading,
        },
      ]}
      maxWidth="sm:max-w-4xl"
      minHeight="auto"
      maxHeight="80vh"
    >
      <div className="flex flex-col items-center justify-center text-center py-6 space-y-2">
        <p className="text-sm text-slate-600 max-w-md">{description}</p>

        {variant === "destructive" && (
          <p className="text-xs text-red-500">This action cannot be undone.</p>
        )}
      </div>
    </BaseModal>
  );
};
