import { eventCardMapper } from "@/app/utils/mappers";
import { Badge } from "@/components/ui/badge";
import { EventCardStatus } from "@/types";
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
