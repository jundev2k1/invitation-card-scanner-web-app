import { Badge } from "@/shadcn/badge";
import { EventCardStatus } from "@/types";
import { eventCardMapper } from "@/utils/mappers";
import { useTranslations } from "next-intl";

type EventCardStatusBadgeProps = {
  status: EventCardStatus
}

export const EventCardStatusBadge = ({ status }: EventCardStatusBadgeProps) => {
  const t = useTranslations();
  return (
    <Badge className={eventCardMapper.getEventCardStatusColor(status)}>
      {status ? t(eventCardMapper.getEventCardStatusTransKey(status)) : "-"}
    </Badge>
  );
}
