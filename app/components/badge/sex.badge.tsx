import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Sex } from "@/types";
import { FemaleIcon, MaleIcon, OtherIcon } from "../icons";

type SexBadgeProps = {
  sex: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}
export const SexBadge = ({
  sex,
  className,
  variant = "default",
}: SexBadgeProps) => {
  const sexColors = {
    [Sex.MALE]: "bg-blue-500 text-white dark:bg-blue-600 dark:text-white",
    [Sex.FEMALE]: "bg-pink-500 text-white dark:bg-pink-600 dark:text-white",
    [Sex.OTHER]: "bg-gray-500 text-white dark:bg-gray-600 dark:text-white",
  }
  const sexes = {
    [Sex.MALE]: <MaleIcon />,
    [Sex.FEMALE]: <FemaleIcon />,
    [Sex.OTHER]: <OtherIcon />,
  };
  return (
    <Badge className={cn(sexColors[sex as Sex], className)} variant={variant}>
      {sexes[sex as Sex]}
    </Badge>
  );
};
