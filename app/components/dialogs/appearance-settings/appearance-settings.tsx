import { MoonIcon, PaletteIcon, SunIcon } from "@/app/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ThemeColor, ThemeMode } from "@/types";
import { ThemeColorStyles, useAppearanceSettings } from "./appearance-settings.hook";

type AppearanceSettingsProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const AppearanceSettings = ({ open, setOpen }: AppearanceSettingsProps) => {
  const {
    language,
    setLanguage,
    theme,        // ThemeMode.LIGHT | ThemeMode.DARK
    setMode,
    color,        // ThemeColor enum value
    setColor,
  } = useAppearanceSettings();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-1.5 pb-4">
          <div className="flex items-center gap-2">
            <PaletteIcon className="h-5 w-5 text-primary" />
            <DialogTitle className="text-xl font-semibold dark:text-zinc-50">
              Appearance
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            Customize colors, theme, and language.
          </DialogDescription>
        </DialogHeader>

        {/* Language */}
        <div className="space-y-7 mt-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Language
            </Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger
                className={cn(
                  "w-full h-10",
                  "bg-white dark:bg-gray-800",
                  "border border-gray-300 dark:border-gray-600",
                  "text-gray-900 dark:text-gray-100",
                  "focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                )}
              >
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent
                className={cn(
                  "pointer-events-auto z-100", // fix dropdown bị che / không click
                  "bg-white dark:bg-gray-800",
                  "border border-gray-300 dark:border-gray-600",
                  "text-gray-900 dark:text-gray-100",
                  "shadow-lg"
                )}
              >
                <SelectItem
                  value="vi"
                  className="focus:bg-indigo-50 dark:focus:bg-indigo-950/50"
                >
                  Tiếng Việt
                </SelectItem>
                <SelectItem
                  value="en"
                  className="focus:bg-indigo-50 dark:focus:bg-indigo-950/50"
                >
                  English
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Theme Mode */}
          <div className="space-y-2">
            <Label className="text-sm font-medium dark:text-zinc-100">Theme Mode</Label>
            <RadioGroup
              value={theme}
              onValueChange={(v) => setMode(v as ThemeMode)}
              className="grid grid-cols-2 gap-3"
            >
              <div>
                <RadioGroupItem value={ThemeMode.LIGHT} id="mode-light" className="peer sr-only" />
                <Label
                  htmlFor="mode-light"
                  className={cn(
                    "flex flex-col items-center justify-center rounded-md border border-input bg-background px-4 py-3 text-center cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground",
                    theme === ThemeMode.LIGHT && "border-primary bg-primary/5 text-primary"
                  )}
                >
                  <SunIcon className="mb-1.5 h-5 w-5" />
                  <span className="text-sm font-medium">Light</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem value={ThemeMode.DARK} id="mode-dark" className="peer sr-only" />
                <Label
                  htmlFor="mode-dark"
                  className={cn(
                    "flex flex-col items-center justify-center rounded-md border border-input bg-background px-4 py-3 text-center cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground ",
                    theme === ThemeMode.DARK && "border-primary bg-primary/5 text-primary"
                  )}
                >
                  <MoonIcon className="mb-1.5 h-5 w-5" />
                  <span className="text-sm font-medium">Dark</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Accent Color */}
          <div className="space-y-2">
            <Label className="text-sm font-medium dark:text-zinc-100">Accent Color</Label>
            <RadioGroup
              value={color}
              onValueChange={(v) => setColor(v as ThemeColor)}
              className="grid grid-cols-4 gap-3 sm:grid-cols-5"
            >
              {Object.values(ThemeColor).map((themeColor) => (
                <div key={themeColor}>
                  <RadioGroupItem
                    value={themeColor}
                    id={`color-${themeColor}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`color-${themeColor}`}
                    className={cn(
                      "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-all hover:scale-110 hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-background",
                      color === themeColor && "scale-110 ring-2 ring-ring ring-offset-2 ring-offset-background"
                    )}
                    style={{ backgroundColor: ThemeColorStyles[themeColor] }}
                  >
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full",
                        themeColor === ThemeColor.DEFAULT ? "bg-muted" : themeColor
                      )}
                    />
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
