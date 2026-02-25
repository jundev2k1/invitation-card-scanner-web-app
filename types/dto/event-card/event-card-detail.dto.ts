import { EventCardStatus } from "@/types/enum";
import { EventCardLogDto } from "./event-card-log.dto";

export interface EventCardDetailDto {
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
