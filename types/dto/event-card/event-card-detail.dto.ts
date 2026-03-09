import { EventCardStatus, EventStatus } from "@/types";
import { EventCardLogDto } from "./event-card-log.dto";

export interface EventCardDetailDto {
  id: string;
  eventId: string;
  eventTitle: string;
  eventStatus: EventStatus;
  startAt: Date;
  endAt: Date;
  location: string;
  address: string;
  guestName: string;
  accessToken: string;
  isUsed: boolean;
  firstScannedAt: Date | null;
  cardStatus: EventCardStatus;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  scannedLogs: EventCardLogDto[];
}
