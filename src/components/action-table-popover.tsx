import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";
import { MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";

export type ActionVariant = "default" | "success" | "warning" | "danger";

export type ActionTableItem = {
  icon: HugeiconsIconProps["icon"];
  title: string;
  description?: string;
  onClick: () => void;
  variant?: ActionVariant;
  hidden?: boolean;
  disabled?: boolean;
  separatorBefore?: boolean;
};

type ActionTablePopoverProps = {
  actions: ActionTableItem[];
};

const itemFocusMap: Record<ActionVariant, string> = {
  default: "focus:bg-slate-50",
  success: "focus:bg-emerald-50/60",
  warning: "focus:bg-amber-50/60",
  danger: "focus:bg-red-50/60",
};

const iconBoxMap: Record<ActionVariant, string> = {
  default:
    "bg-slate-50/40 border-slate-100 text-slate-400 group-focus:bg-white group-focus:border-slate-200 group-focus:text-slate-600",
  success: "bg-emerald-50/60 border-emerald-100 text-emerald-600",
  warning: "bg-amber-50/60 border-amber-100 text-amber-600",
  danger: "bg-red-50/60 border-red-100 text-red-600",
};

const textMap: Record<ActionVariant, string> = {
  default: "text-slate-600 group-focus:text-slate-900",
  success: "text-emerald-700",
  warning: "text-amber-700",
  danger: "text-red-600",
};

export function ActionTablePopover({ actions }: ActionTablePopoverProps) {
  const [open, setOpen] = useState(false);
  const visibleActions = actions.filter((a) => !a.hidden);

  if (!visibleActions.length) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`h-8 w-8 p-0 rounded-lg transition-all duration-200 outline-none border cursor-pointer
            ${
              open
                ? "bg-white text-slate-900 border-slate-300 shadow-sm"
                : "text-slate-400 bg-white border-slate-200/60 hover:bg-slate-50 hover:border-slate-300"
            }
          `}
        >
          <HugeiconsIcon
            icon={MoreVerticalIcon}
            className={`w-4 h-4 transition-transform duration-300 ${
              open ? "rotate-90 text-slate-600" : ""
            }`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-47.5 p-1.5 bg-white rounded-xl border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
      >
        <div className="px-2 py-1.5 mb-0.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400/80">
            Actions
          </span>
        </div>

        <div className="flex flex-col">
          {visibleActions.map((action) => {
            const variant: ActionVariant = action.variant ?? "default";

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
