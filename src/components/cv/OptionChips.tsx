import { cn } from "@/lib/utils";

/** Quick-pick answer chips shown under every question. */
export function OptionChips({
  options,
  value,
  onPick,
  multi = false,
  className,
}: {
  options: string[];
  value?: string | string[];
  onPick: (v: string) => void;
  multi?: boolean;
  className?: string;
}) {
  const isActive = (o: string) =>
    multi ? Array.isArray(value) && value.includes(o) : value === o;

  return (
    <div className={cn("mt-2 flex flex-wrap gap-1.5", className)}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onPick(o)}
          className={cn(
            "rounded-full border px-2.5 py-1 text-[11px] transition-colors",
            isActive(o)
              ? "border-brand bg-brand text-brand-foreground"
              : "border-border bg-secondary text-secondary-foreground hover:border-brand hover:bg-brand/15",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
