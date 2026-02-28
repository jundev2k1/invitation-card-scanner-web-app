import { Badge } from "@/shadcn/badge";
import { EventStatus } from "@/types";
import { eventMapper } from "@/utils/mappers";
import { useTranslations } from "next-intl";

type EventStatusBadgeProps = {
  status: EventStatus
}

export const EventStatusBadge = ({ status }: EventStatusBadgeProps) => {
  const t = useTranslations();
  return (
    <Badge className={eventMapper.getEventStatusColor(status)}>
      {status ? t(eventMapper.getEventStatusTransKey(status)) : "-"}
    </Badge>
  );
}
