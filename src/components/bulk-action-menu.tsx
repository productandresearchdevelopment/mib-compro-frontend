import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";
import { useState } from "react";

export type BulkActionVariant = "default" | "success" | "warning" | "danger";

export type BulkActionItem = {
  icon: HugeiconsIconProps["icon"];
  title: string;
  description?: string;
  onClick: () => void;
  variant?: BulkActionVariant;
  hidden?: boolean;
  disabled?: boolean;
  separatorBefore?: boolean;
};

type BulkActionMenuProps = {
  actions: BulkActionItem[];
  selectedCount: number;
  icon: HugeiconsIconProps["icon"];
  label?: string;
};

const itemFocusMap: Record<BulkActionVariant, string> = {
  default: "focus:bg-slate-50",
  success: "focus:bg-emerald-50/60",
  warning: "focus:bg-amber-50/60",
  danger: "focus:bg-red-50/60",
};

const iconBoxMap: Record<BulkActionVariant, string> = {
  default:
    "bg-slate-50/40 border-slate-100 text-slate-400 group-focus:bg-white group-focus:border-slate-200 group-focus:text-slate-600",
  success: "bg-emerald-50/60 border-emerald-100 text-emerald-600",
  warning: "bg-amber-50/60 border-amber-100 text-amber-600",
  danger: "bg-red-50/60 border-red-100 text-red-600",
};

const textMap: Record<BulkActionVariant, string> = {
  default: "text-slate-600 group-focus:text-slate-900",
  success: "text-emerald-700",
  warning: "text-amber-700",
  danger: "text-red-600",
};

export function BulkActionMenu({
  actions,
  selectedCount,
  icon,
  label = "Bulk Actions",
}: BulkActionMenuProps) {
  const [open, setOpen] = useState(false);
  const visibleActions = actions.filter((a) => !a.hidden);

  if (!visibleActions.length || selectedCount === 0) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-max h-9 px-4 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-md cursor-pointer"
        >
          <HugeiconsIcon icon={icon} className="w-4 h-4 mr-2 text-slate-500" />
          <span className="text-sm font-medium">
            {label} ({selectedCount})
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="w-[190px] p-1.5 bg-white rounded-xl border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
      >
        <div className="px-2 py-1.5 mb-0.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400/80">
            {label}
          </span>
        </div>

        <div className="flex flex-col">
          {visibleActions.map((action) => {
            const variant: BulkActionVariant = action.variant ?? "default";

            return (
              <div key={action.title}>
                {action.separatorBefore && (
                  <div className="h-px bg-slate-100/80 my-1.5 mx-1" />
                )}

                <DropdownMenuItem
                  onClick={action.onClick}
                  disabled={action.disabled}
                  className={`
                    flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer outline-none
                    transition-all duration-200 group
                    ${itemFocusMap[variant]}
                  `}
                >
                  <div
                    className={`
                      w-7 h-7 rounded-md flex items-center justify-center border
                      transition-all
                      ${iconBoxMap[variant]}
                    `}
                  >
                    <HugeiconsIcon icon={action.icon} className="w-3.5 h-3.5" />
                  </div>

                  <span
                    className={`text-[13px] font-medium tracking-tight ${textMap[variant]}`}
                  >
                    {action.title}
                  </span>
                </DropdownMenuItem>
              </div>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
