"use client";
import { useGetEventCardDetail } from "@/services";
import { useCallback, useState } from "react";

type useEventMemberDetailProps = {
  eventId: string,
  cardId: string,
}

export const useEventMemberDetail = ({ eventId, cardId }: useEventMemberDetailProps) => {
  const [showInfoId, setShowInfoId] = useState<string | null>(null);
  const [hoverInfoId, setHoverInfoId] = useState<string | null>(null);
  const { data, isLoading } = useGetEventCardDetail(eventId, cardId);

  const onOpenInfo = useCallback((id: string) => {
    setShowInfoId(id);
    setHoverInfoId(id);
  }, [eventId, cardId]);
  const onCloseInfo = useCallback(() => { setShowInfoId(null); }, [eventId, cardId]);

  const onHoverInfo = useCallback((id: string) => { setHoverInfoId(id); }, [eventId, cardId]);
  const onHoverOutInfo = useCallback(() => { setHoverInfoId(null); }, [eventId, cardId]);

  return {
    isLoading,
    data: data?.data,
    showInfoId,
    onOpenInfo,
    onCloseInfo,
    hoverInfoId,
    onHoverInfo,
    onHoverOutInfo,
  };
};
