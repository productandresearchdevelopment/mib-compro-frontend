"use client";

import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CloudDownloadFreeIcons,
  Delete02Icon,
  FileAttachmentIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { showWarningToast } from "@/utils/toast";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getAcceptString } from "@/utils/file";

// ============================================================================
// TYPES
// ============================================================================

interface BaseFileUploadProps {
  label: string;
  required?: boolean;
  helperText?: string;
  accept?: string[];
  maxSize?: number;
  previewSize?: number;
  className?: string;
  showPreview?: boolean;
  existingFileName?: string;
}

interface SingleFileUploadProps extends BaseFileUploadProps {
  multiple?: false;
  value?: string;
  onChange: (file: File | null) => void;
}

interface MultipleFileUploadProps extends BaseFileUploadProps {
  multiple: true;
  value?: never;
  onChange: (files: File[]) => void;
}

type FileUploadProps = SingleFileUploadProps | MultipleFileUploadProps;

// ============================================================================
// HELPERS
// ============================================================================

const getFileIcon = (fileName: string) => {
  const ext = fileName?.split(".").pop()?.toLowerCase() || "";

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) {
    return (
      <HugeiconsIcon
        icon={FileAttachmentIcon}
        className="w-5 h-5 text-primary-500/70"
      />
    );
  }
  if (ext === "pdf") {
    return (
      <HugeiconsIcon
        icon={FileAttachmentIcon}
        className="w-5 h-5 text-red-500/70"
      />
    );
  }
  if (["xlsx", "xls", "csv"].includes(ext)) {
    return (
      <HugeiconsIcon
        icon={FileAttachmentIcon}
        className="w-5 h-5 text-green-500/70"
      />
    );
  }
  return (
    <HugeiconsIcon
      icon={FileAttachmentIcon}
      className="w-5 h-5 text-gray-400/70"
    />
  );
};

const isImageFile = (accept: string[]) =>
  accept.some((type) => type.startsWith("image/"));

const isPdfFile = (accept: string[]) => accept.includes("application/pdf");

const isDocumentFile = (accept: string[]) =>
  accept.some(
    (type) =>
      type.includes("word") ||
      type.includes("excel") ||
      type.includes("powerpoint") ||
      type.includes("spreadsheet") ||
      type.includes("presentation"),
  );

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function FileUpload(props: FileUploadProps) {
  const {
    label,
    required,
    helperText,
    accept = ["image/jpeg", "image/jpg", "image/png"],
    maxSize = 5,
    previewSize = 128,
    onChange,
    className,
    multiple = false,
    showPreview = true,
    existingFileName,
  } = props;

  // ============================================================================
  // STATE
  // ============================================================================

  const [preview, setPreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);
  const [displayFileName, setDisplayFileName] = useState<string>("");

  const inputId = `file-upload-${label.replace(/\s+/g, "-").toLowerCase()}`;

  const isImage = isImageFile(accept);
  const isPdf = isPdfFile(accept);
  const isDocument = isDocumentFile(accept);

  // ============================================================================
  // SYNC WITH PROPS (FIX: Maintain filename across tab changes)
  // ============================================================================

  useEffect(() => {
    if (!multiple && props.value) {
      if (!currentFile && props.value !== preview) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPreview(props.value);

        if (existingFileName) {
          setDisplayFileName(existingFileName);
        }
      }
    } else if (!multiple && !props.value && !currentFile) {
      setPreview("");
      setDisplayFileName("");
    }
  }, [props.value, multiple, existingFileName, currentFile, preview]);

  // ============================================================================
  // FILE VALIDATION
  // ============================================================================

  const validateFile = (selectedFile: File): boolean => {
    if (!accept.includes(selectedFile.type)) {
      showWarningToast(
        `Please upload a valid file (${getAcceptString(accept)})`,
      );
      return false;
    }

    if (selectedFile.size > maxSize * 1024 * 1024) {
      showWarningToast(`File size must be less than ${maxSize}MB`);
      return false;
    }

    return true;
  };

  // ============================================================================
  // SINGLE FILE HANDLING
  // ============================================================================

  const handleSingleFileChange = (selectedFile: File) => {
    if (!validateFile(selectedFile)) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setCurrentFile(selectedFile);
      setDisplayFileName(selectedFile.name);
      (onChange as (file: File | null) => void)(selectedFile);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSingleFileRemove = () => {
    setPreview("");
    setCurrentFile(null);
    setDisplayFileName("");
    (onChange as (file: File | null) => void)(null);

    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) input.value = "";
  };

  // ============================================================================
  // MULTIPLE FILES HANDLING
  // ============================================================================

  const handleMultipleFilesAdd = (selectedFiles: FileList) => {
    const validFiles: File[] = [];
    const filesArray = Array.from(selectedFiles);

    filesArray.forEach((file) => {
      if (validateFile(file)) {
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      const newFiles = [...currentFiles, ...validFiles];
      setCurrentFiles(newFiles);
      (onChange as (files: File[]) => void)(newFiles);
    }
  };

  const handleMultipleFileRemove = (index: number) => {
    const newFiles = currentFiles.filter((_, i) => i !== index);
    setCurrentFiles(newFiles);
    (onChange as (files: File[]) => void)(newFiles);
  };

  // const handleMultipleFilesRemoveAll = () => {
  //   setCurrentFiles([]);
  //   (onChange as (files: File[]) => void)([]);

  //   const input = document.getElementById(inputId) as HTMLInputElement;
  //   if (input) input.value = "";
  // };

  // ============================================================================
  // DRAG & DROP
  // ============================================================================

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;

    if (multiple) {
      handleMultipleFilesAdd(droppedFiles);
    } else {
      if (droppedFiles && droppedFiles[0]) {
        handleSingleFileChange(droppedFiles[0]);
      }
    }
  };

  // ============================================================================
  // INPUT CHANGE HANDLER
  // ============================================================================

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    if (multiple) {
      handleMultipleFilesAdd(selectedFiles);
    } else {
      if (selectedFiles[0]) {
        handleSingleFileChange(selectedFiles[0]);
      }
    }
  };

  // ============================================================================
  // RENDER CONDITIONS
  // ============================================================================

  const hasPreview = !multiple && (preview || currentFile);
  const showImagePreview = hasPreview && isImage && !isPdf && !isDocument;
  const showFileInfo = hasPreview && (isPdf || isDocument);
  const showMultipleFiles = multiple && currentFiles.length > 0 && showPreview;

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-slate-700">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        {helperText && <p className="text-xs text-slate-400">{helperText}</p>}
      </div>

      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-4 transition-colors",
          isDragging
            ? "border-primary-500 bg-primary-50/50"
            : "border-slate-200 bg-slate-50/30 hover:border-slate-300 hover:bg-slate-50/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {showMultipleFiles ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-700">
                {currentFiles.length} file{currentFiles.length > 1 ? "s" : ""}{" "}
                selected
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById(inputId)?.click()}
                className="cursor-pointer"
              >
                Add More
              </Button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {currentFiles.map((f, idx) => (
                <div
                  key={`${f.name}-${idx}`}
                  className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200"
                >
                  {getFileIcon(f.name)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 font-medium line-clamp-2 wrap-break-word">
                      {f.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(f.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleMultipleFileRemove(idx)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors cursor-pointer shrink-0 self-start"
                  >
                    <HugeiconsIcon icon={Delete02Icon} className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : hasPreview && showPreview ? (
          <div className="flex flex-col items-center gap-3">
            {showImagePreview && (
              <div className="relative">
                <Image
                  width={previewSize}
                  height={previewSize}
                  src={preview}
                  alt="Preview"
                  className="object-contain w-full h-full"
                  style={{
                    width: `${previewSize}px`,
                    height: `${previewSize}px`,
                  }}
                  priority
                />
                <button
                  type="button"
                  onClick={handleSingleFileRemove}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors cursor-pointer"
                >
                  <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
                </button>
              </div>
            )}

            {showFileInfo && (
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 min-w-75 w-full">
                {getFileIcon(displayFileName || "file")}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 font-medium line-clamp-2 wrap-break-word">
                    {displayFileName || "Current file"}
                  </p>
                  {currentFile && (
                    <p className="text-xs text-gray-500 mt-1">
                      {(currentFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleSingleFileRemove}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors cursor-pointer shrink-0 self-start mt-1"
                >
                  <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
                </button>
              </div>
            )}

            {showImagePreview && displayFileName && (
              <p className="text-sm text-gray-500 text-center">
                {displayFileName}
              </p>
            )}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById(inputId)?.click()}
              className="cursor-pointer"
            >
              Change {isImage && !isPdf && !isDocument ? "Image" : "File"}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-4">
            <HugeiconsIcon
              icon={CloudDownloadFreeIcons}
              className="h-11 w-11 text-slate-900"
            />
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700">
                Click to upload{" "}
                <span className="font-normal text-slate-400 text-sm">
                  or drag and drop
                </span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {getAcceptString(accept)} (Max {maxSize}MB)
              </p>
            </div>
            <Button
              type="button"
              onClick={() => document.getElementById(inputId)?.click()}
              className="mt-3 cursor-pointer bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg shadow-slate-100 transition-all active:scale-95"
            >
              Browse files
            </Button>
          </div>
        )}

        <input
          id={inputId}
          type="file"
          accept={accept.join(",")}
          multiple={multiple}
          className="hidden"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
