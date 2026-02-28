"use client";
import { Toast } from "@/components";
import { IconButton } from "@/components/button";
import { CopyIcon, LoaderIcon, RefreshIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { QRCodeSVG } from "qrcode.react";
import { useRef, useState } from "react";

interface QRCodeGeneratorProps {
  value?: string;
  size?: number;
  logo?: string;
  isLoading?: boolean;
  copyable?: boolean;
  onRefresh?: () => void;
  className?: string;
}

export function QRCodeGenerator({
  value,
  size = 200,
  logo,
  isLoading = false,
  copyable = false,
  onRefresh,
  className,
}: QRCodeGeneratorProps) {
  const t = useTranslations();
  const [isHovered, setIsHovered] = useState(false);
  const qrRef = useRef<SVGSVGElement>(null);

  const qrValue = value || "https://your-placeholder-link.com";
  const isPlaceholder = !value || isLoading;

  const handleCopy = async () => {
    if (!qrRef.current) return;

    try {
      const svgString = new XMLSerializer().serializeToString(qrRef.current);
      const svgBlob = new Blob([svgString], { type: "image/svg+xml" });

      const canvas = document.createElement("canvas");
      canvas.width = size + 20;
      canvas.height = size + 20;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Cannot get canvas context");

      const img = new Image();
      img.src = "data:image/svg+xml;base64," + btoa(svgString);
      await new Promise((r) => (img.onload = r));
      ctx.drawImage(img, 10, 10, size, size);
      const pngBlob = await new Promise<Blob>((res) =>
        canvas.toBlob((b) => res(b!), "image/png")
      );

      await navigator.clipboard.write([
        new ClipboardItem({
          "image/svg+xml": svgBlob,
          "image/png": pngBlob,
        }),
      ]);

      Toast.showSuccess(t('common.messages.copySuccess'));
    } catch (err) {
      console.error("Copy image failed:", err);
      Toast.showError(t('common.messages.copyFailed'));
    }
  };

  return (
    <div
      className={cn("relative p-4 bg-white rounded-xl shadow-md inline-block border overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "relative transition-all duration-300",
        isPlaceholder ? "opacity-20 blur-[2px]" : "opacity-100"
      )}>
        <QRCodeSVG
          ref={qrRef}
          value={qrValue}
          size={size}
          level="H"
          bgColor="transparent"
          includeMargin={true}
          imageSettings={logo ? {
            src: logo,
            height: size * 0.2,
            width: size * 0.2,
            excavate: true,
          } : undefined}
        />
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoaderIcon className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      <AnimatePresence>
        {isHovered && !isLoading && value && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center gap-4"
          >
            {onRefresh && (
              <IconButton
                icon={<RefreshIcon size={20} />}
                onClick={onRefresh}
                className="p-3 bg-white rounded-full text-gray-700 hover:text-primary transition-colors shadow-lg active:scale-90 cursor-pointer"
                tooltip={t('common.actions.refresh')}
              />
            )}

            {copyable && (
              <IconButton
                className="p-3 bg-white rounded-full text-gray-700 hover:text-primary transition-colors shadow-lg active:scale-90 cursor-pointer"
                icon={<CopyIcon size={20} />}
                onClick={handleCopy}
                tooltip={t('common.text.copyContent')}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!value && !isLoading && (
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
            {t('common.placeholder.waitLoading')}
          </span>
        </div>
      )}
    </div>
  );
}
