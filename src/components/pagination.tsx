import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pageSizes: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  showPageInfo?: boolean;
  showPageSizeSelector?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  pageSizes,
  onPageChange,
  onPageSizeChange,
  showPageInfo = true,
  showPageSizeSelector = true,
}: PaginationProps) => {
  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const threshold = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - threshold && i <= currentPage + threshold)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <span
            key={`ellipsis-${index}`}
            className="w-8 text-center text-slate-300 font-bold"
          >
            ···
          </span>
        );
      }

      const isActive = page === currentPage;

      return (
        <button
          key={page}
          onClick={() => onPageChange(page as number)}
          className={`relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
            isActive
              ? "bg-primary-600 text-white shadow-md shadow-primary-200 scale-110 z-10"
              : "text-slate-500 hover:bg-primary-50 hover:text-primary-600"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-4 bg-white">
      <div className="flex-1">
        {showPageSizeSelector && (
          <div className="flex items-center gap-3 bg-slate-50 w-fit p-1.5 rounded-full border border-slate-100">
            <span className="pl-3 text-[13px] font-semibold text-slate-500">
              Show:
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 h-8 bg-white rounded-full text-[13px] font-bold text-slate-700 shadow-sm border border-slate-200/50 hover:border-primary-300 outline-none transition-all cursor-pointer">
                  {pageSize}
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    className="w-3.5 h-3.5 text-primary-600"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="rounded-2xl shadow-xl border-slate-100 p-1"
              >
                {pageSizes.map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => onPageSizeChange(size)}
                    className="rounded-xl text-[13px] font-semibold focus:bg-primary-50 focus:text-primary-700 cursor-pointer"
                  >
                    {size}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 bg-slate-50/80 p-1.5 rounded-full border border-slate-100 shadow-inner">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-10 w-10 rounded-full bg-white text-slate-400 hover:text-primary-600 hover:bg-white shadow-sm disabled:opacity-20 transition-all active:scale-95 cursor-pointer"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-1">{renderPageNumbers()}</div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-10 w-10 rounded-full bg-white text-slate-400 hover:text-primary-600 hover:bg-white shadow-sm disabled:opacity-20 transition-all active:scale-95 cursor-pointer"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 flex justify-end">
        {showPageInfo && (
          <div className="flex items-center gap-2 px-5 py-2 bg-slate-50 rounded-full border border-slate-100">
            <span className="text-[13px] font-medium text-slate-500">
              Page{" "}
              <span className="text-primary-600 font-extrabold">
                {currentPage}
              </span>
            </span>
            <span className="text-[11px] text-slate-400">of</span>
            <span className="text-[13px] font-medium text-slate-500">
              <span className="text-primary-600 font-extrabold">
                {totalPages}{" "}
              </span>
              Total
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
