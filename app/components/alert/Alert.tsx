import { AlertDescription, AlertTitle, Alert as AlertWapper } from "@/components/ui/alert";
import { InfoIcon } from "../icons";

type AlertProps = {
  icon?: React.ReactNode;
  variant: "default" | "destructive";
  title: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
};

export function Alert({ icon, variant, title, children, className, containerClassName }: AlertProps) {
  return (
    <AlertWapper variant={variant} className={containerClassName}>
      {icon ? icon : <InfoIcon />}

      <AlertTitle>
        {title}
      </AlertTitle>

      <AlertDescription className={className}>
        {children}
      </AlertDescription>
    </AlertWapper>
  );
}
