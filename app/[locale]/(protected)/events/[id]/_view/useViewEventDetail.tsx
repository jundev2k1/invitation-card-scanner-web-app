import { MailIcon, UsersIcon } from "@/icons";
import { CardContent, CardDescription, CardHeader, TabItem } from "@/root/app/components";
import { TranslateFn } from "@/root/i18n/type";
import { useGetEventStats } from "@/root/services";
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
  data: EventDetailDto
): TabItem[] => {
  return [
    {
      label: (
        <div className="flex items-center gap-2">
          <MailIcon />
          {t('event.cardList.title')}
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
          {t('event.memberList.title')}
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
  const { data, isLoading } = useGetEventStats(detail.id);
  const statistics = data?.data;
  const tabOptions = getTabContents(
    t,
    detail
  );
  return {
    tabOptions,
    statistics,
    isStatsLoading: isLoading,
  };
};
