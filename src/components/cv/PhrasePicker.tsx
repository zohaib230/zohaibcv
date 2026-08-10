import { useState } from "react";
import { Lightbulb } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export type PhraseGroup = { category: string; lines: string[] };

/**
 * "Suggestions" button that opens a library of hand-written professional
 * phrases the user can pick and then edit.
 */
export function PhrasePicker({
  groups,
  onPick,
  label = "Suggestions",
  title = "Ready-made phrases",
  description = "Pick a line to add it, then edit it in your own words.",
}: {
  groups: PhraseGroup[];
  onPick: (line: string) => void;
  label?: string;
  title?: string;
  description?: string;
}) {
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState(groups[0]?.category ?? "");
  const active = groups.find((g) => g.category === cat) ?? groups[0];

  return (
    <>
      <Button type="button" size="sm" variant="outline" className="mt-2" onClick={() => setOpen(true)}>
        <Lightbulb className="h-3.5 w-3.5" /> {label}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          {groups.length > 1 && (
            <div className="flex flex-wrap gap-1.5">
              {groups.map((g) => (
                <button
                  key={g.category}
                  type="button"
                  onClick={() => setCat(g.category)}
                  className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                    active?.category === g.category
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
                >
                  {g.category}
                </button>
              ))}
            </div>
          )}

          <div className="max-h-[55vh] space-y-2 overflow-auto pr-1">
            {active?.lines.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  onPick(l);
                  setOpen(false);
                }}
                className="w-full rounded-lg border border-border bg-background p-3 text-left text-sm leading-relaxed transition-colors hover:border-brand hover:bg-brand/5"
              >
                {l}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
