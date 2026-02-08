import { BellIcon, LogOutIcon, SettingsIcon, UserIcon } from "@/app/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AppearanceSettings } from "../../dialogs";
import { ThemeToggleButton } from "../../theme";
import { useHeader } from "./header.hook";

type PageHeaderProps = {
  title?: string
};

export default function PageHeader({ title = '' }: PageHeaderProps) {
  const {
    isOpenSetting,
    setIsOpenSetting,
    handleLogout,
  } = useHeader();
  return (
    <>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 cursor-pointer focus:box-shadow-none">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Admin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => setIsOpenSetting(true)}>
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
                <LogOutIcon className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      {isOpenSetting && <AppearanceSettings open={isOpenSetting} setOpen={setIsOpenSetting} />}
    </>
  )
}
