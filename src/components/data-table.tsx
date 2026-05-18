"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sorting05Icon } from "@hugeicons/core-free-icons";
import { TableSkeleton } from "@/components/table-skeleton";
import { ActionTablePopover } from "@/components/action-table-popover";
import { ReactNode } from "react";
import Image from "next/image";

type HugeIconType = Parameters<typeof HugeiconsIcon>[0]["icon"];

export interface ActionItem {
  icon: HugeIconType;
  title: string;
  variant?: "default" | "danger" | "success";
  hidden?: boolean;
  separatorBefore?: boolean;
  onClick: () => void;
}

export interface ColumnDef<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  hidden?: boolean;
  render?: (item: T, index: number) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  pageSize?: number;

  selectable?: boolean;
  selectedItems?: string[];
  onSelectAll?: (checked: boolean) => void;
  onSelectItem?: (itemId: string, checked: boolean) => void;
  getItemId?: (item: T) => string;

  actions?: (item: T) => ActionItem[];

  zebraStripe?: boolean;
  zebraColor?: string;
  cellBorder?: string;
  emptyMessage?: string;

  getRowClassName?: (item: T, index: number) => string;
}

export function DataTable<T>({
  data,
  columns,
  isLoading = false,
  pageSize = 10,

  selectable = false,
  selectedItems = [],
  onSelectAll,
  onSelectItem,
  getItemId,

  actions,

  zebraStripe = true,
  zebraColor = "bg-primary-50",
  cellBorder = "border-[1px] border-solid border-[#f2f5f7]",
  emptyMessage = "No data found",

  getRowClassName,
}: DataTableProps<T>) {
  const visibleColumns = columns.filter((col) => !col.hidden);
  const totalColumns =
    visibleColumns.length + (selectable ? 1 : 0) + (actions ? 1 : 0);

  const allSelected =
    selectable && selectedItems.length === data.length && data.length > 0;

  return (
    <div className="border border-solid border-[#f2f5f7] rounded-lg overflow-hidden bg-white">
      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
            {selectable && (
              <TableHead className={`${cellBorder} w-12`}>
                <Checkbox
                  className="data-[state=checked]:bg-primary-700 data-[state=checked]:border-primary-700 hover:data-[state=checked]:bg-primary-800 hover:data-[state=checked]:border-primary-800 data-[state=checked]:text-white cursor-pointer"
                  checked={allSelected}
                  onCheckedChange={onSelectAll}
                />
              </TableHead>
            )}

            {visibleColumns.map((column) => (
              <TableHead
                key={column.key}
                className={`${cellBorder} ${column.sortable ? "group" : ""} ${column.width || ""} ${column.className || ""}`}
              >
                {column.sortable ? (
                  <div className="flex items-center justify-between">
                    {column.header}
                    <HugeiconsIcon
                      icon={Sorting05Icon}
                      className="w-4 h-4 text-gray-400 cursor-pointer invisible group-hover:visible transition-all"
                    />
                  </div>
                ) : (
                  column.header
                )}
              </TableHead>
            ))}

            {actions && (
              <TableHead className={`${cellBorder} text-center`}>
                Action
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableSkeleton
              rows={pageSize}
              cellBorder={cellBorder}
              withAction={!!actions}
              columns={visibleColumns.map((col) => ({
                width: col.width || "max-w-[150px]",
              }))}
            />
          ) : data.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={totalColumns}
                className={`${cellBorder} text-center py-8 text-gray-500`}
              >
                <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                  <Image
                    src="/images/no-data-found.png"
                    alt="data not found"
                    width={900}
                    height={900}
                    className="w-60 h-auto object-contain"
                    priority
                  />

                  <p className="text-sm font-medium">{emptyMessage}</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => {
              const itemId = getItemId ? getItemId(item) : "";
              const isSelected = selectable && selectedItems.includes(itemId);

              const defaultRowClass = zebraStripe
                ? index % 2 === 0
                  ? "bg-white hover:bg-white"
                  : `${zebraColor} hover:${zebraColor}`
                : "bg-white hover:bg-white";

              const customRowClass = getRowClassName
                ? getRowClassName(item, index)
                : "";

              return (
                <TableRow
                  key={itemId || index}
                  className={`${defaultRowClass} ${customRowClass}`}
                >
                  {selectable && (
                    <TableCell className={cellBorder}>
                      <Checkbox
                        className="data-[state=checked]:bg-primary-700 data-[state=checked]:border-primary-700 hover:data-[state=checked]:bg-primary-800 hover:data-[state=checked]:border-primary-800 data-[state=checked]:text-white cursor-pointer"
                        checked={isSelected}
                        onCheckedChange={(checked) =>
                          onSelectItem?.(itemId, checked as boolean)
                        }
                      />
                    </TableCell>
                  )}

                  {visibleColumns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={`${cellBorder} ${column.className || ""}`}
                    >
                      {column.render
                        ? column.render(item, index)
                        : (item as Record<string, unknown>)[column.key]
                          ? String(
                              (item as Record<string, unknown>)[column.key],
                            )
                          : "-"}
                    </TableCell>
                  ))}

                  {actions && (
                    <TableCell className={`${cellBorder} text-center`}>
                      <ActionTablePopover actions={actions(item)} />
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
