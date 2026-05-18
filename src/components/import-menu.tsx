import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";

type ImportExportActionItem = {
  icon: HugeiconsIconProps["icon"];
  title: string;
  onClick: () => void;
  hidden?: boolean;
  disabled?: boolean;
};

type ImportExportMenuProps = {
  actions: ImportExportActionItem[];
  label: string;
};

export function ImportExportMenu({ actions, label }: ImportExportMenuProps) {
  const visibleActions = actions.filter((a) => !a.hidden);
  if (!visibleActions.length) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center h-10 w-10 max-w-max rounded-md hover:bg-slate-100 cursor-pointer">
          <HugeiconsIcon
            icon={MoreHorizontalIcon}
            className="w-6 h-6 text-slate-600"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-47.5 p-1.5 bg-white rounded-xl border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
      >
        <div className="px-2 py-1.5 mb-0.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400/80">
            {label}
          </span>
        </div>

        <div className="flex flex-col">
          {visibleActions.map((action) => (
            <DropdownMenuItem
              key={action.title}
              onClick={action.onClick}
              disabled={action.disabled}
              className="
                flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer outline-none
                transition-all duration-200 group focus:bg-slate-50
              "
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
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
