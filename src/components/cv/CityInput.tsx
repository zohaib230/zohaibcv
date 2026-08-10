import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PAK_CITIES } from "@/lib/presets";

/** Location field that autocompletes major Pakistani cities as you type. */
export function CityInput({
  value,
  onChange,
  placeholder = "Lahore, Pakistan",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const q = value.trim().toLowerCase();
  const matches = q
    ? PAK_CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 8)
    : PAK_CITIES.slice(0, 8);

  return (
    <div className="relative">
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        autoComplete="off"
      />
      {open && matches.length > 0 && (
        <ul className="absolute z-40 mt-1 max-h-56 w-full overflow-auto rounded-md border border-border bg-popover p-1 shadow-lg">
          {matches.map((c) => (
            <li key={c}>
              <button
                type="button"
                className="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-secondary"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(c.includes(",") ? c : `${c}, Pakistan`);
                  setOpen(false);
                }}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
