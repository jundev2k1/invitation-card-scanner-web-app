"use client";

import { useEffect, useRef } from "react";

interface QRCodeScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

import { Html5Qrcode } from "html5-qrcode";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LoaderIcon } from "../icons";

export default function QRCodeScanner({ onScanSuccess }: QRCodeScannerProps) {
  const t = useTranslations();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");
    scannerRef.current = html5QrCode;

    const config = { fps: 15, qrbox: { width: 250, height: 250 } };

    html5QrCode.start(
      { facingMode: "environment" },
      config, (text) => {
        onScanSuccess(text);
      },
      () => { }
    ).then(() => setIsActive(true));

    return () => {
      if (html5QrCode.isScanning) {
        html5QrCode.stop().then(() => html5QrCode.clear());
        console.log(1);
      }
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[320px] mx-auto overflow-hidden rounded-2xl border-4 border-slate-900 bg-black shadow-2xl">

      <div id="qr-reader" className="w-full h-full [&>video]:object-cover" />

      <div className="scanner-ui-overlay">

        <div className="qr-scanner-shroud" />

        {isActive && <div className="laser-line" />}

        <div className="absolute top-[15%] left-[15%] w-8 h-8 border-l-4 border-t-4 border-primary rounded-tl-lg z-70" />
        <div className="absolute top-[15%] right-[15%] w-8 h-8 border-r-4 border-t-4 border-primary rounded-tr-lg z-70" />
        <div className="absolute bottom-[15%] left-[15%] w-8 h-8 border-l-4 border-b-4 border-primary rounded-bl-lg z-70" />
        <div className="absolute bottom-[15%] right-[15%] w-8 h-8 border-r-4 border-b-4 border-primary rounded-br-lg z-70" />
      </div>

      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-100">
          <div className="flex flex-col items-center gap-2">
            <LoaderIcon className="w-8 h-8 border-4 light:border-gray-400 dark:border-primary border-t-transparent! rounded-full animate-spin" />
            <p className="text-xs text-slate-400">{t('common.scanner.placeholder.cameraLoading')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
