"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "framer-motion";
import { ANIMATION_VARIANTS, TRANSITIONS } from "@/utils/animation";
import { cn } from "@/lib/utils";

type HugeIconType = Parameters<typeof HugeiconsIcon>[0]["icon"];

export interface BaseModalAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline" | "destructive";
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

export interface TabConfig {
  id: string;
  label: string;
}

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: HugeIconType;
  children: ReactNode;

  // Footer Actions
  leftActions?: BaseModalAction[];
  rightActions?: BaseModalAction[];
  hideFooter?: boolean;

  // Tabs
  tabs?: TabConfig[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;

  // Styling
  maxWidth: string;
  minHeight: string;
  maxHeight: string;
  className?: string;
}

export function BaseModal({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  leftActions,
  rightActions,
  hideFooter = false,
  tabs,
  activeTab,
  onTabChange,
  maxWidth,
  minHeight,
  maxHeight,
  className,
}: BaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          maxWidth,
          "p-0 overflow-hidden border-none rounded-2xl shadow-md bg-white gap-0",
          className,
        )}
        showCloseButton={false}
      >
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              {...ANIMATION_VARIANTS.modal}
              transition={TRANSITIONS.spring}
              className="flex flex-col"
              style={{
                minHeight: minHeight,
                maxHeight: maxHeight,
              }}
            >
              <DialogHeader className="py-4 px-6 bg-white flex flex-row items-center justify-between sticky top-0 z-10 border-b border-slate-50 shadow-sm">
                <div className="flex items-center gap-4.5">
                  {icon && (
                    <div className="p-2.5 bg-slate-100 rounded-xl text-black">
                      <HugeiconsIcon icon={icon} className="w-5.5 h-5.5" />
                    </div>
                  )}

                  <div className="flex flex-col">
                    <DialogTitle className="text-lg font-bold text-black tracking-tight">
                      {title}
                    </DialogTitle>
                    {description && (
                      <p className="text-sm text-slate-400">{description}</p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-10 h-10 rounded-full hover:bg-slate-100 text-slate-400 flex items-center justify-center transition cursor-pointer"
                >
                  <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" />
                </button>
              </DialogHeader>

              {tabs && tabs.length > 0 && (
                <div className="pt-4 border-b border-slate-100 px-6">
                  <div className="flex gap-6">
                    {tabs.map((tab) => {
                      const isActive = activeTab === tab.id;

                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => onTabChange?.(tab.id)}
                          className="relative pb-3 text-sm font-medium transition-colors duration-200 cursor-pointer"
                        >
                          <span
                            className={cn(
                              "transition-colors duration-200",
                              isActive
                                ? "text-slate-800"
                                : "text-slate-400 hover:text-slate-600",
                            )}
                          >
                            {tab.label}
                          </span>

                          <div
                            className={cn(
                              "absolute left-0 bottom-0 h-0.5 w-full rounded-full transition-all duration-200",
                              isActive
                                ? "bg-slate-800 opacity-100"
                                : "bg-transparent opacity-0",
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

              {!hideFooter && (
                <div className="py-4 px-6 bg-white/80 backdrop-blur border-t border-slate-50 shadow-sm flex items-center justify-between">
                  <div className="flex gap-2">
                    {leftActions?.map((action, i) => (
                      <Button
                        key={i}
                        type={action.type || "button"}
                        variant={action.variant || "outline"}
                        onClick={action.onClick}
                        disabled={action.disabled || action.loading}
                        className={cn("cursor-pointer", action.className)}
                      >
                        {action.loading ? "Loading..." : action.label}
                      </Button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {rightActions?.map((action, i) => (
                      <Button
                        key={i}
                        type={action.type || "button"}
                        variant={action.variant || "default"}
                        onClick={action.onClick}
                        disabled={action.disabled || action.loading}
                        className={cn(
                          action.className ||
                            "h-10 px-6 rounded-lg font-semibold bg-primary-600 hover:bg-primary-700 text-white shadow-md transition cursor-pointer",
                        )}
                      >
                        {action.loading ? "Processing..." : action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
