import { UserSummaryDto } from "../user";

export interface EventCardLogDto {
  id: string;
  cardId: string;
  scannedAt: Date;
  scannedBy: UserSummaryDto;
  notes: string;
}
