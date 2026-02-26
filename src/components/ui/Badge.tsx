import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "outline";
  className?: string;
}

const variantClasses = {
  default: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
  blue: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60",
  outline:
    "border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
