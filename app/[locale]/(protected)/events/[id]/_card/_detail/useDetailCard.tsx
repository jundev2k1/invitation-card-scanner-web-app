"use client";

import { useGetEventCardDetail } from "@/services";

interface EventCardHistoryItemDto {
  id: string;
  scanAt: Date;
  scannedById: string;
  scannedByName: string;
  notes: string;
}

type useEventCardDetailProps = {
  eventId: string,
  cardId: string,
}

export const useEventCardDetail = ({ eventId, cardId }: useEventCardDetailProps) => {
  const { data, isLoading } = useGetEventCardDetail(eventId, cardId);

  return {
    isLoading: true,
    data: data?.data,
  };
};
