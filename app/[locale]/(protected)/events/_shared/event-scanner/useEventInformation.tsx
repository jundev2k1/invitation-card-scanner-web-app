import { useScanEventCard } from "@/services";
import { useCallback, useEffect, useState } from "react";

export const useEventInformation = ({ token, onReset }: { token: string, onReset: () => void }) => {
  const [showInfoId, setShowInfoId] = useState<string | null>(null);
  const [hoverInfoId, setHoverInfoId] = useState<string | null>(null);
  const { data, isLoading, isError } = useScanEventCard(token);

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

  return {
    data: data?.data ?? null,
    isLoading,
    showInfoId,
    onOpenInfo,
    onCloseInfo,
    hoverInfoId,
    onHoverInfo,
    onHoverOutInfo,
  };
};
