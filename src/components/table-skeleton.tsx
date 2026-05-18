import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

type SkeletonColumn = {
  width?: string;
  height?: string;
  rounded?: string;
  isBadge?: boolean;
};

type TableSkeletonProps = {
  rows?: number;
  columns: SkeletonColumn[];
  withAction?: boolean;
  cellBorder?: string;
};

export function TableSkeleton({
  rows = 10,
  columns,
  withAction = false,
  cellBorder = "",
}: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow
          key={rowIndex}
          className={
            rowIndex % 2 === 0
              ? "bg-white hover:bg-white"
              : "bg-primary-50 hover:bg-primary-50"
          }
        >
          {columns.map((col, colIndex) => (
            <TableCell key={colIndex} className={cellBorder}>
              <Skeleton
                className={`
                  ${col.height ?? "h-4"}
                  ${col.width ?? "w-full"}
                  ${col.rounded ?? "rounded"}
                  ${col.isBadge ? "rounded-full h-6 w-32" : ""}
                  bg-slate-200
                `}
              />
            </TableCell>
          ))}

          {withAction && (
            <TableCell className={`${cellBorder} text-center`}>
              <div className="flex justify-center">
                <Skeleton className="h-8 w-8 rounded bg-slate-200" />
              </div>
            </TableCell>
          )}
        </TableRow>
      ))}
    </>
  );
}
