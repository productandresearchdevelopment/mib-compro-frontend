import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ExportActionItem = {
  icon: HugeiconsIconProps["icon"];
  title: string;
  onClick: () => void;
  hidden?: boolean;
  disabled?: boolean;
  disabledTooltip?: string;
};

type ExportMenuProps = {
  actions: ExportActionItem[];
  icon: HugeiconsIconProps["icon"];
  label: string;
};

export function ExportMenu({ actions, icon, label }: ExportMenuProps) {
  const [open, setOpen] = useState(false);
  const visibleActions = actions.filter((a) => !a.hidden);

  if (!visibleActions.length) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 w-max h-9 border-none bg-transparent hover:bg-transparent shadow-none cursor-pointer">
          <HugeiconsIcon icon={icon} className="w-6 h-6" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="w-47.5 p-1.5 bg-white rounded-xl border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
      >
        <div className="px-2 py-1.5 mb-0.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400/80">
            {label}
          </span>
        </div>

        <div className="flex flex-col">
          <TooltipProvider delayDuration={200}>
            {visibleActions.map((action) => {
              const item = (
                <DropdownMenuItem
                  key={action.title}
                  onClick={action.disabled ? undefined : action.onClick}
                  disabled={action.disabled}
                  className={`
                    flex items-center gap-3 px-2 py-1.5 rounded-lg outline-none
                    transition-all duration-200
                    ${action.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer focus:bg-slate-50"}
                    group
                  `}
                >
                  <div
                    className="
                      w-7 h-7 rounded-md flex items-center justify-center border
                      bg-slate-50/40 border-slate-100 text-slate-400
                      group-focus:bg-white group-focus:border-slate-200 group-focus:text-slate-600
                    "
                  >
                    <HugeiconsIcon icon={action.icon} className="w-3.5 h-3.5" />
                  </div>

                  <span className="text-[13px] font-medium tracking-tight text-slate-600 group-focus:text-slate-900">
                    {action.title}
                  </span>
                </DropdownMenuItem>
              );

              if (action.disabled && action.disabledTooltip) {
                return (
                  <Tooltip key={action.title}>
                    <TooltipTrigger asChild>
                      <span className="block">{item}</span>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-55">
                      <p className="text-xs">{action.disabledTooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return item;
            })}
          </TooltipProvider>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
