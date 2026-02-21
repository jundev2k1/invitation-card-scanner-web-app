import { EventStatusEnum } from "@/types/enum";

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
  status: EventStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
