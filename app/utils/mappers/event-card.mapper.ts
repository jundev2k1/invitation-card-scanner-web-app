import { EventCardStatus } from "@/types";

export const getEventCardStatusColor = (status: EventCardStatus): string => {
  const base = "text-white";

  const variants: Record<EventCardStatus, string> = Object.freeze({
    [EventCardStatus.ACTIVE]: `bg-yellow-500 ${base}`,
    [EventCardStatus.INACTIVE]: `bg-gray-500 ${base}`,
  });

  return variants[status] || `bg-gray-400 ${base}`;
}

export const getEventCardStatusTransKey = (status: EventCardStatus): string => {
  const variants: Record<EventCardStatus, string> = Object.freeze({
    [EventCardStatus.INACTIVE]: "event.enum.card-status.INACTIVE",
    [EventCardStatus.ACTIVE]: "event.enum.card-status.ACTIVE",
  });

  return variants[status] || "event.enum.card-status.INACTIVE";
}
