import { DarkIcon, LightIcon } from "@/app/components/icons";
import { Button } from "@/components/ui/button";
import { CookieStore } from "@/lib/cookies";
import { useAppStore } from "@/store/useAppStore";
import { ThemeMode } from "@/types";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useAppStore();
  const isDarkMode = theme === "dark";

  const toggle = () => {
    CookieStore.themeMode = isDarkMode ? ThemeMode.LIGHT : ThemeMode.DARK;
    setTheme(isDarkMode ? ThemeMode.LIGHT : ThemeMode.DARK);
  };

  return (
    <Button className="cursor-pointer" variant="ghost" size="icon" onClick={toggle}>
      {isDarkMode ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
}
