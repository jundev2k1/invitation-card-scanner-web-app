import { toast } from 'sonner';
export { Toaster } from '@/components/ui/sonner';

export const showSuccess = (message: string) => toast.success(message, { position: 'top-center' });
export const showError = (message: string) => toast.error(message, { position: 'top-center' });
export const showWarning = (message: string) => toast.warning(message, { position: 'top-center' });
export const showInfo = (message: string) => toast.info(message, { position: 'top-center' });
