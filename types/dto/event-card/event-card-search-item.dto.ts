import { EventCardStatus } from "@/types";

export interface EventCardSearchItemDto {
  id: string,
  guestName: string,
  status: EventCardStatus,
  notes: string,
  isUsed: boolean,
  firstScannedAt: Date | null,
  createdAt: Date,
  updatedAt: Date
}
