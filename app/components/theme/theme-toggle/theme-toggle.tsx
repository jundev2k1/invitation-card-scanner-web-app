import { DarkIcon, LightIcon } from "@/app/components/icons";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

export default function ThemeToggleButton() {
  const isDarkMode = Cookies.get("theme") === "dark";

  const toggle = () => {
    Cookies.set("theme", isDarkMode ? "light" : "dark");
    window.location.reload();
  };

  return (
    <Button className="cursor-pointer" variant="ghost" size="icon" onClick={toggle}>
      {isDarkMode ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
}
