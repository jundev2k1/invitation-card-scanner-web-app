import { Toast } from "@/app/components";
import { useCheckInEventCard, useScanEventCard } from "@/services";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type UseEventInformationProps = {
  eventId?: string | null;
  token: string;
  onReset: () => void;
}

export const useEventInformation = ({ eventId, token, onReset }: UseEventInformationProps) => {
  const t = useTranslations();
  const [showInfoId, setShowInfoId] = useState<string | null>(null);
  const [hoverInfoId, setHoverInfoId] = useState<string | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const noteInputRef = useRef<HTMLTextAreaElement>(null!);
  const { data, isLoading, isError } = useScanEventCard(token);
  const { mutateAsync } = useCheckInEventCard();

  useEffect(() => {
    if (!isError && !isLoading)
      return;

    onReset();
  }, [token, onReset, isError, isLoading]);

  const scanLogs = useMemo(() => data?.data?.scannedLogs
    .sort((a, b) => new Date(a.scannedAt).getTime() - new Date(b.scannedAt).getTime()) ?? [],
    [data]);
  const isTargetEvent = useMemo(
    () => !isLoading && !eventId || eventId === data?.data?.eventId,
    [data, token, eventId]);


  const onOpenInfo = useCallback((id: string) => {
    setShowInfoId(id);
    setHoverInfoId(id);
  }, [token]);
  const onCloseInfo = useCallback(() => { setShowInfoId(null); }, [token]);

  const onHoverInfo = useCallback((id: string) => { setHoverInfoId(id); }, [token]);
  const onHoverOutInfo = useCallback(() => { setHoverInfoId(null); }, [token]);

  const onApprove = useCallback(async () => {
    if (isLoading || !data?.data) {
      Toast.showWarning(t('common.messages.checkInFailed'));
      return;
    }

    if (data.data.isUsed && !window.confirm(t('event.scanner.text.confirmReScan')))
      return;

    await mutateAsync({
      eventId: data.data.eventId,
      id: data.data.id,
      notes: noteInputRef.current.value.trim()
    });
    setIsApproved(true);
    noteInputRef.current.value = '';
    Toast.showSuccess(t('common.messages.checkInSuccess'));
  }, [data]);

  return {
    data: data?.data ?? null,
    scanLogs,
    isLoading,
    showInfoId,
    onOpenInfo,
    onCloseInfo,
    hoverInfoId,
    onHoverInfo,
    onHoverOutInfo,
    isApproved,
    onApprove,
    noteInputRef,
    isTargetEvent,
  };
};
