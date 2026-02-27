import { IconButton } from "@/components/button";
import { Notification } from "@/components/notification";
import { ProfileMenu } from "@/components/profiles";
import { ThemeToggleButton } from "@/components/theme";
import { MenuIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store";
import { SearchBar } from "./search-bar/SearchBar";

export default function PageHeader() {
  const { isCollapsed, toggleSidebar } = useSidebarStore();

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

        <SearchBar />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 md:gap-4">
        <ThemeToggleButton />
        <Notification />
        <ProfileMenu />
      </div>
    </header>
  )
}
