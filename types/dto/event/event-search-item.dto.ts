import { EventStatus } from "@/types/enum";

export interface EventSearchItemDto {
  id: string;
  categoryId: string;
  title: string;
  startAt: Date;
  endAt: Date;
  locationName: string;
  address: string;
  mapUrl: string;
  thumbnailUrl: string;
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date;
}
