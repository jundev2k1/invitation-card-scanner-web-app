import { Toast } from "@/app/components";
import { useCheckInEventCard, useScanEventCard } from "@/services";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

export const useEventInformation = ({ token, onReset }: { token: string, onReset: () => void }) => {
  const t = useTranslations();
  const [showInfoId, setShowInfoId] = useState<string | null>(null);
  const [hoverInfoId, setHoverInfoId] = useState<string | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const { data, isLoading, isError } = useScanEventCard(token);
  const { mutateAsync } = useCheckInEventCard();

  useEffect(() => {
    if (!isError && !isLoading)
      return;

    onReset();
  }, [token, onReset, isError, isLoading]);

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

    await mutateAsync({
      eventId: data?.data?.eventId ?? "",
      id: data?.data?.id ?? "",
      notes: notes.trim()
    });
    setIsApproved(true);
    setNotes("");
    Toast.showSuccess(t('common.messages.checkInSuccess'));
  }, []);

  return {
    data: data?.data ?? null,
    isLoading,
    showInfoId,
    onOpenInfo,
    onCloseInfo,
    hoverInfoId,
    onHoverInfo,
    onHoverOutInfo,
    isApproved,
    onApprove,
    notes,
    setNotes,
  };
};
