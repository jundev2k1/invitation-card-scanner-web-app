import { useCallback, useState } from "react";

export const useEventScanner = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  const onOpen = useCallback(() => { setIsOpen(true); }, [isOpen]);
  const onClose = useCallback(() => {
    setIsOpen(false);
    setResult("");
  }, [isOpen]);

  const onScan = useCallback((result: string) => {
    setResult(result);
  }, []);
  const onReset = useCallback(() => {
    setResult("");
  }, []);

  return {
    isOpen,
    onOpen,
    onClose,
    result,
    onScan,
    onReset,
  };
};
