"use client";
import {
  AppearanceSettings,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components";
import { LogOutIcon, SettingsIcon, UserIcon } from "@/app/components/icons";
import { useTranslations } from "next-intl";
import { useProfileMenu } from "./useProfileMenu";

export const ProfileMenu = () => {
  const t = useTranslations();
  const {
    user,
    isOpenSetting,
    setIsOpenSetting,
    handleLogout
  } = useProfileMenu();
  return <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 cursor-pointer focus:box-shadow-none">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.nickname.substring(0, 2).toUpperCase() || '★'}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>
          <p>{user?.nickname || 'Root'}</p>
          <span className="text-xs">{user?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <UserIcon className="mr-2 h-4 w-4" />
          {t('common.profileMenu.profile')}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => setIsOpenSetting(true)}>
          <SettingsIcon className="mr-2 h-4 w-4" />
          {t('common.profileMenu.settings')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
          <LogOutIcon className="mr-2 h-4 w-4" />
          {t('common.profileMenu.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    {isOpenSetting && <AppearanceSettings open={isOpenSetting} setOpen={setIsOpenSetting} />}
  </>;
};
