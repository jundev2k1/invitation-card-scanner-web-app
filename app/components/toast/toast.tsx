import { toast } from 'sonner';
export { Toaster } from '@/components/ui/sonner';

type ToastPosition = 'top-center' | 'top-left' | 'top-right'
  | 'bottom-center' | 'bottom-left' | 'bottom-right';

export const showSuccess = (message: string, position: ToastPosition = 'top-center') => toast.success(message, { position });
export const showError = (message: string, position: ToastPosition = 'top-center') => toast.error(message, { position });
export const showWarning = (message: string, position: ToastPosition = 'top-center') => toast.warning(message, { position });
export const showInfo = (message: string, position: ToastPosition = 'top-center') => toast.info(message, { position });
