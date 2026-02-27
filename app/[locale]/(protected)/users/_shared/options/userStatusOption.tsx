import { TranslateFn } from "@/i18n/type";
import { UserStatus } from "@/types";

export function getUserStatusOptions(t: TranslateFn) {
  return [
    { value: UserStatus.INACTIVE, label: t('user.enum.status.INACTIVE') },
    { value: UserStatus.WAITING_FOR_APPROVE, label: t('user.enum.status.WAITING_FOR_APPROVE') },
    { value: UserStatus.ACTIVE, label: t('user.enum.status.ACTIVE') },
    { value: UserStatus.SUSPENDED, label: t('user.enum.status.SUSPENDED') },
    { value: UserStatus.DELETED, label: t('user.enum.status.DELETED') },
  ];
}
