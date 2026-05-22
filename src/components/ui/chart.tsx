"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  }
>;

export interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig;
  children: React.ReactElement;
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ id, className, config, children, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <div
      ref={ref}
      className={className}
      {...props}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          #${chartId} {
            --color-desktop: ${config.desktop?.color || "#2563eb"};
            --color-mobile: ${config.mobile?.color || "#2563eb"};
          }
        `
      }} />
      <div id={chartId} className="w-full h-full">
        <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </div>
  );
});
ChartContainer.displayName = "ChartContainer";

export const ChartTooltip = RechartsPrimitive.Tooltip;

export interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  className?: string;
}

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(({ active, payload, className }, ref) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={`rounded-xl border border-slate-200 bg-white p-2.5 shadow-md text-xs dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const color = item.color || item.payload.color;
          return (
            <div key={index} className="flex items-center gap-1.5">
              <span
                className="size-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: color }}
              />
              <span className="text-slate-500 capitalize dark:text-slate-400">
                {item.name}:
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-slate-50">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
});
ChartTooltipContent.displayName = "ChartTooltipContent";
