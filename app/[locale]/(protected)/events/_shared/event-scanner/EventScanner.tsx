import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, IconButton } from "@/app/components";
import { ScanQrCodeIcon } from "@/app/components/icons";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { EventInformation } from "./EventInformation";
import { useEventScanner } from "./useEventScanner";

const DynamicScanner = dynamic(() => import("@/app/components/qr/QRCodeScanner"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-muted animate-pulse flex items-center justify-center">
      Camera loading...
    </div>
  )
});

export const EventScanner = () => {
  const t = useTranslations();
  const {
    isOpen,
    onOpen,
    onClose,
    result,
    onScan,
    onReset,
  } = useEventScanner();

  const hasResult = !!result;
  return (
    <>
      <IconButton
        variant="outline"
        className="dark:text-muted-foreground"
        icon={<ScanQrCodeIcon size={16} />}
        size="sm"
        onClick={onOpen}
        tooltip={t('event.scanner.tooltip.scanButton')}
      />

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className={cn(
          "p-0 overflow-hidden bg-background border-border shadow-2xl",
          "max-h-[80vh] flex flex-col",
          hasResult ? 'md:max-w-2xl sm:w-full' : 'md:max-w-sm sm:w-full'
        )}>
          <DialogHeader className="p-6 pb-0 shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <ScanQrCodeIcon className="w-5 h-5 text-primary" />
              </div>
              <span className="dark:text-foreground">{t('event.scanner.title')}</span>
            </DialogTitle>
          </DialogHeader>

          <DialogDescription>
          </DialogDescription>

          {!result ? (
            <div className="p-8 flex flex-col items-center">
              {isOpen && (
                <DynamicScanner onScanSuccess={onScan} />
              )}

              <div className="mt-6 w-full min-h-10 flex items-center justify-center">
                <p className="text-sm text-muted-foreground animate-pulse">
                  {t('event.scanner.placeholder.waitForRecognition')}
                </p>
              </div>
            </div>
          ) : (
            <div className="px-8 py-4 grow overflow-y-auto">
              <EventInformation token={result} onReset={onReset} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
