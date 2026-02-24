import { EventStatus } from "@/types";

export const getEventStatusColor = (status: EventStatus): string => {
  const base = "text-white dark:text-white";

  const variants: Record<EventStatus, string> = Object.freeze({
    [EventStatus.DELETED]: `bg-gray-600 ${base}`,
    [EventStatus.DRAFT]: `bg-amber-600 ${base}`,
    [EventStatus.PUBLISHED]: `bg-primary ${base}`,
    [EventStatus.COMPLETED]: `bg-blue-600 ${base}`,
    [EventStatus.CANCELLED]: `bg-rose-600 ${base}`,
  });

  return variants[status] || `bg-gray-500 ${base}`;
}

export const getEventStatusTransKey = (status: EventStatus): string => {
  const variants: Record<EventStatus, string> = Object.freeze({
    [EventStatus.DELETED]: "event.enum.status.DELETED",
    [EventStatus.DRAFT]: "event.enum.status.DRAFT",
    [EventStatus.PUBLISHED]: "event.enum.status.PUBLISHED",
    [EventStatus.COMPLETED]: "event.enum.status.COMPLETED",
    [EventStatus.CANCELLED]: "event.enum.status.CANCELLED",
  });

  return variants[status] || "event.enum.status.DELETED";
}
