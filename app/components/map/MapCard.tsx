import { MapPinOffIcon } from "@/app/components/icons";
import { useTranslations } from "next-intl";

type MapCardProps = {
  mapUrl: string,
  className?: string
}
export const MapCard = ({ mapUrl, className = "h-100 w-full" }: MapCardProps) => {
  const t = useTranslations();

  const getCleanUrl = (input: string | undefined) => {
    if (!input) return null;

    if (input.includes('<iframe')) {
      const match = input.match(/src="([^"]+)"/);
      return match ? match[1] : null;
    }

    if (input.includes("://www.google.com") && input.includes("/embed")) {
      return input;
    }

    return null;
  };

  const finalUrl = getCleanUrl(mapUrl);

  return (
    <div className={`relative overflow-hidden rounded-lg border bg-slate-50 dark:bg-slate-900 ${className}`}>
      {finalUrl ? (
        <iframe
          title="Google Map"
          src={finalUrl}
          className="h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center text-muted-foreground p-4 text-center">
          <MapPinOffIcon className="mb-3 h-12 w-12 opacity-20" />
          <div className="space-y-1">
            <p className="text-sm font-medium">{t('common.map.noMap')}</p>
            <p className="text-xs opacity-70">{t('common.map.noMapDesc')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
