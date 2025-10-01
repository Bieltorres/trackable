// components/ui/LoadingSpinner.tsx
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  size = "md",
  message,
  className,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
    : "flex items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/50";

  return (
    <div className={cn(containerClasses, className)}>
      <div className="flex flex-col items-center gap-3">
        <div
          className={cn(
            "animate-spin rounded-full border-b-primary border-t-transparent border-l-transparent border-r-transparent",
            sizeClasses[size]
          )}
        />
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </div>
  );
}

// Variação inline para usar em botões
export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
      <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
      <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
    </div>
  );
}

// Variação para skeleton loading
export function LoadingSkeleton({
  count = 1,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn("h-20 rounded-lg bg-muted animate-pulse", className)}
        />
      ))}
    </div>
  );
}
