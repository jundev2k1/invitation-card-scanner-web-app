import { Dialog, DialogContent, DialogHeader, DialogTitle, IconButton } from "@/app/components";
import { CheckCircleIcon, ScanQrCodeIcon } from "@/app/components/icons";
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
        tooltip="Scan QR..."
      />

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-background border-border shadow-2xl">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <ScanQrCodeIcon className="w-5 h-5 text-primary" />
              </div>
              <span className="dark:text-foreground">Xác thực mã QR</span>
            </DialogTitle>
          </DialogHeader>

          <div className="p-8 flex flex-col items-center">
            {isOpen && (
              <DynamicScanner onScanSuccess={() => { }} />
            )}

            <div className="mt-6 w-full min-h-10 flex items-center justify-center">
              {result ? (
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-900 animate-in zoom-in-95">
                  <CheckCircleIcon className="w-4 h-4" />
                  Đã quét: {result.substring(0, 20)}...
                </div>
              ) : (
                <p className="text-sm text-muted-foreground animate-pulse">
                  Đang chờ nhận diện...
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
