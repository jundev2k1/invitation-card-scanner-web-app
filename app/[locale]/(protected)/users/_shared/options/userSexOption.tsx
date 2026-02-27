import { TranslateFn } from "@/i18n/type";
import { Sex } from "@/types";

export const getSexOptions = (t: TranslateFn) => [
  { value: Sex.MALE, label: t('user.enum.gender.MALE') },
  { value: Sex.FEMALE, label: t('user.enum.gender.FEMALE') },
  { value: Sex.OTHER, label: t('user.enum.gender.OTHER') },
];
