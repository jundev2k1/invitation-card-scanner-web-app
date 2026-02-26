import { Dialog, DialogContent, DialogHeader, DialogTitle, IconButton } from "@/app/components";
import { ScanQrCodeIcon } from "@/app/components/icons";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEventScanner } from "./useEventScanner";

const DynamicScanner = dynamic(() => import("@/app/components/qr/QRCodeScanner"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-muted animate-pulse flex items-center justify-center">
      Đang khởi động camera...
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
  } = useEventScanner();

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
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-background border-border shadow-2xl">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <ScanQrCodeIcon className="w-5 h-5 text-primary" />
              </div>
              <span className="dark:text-foreground">{t('event.scanner.title')}</span>
            </DialogTitle>
          </DialogHeader>

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
        </DialogContent>
      </Dialog>
    </>
  );
}
