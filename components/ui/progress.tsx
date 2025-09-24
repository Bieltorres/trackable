// components/ui/progress.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full h-2 overflow-hidden rounded-full bg-slate-200",
          className
        )}
        {...props}
      >
        <div
          className="h-full bg-blue-600 transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
