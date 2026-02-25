import { UserSummaryDto } from "../user";

export interface EventCardLogDto {
  id: string;
  cardId: string;
  scanAt: Date;
  scannedBy: UserSummaryDto;
  notes: string;
}
