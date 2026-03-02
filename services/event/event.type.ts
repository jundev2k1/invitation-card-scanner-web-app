import { BaseFilter } from "@/root/app/components"
import { EventStatus } from "@/root/types"

export interface GetEventListRequest extends BaseFilter {
  categoryIds?: string[],
  statuses?: EventStatus[],
  startFrom?: Date | null,
  startTo?: Date | null,
  endFrom?: Date | null,
  endTo?: Date | null,
  sortBy?: "createdAt" | "startAt" | "status",
  sortOrder?: "asc" | "desc"
}

export type CreateEventRequest = {
  categoryId: string | null,
  title: string,
  description: string,
  startAt: Date,
  endAt: Date | null,
  locationName: string,
  address: string,
  mapUrl: string,
  thumbnailUrl: string
}

export type UpdateEventRequest = {
  categoryId: string | null,
  title: string,
  description: string,
  startAt: Date,
  endAt: Date | null,
  locationName: string,
  address: string,
  mapUrl: string,
  thumbnailUrl: string
}
