import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Upload01Icon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { BaseModal } from "@/components/base-modal";
import { FileUpload } from "@/components/form-fields/file-upload";

interface ImportLogItem {
  row: number;
  status: "success" | "error" | "warning";
  message: string;
  data?: string;
}

interface ImportResult {
  total_rows: number;
  success_count: number;
  error_count: number;
  warning_count: number;
  logs: ImportLogItem[];
  processed_at: string;
  processing_time: string;
}

interface ImportExcelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => Promise<ImportResult>;
}

export function ImportExcelDialog({
  isOpen,
  onClose,
  onImport,
}: ImportExcelDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const importResult = await onImport(selectedFile);
      setResult(importResult);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Import failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    if (!isUploading) {
      setSelectedFile(null);
      setResult(null);
      setError("");
      onClose();
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResult(null);
    setError("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return (
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            className="w-4 h-4 text-green-500"
          />
        );
      case "error":
        return (
          <HugeiconsIcon
            icon={AlertCircleIcon}
            className="w-4 h-4 text-red-500"
          />
        );
      case "warning":
        return (
          <HugeiconsIcon
            icon={InformationCircleIcon}
            className="w-4 h-4 text-amber-500"
          />
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-amber-50 border-amber-200 text-amber-800";
      default:
        return "";
    }
  };

  return (
    <BaseModal
      open={isOpen}
      onClose={handleClose}
      title="Import from Excel"
      description={
        !result
          ? "Upload an Excel file to import clients"
          : "Import completed. Review the results below."
      }
      icon={Upload01Icon}
      leftActions={
        !result
          ? [
              {
                label: "Cancel",
                onClick: handleClose,
                variant: "outline",
                disabled: isUploading,
              },
            ]
          : [
              {
                label: "Import Another File",
                onClick: handleReset,
                variant: "outline",
              },
            ]
      }
      rightActions={
        !result
          ? [
              {
                label: isUploading ? "Importing..." : "Import",
                onClick: handleUpload,
                loading: isUploading,
                disabled: isUploading || !selectedFile,
              },
            ]
          : [
              {
                label: "Close",
                onClick: handleClose,
              },
            ]
      }
      maxWidth="sm:max-w-4xl"
      minHeight="300px"
      maxHeight="80vh"
    >
      <AnimatePresence mode="wait">
        {!result ? (
          <div className="space-y-4">
            <FileUpload
              label="Excel File"
              required
              helperText="XLSX or XLS format, maximum size 5MB"
              accept={[
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.ms-excel",
              ]}
              maxSize={5}
              onChange={setSelectedFile}
            />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl bg-red-50 border border-red-200 p-4"
              >
                <div className="flex items-start gap-3">
                  <HugeiconsIcon
                    icon={AlertCircleIcon}
                    className="w-5 h-5 text-red-500 mt-0.5"
                  />
                  <p className="text-sm text-red-800 font-medium">{error}</p>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-4 gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl bg-gray-50 border border-gray-200 p-4"
              >
                <p className="text-xs text-gray-600 mb-2 font-semibold">
                  Total Rows
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {result.total_rows}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                className="rounded-xl bg-green-50 border border-green-200 p-4"
              >
                <p className="text-xs text-green-600 mb-2 font-semibold">
                  Success
                </p>
                <p className="text-2xl font-bold text-green-700">
                  {result.success_count}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl bg-red-50 border border-red-200 p-4"
              >
                <p className="text-xs text-red-600 mb-2 font-semibold">
                  Errors
                </p>
                <p className="text-2xl font-bold text-red-700">
                  {result.error_count}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                className="rounded-xl bg-amber-50 border border-amber-200 p-4"
              >
                <p className="text-xs text-amber-600 mb-2 font-semibold">
                  Warnings
                </p>
                <p className="text-2xl font-bold text-amber-700">
                  {result.warning_count}
                </p>
              </motion.div>
            </div>

            <div className="text-xs text-gray-500 px-1">
              <p className="font-medium">
                Processing time: {result.processing_time}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h4 className="text-sm font-semibold text-gray-700">
                  Import Logs ({result.logs.length})
                </h4>
              </div>
              <div className="space-y-2 max-h-75 overflow-y-auto pr-2">
                <AnimatePresence mode="popLayout">
                  {result.logs.map((log, index) => (
                    <motion.div
                      key={index}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        layout: {
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        },
                        opacity: { duration: 0.2 },
                      }}
                      className={cn(
                        "rounded-xl border p-4 text-sm",
                        getStatusColor(log.status),
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {getStatusIcon(log.status)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="font-semibold">Row {log.row}</span>
                            {log.data && (
                              <span className="text-xs opacity-75 font-medium">
                                ({log.data})
                              </span>
                            )}
                          </div>
                          <p className="text-xs opacity-90 leading-relaxed">
                            {log.message}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BaseModal>
  );
}
