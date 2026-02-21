"use client";
import { RotateCcwIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import AppButton from "./default.button";

type RefreshButtonProps = {
  cooldown?: number;
  onRefresh: () => void;
};

export function RefreshButton({ cooldown = 5, onRefresh }: RefreshButtonProps) {
  const t = useTranslations();
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleRefresh = () => {
    if (secondsLeft > 0) return;
    
    setSecondsLeft(cooldown);
    onRefresh();
  };

  const isCooldownActive = secondsLeft > 0;

  return (
    <AppButton
      leftIcon={<RotateCcwIcon className={isCooldownActive ? "animate-spin" : ""} />}
      variant="outline"
      onClick={handleRefresh}
      disabled={isCooldownActive}
    >
      {t("common.actions.refresh")}
      {isCooldownActive && ` (${secondsLeft}s)`}
    </AppButton>
  );
}
