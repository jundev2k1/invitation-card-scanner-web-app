import { TranslateFn } from "@/root/i18n/type";
import { EventStatus, InputOption } from "@/root/types";

export const getEventStatusOptions = (t: TranslateFn): InputOption[] => [
  { label: t("event.enum.status.DRAFT"), value: EventStatus.DRAFT.toString() },
  { label: t("event.enum.status.PUBLISHED"), value: EventStatus.PUBLISHED.toString() },
  { label: t("event.enum.status.COMPLETED"), value: EventStatus.COMPLETED.toString() },
  { label: t("event.enum.status.CANCELLED"), value: EventStatus.CANCELLED.toString() },
];
