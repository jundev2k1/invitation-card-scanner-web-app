import { cn } from "@/root/lib/utils";
import { LoaderIcon } from "../icons";

type LoaderProps = {
  size?: 'sm' | 'lg';
  containerClassName?: string;
  className?: string;
}

export const Loader = ({ className, containerClassName, size ="sm" }: LoaderProps) => {
  return (
    <div className={cn("flex items-center justify-center", containerClassName)}>
      <LoaderIcon className={
        cn(
          "animate-spin text-muted-foreground p-1",
          size === "lg" ? "w-12 h-12" : "w-8 h-8",
          className
        )}
      />
    </div>
  );
};
