"use client";
import { LoaderIcon } from "@/icons";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface QRCodeScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

const SCANNER_CONSTRAINTS = {
  facingMode: "environment",
} as const;

const SCAN_DELAY_MS = 300;

export default function QRCodeScanner({ onScanSuccess, onScanError }: QRCodeScannerProps) {
  const t = useTranslations();

  const [isActive, setIsActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[320px] mx-auto overflow-hidden rounded-2xl border-4 border-slate-900 bg-black shadow-2xl">
      {/* Main Scanner component */}
      <Scanner
        // Camera constraints
        constraints={SCANNER_CONSTRAINTS}
        // Delay between detection attempts
        scanDelay={SCAN_DELAY_MS}
        // Allow scanning multiple codes continuously
        allowMultiple={true}
        // Paused state (can toggle to stop scanning temporarily)
        paused={paused}
        // Called when a code is successfully detected
        onScan={(result) => {
          console.log(result);
          if (result && result.length > 0) {
            onScanSuccess(result[0].rawValue);
            setIsActive(true);
            setPaused(true);
          }
        }}

        // Error handler
        onError={(err: any) => {
          const msg = err?.message || "Failed to access camera or detect QR";
          console.error("Scanner error:", msg);
          setErrorMsg(msg);
          onScanError?.(msg);
        }}

        // Optional: Show torch (flash) button if device supports
        components={{
          torch: true, // Enable flash toggle
          zoom: true, // If you want zoom controls
          // finder: false, // Disable default overlay if you want custom only
        }}
      />

      {/* Custom overlay UI - fully covers the scanner */}
      <div className="scanner-ui-overlay pointer-events-none absolute inset-0">
        <div className="qr-scanner-shroud" /> {/* Dark shroud with cutout */}

        {/* Laser line animation when active */}
        {isActive && !paused && <div className="laser-line" />}

        {/* Corner brackets */}
        <div className="absolute top-[15%] left-[15%] w-8 h-8 border-l-4 border-t-4 border-primary rounded-tl-lg z-70" />
        <div className="absolute top-[15%] right-[15%] w-8 h-8 border-r-4 border-t-4 border-primary rounded-tr-lg z-70" />
        <div className="absolute bottom-[15%] left-[15%] w-8 h-8 border-l-4 border-b-4 border-primary rounded-bl-lg z-70" />
        <div className="absolute bottom-[15%] right-[15%] w-8 h-8 border-r-4 border-b-4 border-primary rounded-br-lg z-70" />
      </div>

      {/* Loading overlay - shown until scanner is ready */}
      {!isActive && !errorMsg && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-100">
          <div className="flex flex-col items-center gap-2">
            <LoaderIcon className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-400">
              {t("common.scanner.placeholder.cameraLoading")}
            </p>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {errorMsg && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/80 z-100 text-white text-center p-6">
          <p className="text-sm">{errorMsg}</p>
        </div>
      )}
    </div>
  );
}
