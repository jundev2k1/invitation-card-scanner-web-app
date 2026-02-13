import { userMapper } from "@/app/utils/mappers";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Sex } from "@/types";
import { FemaleIcon, MaleIcon, OtherIcon } from "../icons";

type SexBadgeProps = {
  sex: Sex;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}
export const SexBadge = ({
  sex,
  className,
  variant = "default",
}: SexBadgeProps) => {
  const sexes = {
    [Sex.MALE]: <MaleIcon />,
    [Sex.FEMALE]: <FemaleIcon />,
    [Sex.OTHER]: <OtherIcon />,
  };
  return (
    <Badge className={cn(userMapper.getSexColors(sex), className)} variant={variant}>
      {sexes[sex as Sex]}
    </Badge>
  );
};
