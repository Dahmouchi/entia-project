import { ThemeStyle, THEME_OPTIONS } from "@/lib/secion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ThemeSelectorProps {
  value: ThemeStyle;
  onChange: (value: ThemeStyle) => void;
}

export const ThemeSelector = ({ value, onChange }: ThemeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {THEME_OPTIONS.map((theme) => (
        <button
          key={theme.value}
          type="button"
          onClick={() => onChange(theme.value)}
          className={cn(
            "relative p-4 rounded-xl border-2 transition-all duration-300 text-left group overflow-hidden",
            value === theme.value
              ? "border-primary shadow-lg shadow-primary/20"
              : "border-border hover:border-primary/50"
          )}
        >
          {/* Theme Preview */}
          <div
            className={cn(
              "w-full h-20 rounded-lg mb-3 flex items-center justify-center",
              theme.value === "modern-dark" && "bg-slate-800",
              theme.value === "light-minimal" && "bg-white",
              theme.value === "gradient-bold" &&
                "bg-gradient-to-br from-slate-800 to-slate-900",
              theme.value === "corporate" && "bg-sky-400/50"
            )}
          >
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "w-6 h-6 rounded",
                    theme.value === "modern-dark" && "bg-indigo-400",
                    theme.value === "light-minimal" && "bg-black",
                    theme.value === "gradient-bold" && "bg-yellow-300",
                    theme.value === "corporate" && "bg-sky-400"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Theme Info */}
          <div className="font-semibold text-sm">{theme.label}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {theme.description}
          </div>

          {/* Selected Indicator */}
          {value === theme.value && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Check size={14} className="text-primary-foreground" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
