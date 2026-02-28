import { MailIcon, UsersIcon } from "@/icons";
import { Badge, CardContent, CardDescription, CardHeader, TabItem } from "@/root/app/components";
import { TranslateFn } from "@/root/i18n/type";
import { EventDetailDto } from "@/root/types";
import { useTranslations } from "next-intl";
import { CardList } from "../_card/_list/CardList";
import { MemberList } from "../_member/_list/MemberList";

export enum TabNames {
  CARD_LIST = "CARD_LIST",
  MEMBER_LIST = "MEMBER_LIST",
}

const getTabContents = (
  t: TranslateFn,
  data: EventDetailDto,
  cardCount: number,
  memberCount: number
): TabItem[] => {
  return [
    {
      label: (
        <div className="flex items-center gap-2">
          <MailIcon />
          <span>
            {t('event.cardList.title')}
          </span>
          <Badge className="text-xs">{cardCount}</Badge>
        </div >
      ),
      value: TabNames.CARD_LIST,
      content: (
        <>
          <CardHeader className="p-0">
            <CardDescription>{t('event.cardList.desc')}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <CardList key={data.id} eventId={data.id} />
          </CardContent>
        </>
      ),
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <UsersIcon />
          <span>
            {t('event.memberList.title')}
          </span>
          <Badge className="text-xs">{memberCount}</Badge>
        </div>
      ),
      value: TabNames.MEMBER_LIST,
      content: (
        <>
          <CardHeader className="p-0">
            <CardDescription>{t('event.memberList.desc')}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <MemberList key={data.id} eventId={data.id} />
          </CardContent>
        </>
      ),
    }
  ];
};

type ViewEventDetailProps = {
  detail: EventDetailDto;
};

export const useViewEventDetail = ({ detail }: ViewEventDetailProps) => {
  const t = useTranslations();
  const statistics = {
    totalCards: 100,
    scannedCount: 83,
    totalMembers: 6,
  };
  const tabOptions = getTabContents(t, detail, statistics.totalCards, statistics.totalMembers);
  return {
    tabOptions,
    statistics,
  };
};
