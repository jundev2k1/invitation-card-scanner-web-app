import { EventCardStatus } from "@/types/enum";

export interface EventCardSearchItemDto {
  id: string,
  guestName: string,
  status: EventCardStatus,
  notes: string,
  createdAt: Date,
  updatedAt: Date
}
