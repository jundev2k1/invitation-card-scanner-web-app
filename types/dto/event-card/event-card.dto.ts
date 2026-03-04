import { EventCardStatus } from "@/types";
import { EventCardLogDto } from "./event-card-log.dto";

export interface EventCardDto {
  id: string;
  eventId: string;
  guestName: string;
  accessToken: string;
  isUsed: boolean;
  firstScannedAt: Date | null;
  status: EventCardStatus;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  scannedLogs: EventCardLogDto[];
}
