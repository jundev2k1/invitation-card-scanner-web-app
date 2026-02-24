import { eventMapper } from "@/app/utils/mappers";
import { Badge } from "@/components/ui/badge";
import { EventStatus } from "@/types";
import { useTranslations } from "next-intl";

type EventStatusBadgeProps = {
  status: EventStatus
}

export const EventStatusBadge = ({ status }: EventStatusBadgeProps) => {
  const t = useTranslations();
  return (
    <Badge className={eventMapper.getEventStatusColor(status)}>
      {t(`event.enum.status.${status || "-"}`)}
    </Badge>
  );
}
