"use client";

import { useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuArrow,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  TickDouble02Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";

type DropdownFilterOption = {
  value: string;
  label: string;
};

type DropdownFilterProps = {
  label: string;
  icon: HugeiconsIconProps["icon"];
  value: string;
  options: DropdownFilterOption[];
  onChange: (value: string) => void;
  minWidth?: number;
  maxHeight?: number;
  hasAllOption?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyLabel?: string;
};

export function DropdownFilter({
  label,
  icon,
  value,
  options,
  onChange,
  minWidth = 220,
  maxHeight = 260,
  hasAllOption = true,
  searchable = false,
  searchPlaceholder = "Search...",
  emptyLabel = "No data found",
}: DropdownFilterProps) {
  const [search, setSearch] = useState("");

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? label;

  const [allOption, ...restOptions] = hasAllOption
    ? options
    : [null, ...options];

  const filteredOptions = useMemo(() => {
    if (!searchable || !search.trim()) return restOptions;

    const keyword = search.toLowerCase();
    return restOptions.filter(
      (opt) => opt && opt.label.toLowerCase().includes(keyword),
    );
  }, [search, searchable, restOptions]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-max h-9 px-4 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-md cursor-pointer"
        >
          <HugeiconsIcon icon={icon} className="w-4 h-4 mr-2 text-slate-500" />
          <span className="truncate max-w-37.5">{selectedLabel}</span>
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            className="w-3.5 h-3.5 ml-2 text-slate-400"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={8}
        style={{ minWidth }}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="p-1.5 bg-white rounded-xl shadow-lg border-none z-200"
      >
        <DropdownMenuArrow width={12} height={6} className="fill-white" />

        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {label}
        </div>

        {searchable && (
          <div className="px-2 pb-2">
            <div className="relative">
              <HugeiconsIcon
                icon={Search01Icon}
                className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                placeholder={searchPlaceholder}
                className="h-8 pl-8 text-sm"
              />
            </div>
          </div>
        )}

        {hasAllOption && allOption && (
          <>
            <DropdownMenuItem
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer ${
                value === allOption.value
                  ? "bg-primary-50 text-primary-600 focus:bg-primary-100 focus:text-primary-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              onClick={() => {
                onChange(allOption.value);
                setSearch("");
              }}
            >
              <span className="truncate">{allOption.label}</span>
              {value === allOption.value && (
                <HugeiconsIcon icon={TickDouble02Icon} className="w-4 h-4" />
              )}
            </DropdownMenuItem>

            <div className="my-1 h-px bg-slate-100 mx-1" />
          </>
        )}

        <div className="overflow-y-auto px-1" style={{ maxHeight }}>
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-6 text-sm text-center text-slate-400">
              {emptyLabel}
            </div>
          ) : (
            filteredOptions.map((option) => {
              if (!option) return null;
              const isSelected = value === option.value;

              return (
                <DropdownMenuItem
                  key={option.value}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer ${
                    isSelected
                      ? "bg-primary-50 text-primary-600 focus:bg-primary-100 focus:text-primary-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setSearch("");
                  }}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && (
                    <HugeiconsIcon
                      icon={TickDouble02Icon}
                      className="w-4 h-4"
                    />
                  )}
                </DropdownMenuItem>
              );
            })
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
