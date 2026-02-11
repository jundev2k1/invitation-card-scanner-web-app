import { IconButton } from "@/app/components/button";
import { BellIcon } from "@/app/components/icons";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store";
import { MenuIcon } from "lucide-react";
import { ProfileMenu } from "../../profiles";
import { ThemeToggleButton } from "../../theme";

export default function PageHeader() {
  const { isCollapsed, toggleSidebar, currentPage } = useSidebarStore();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6",
        "text-foreground shadow-sm"
      )}
    >
      <div className="flex items-center gap-4">
        <IconButton
          icon={<MenuIcon />}
          className="lg:hidden! md:hidden! sm:hidden!"
          onClick={() => toggleSidebar(!isCollapsed)}
          aria-label="Toggle sidebar" />

        <h1 className="text-lg md:text-xl font-semibold tracking-tight">
          {currentPage || "Dashboard"}
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 md:gap-4">
        <ThemeToggleButton />

        <IconButton
          icon={
            <>
              <BellIcon />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">3</span>
            </>
          }
          variant="ghost"
          size="icon"
          className="relative hover:bg-accent hover:text-accent-foreground"
          aria-label="Notifications"
        />

        <ProfileMenu />
      </div>
    </header>
  )
}
