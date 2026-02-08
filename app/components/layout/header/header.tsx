import { BellIcon } from "@/app/components/icons";
import { Button } from "@/components/ui/button";
import { ProfileMenu } from "../../profiles";
import { ThemeToggleButton } from "../../theme";

type PageHeaderProps = {
  title?: string
};

export default function PageHeader({ title = '' }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b bg-white text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 px-6 py-4">
      <h1 className="text-xl font-semibold">{title}</h1>

      <div className="flex items-center gap-4">

        {/* Theme Toggle */}
        <ThemeToggleButton />

        {/* Notifications */}
        <Button className="cursor-pointer" variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
        </Button>

        {/* User Menu */}
        <ProfileMenu />
      </div>
    </header>
  )
}
