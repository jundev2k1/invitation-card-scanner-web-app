'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CounterUp,
  EventStatusBadge,
  MapCard,
  Separator
} from "@/components";
import { CalendarClockIcon, ClockIcon, MailIcon, MapPinHouseIcon, ScanQrCodeIcon, UsersIcon } from "@/icons";
import { formatDateTime } from "@/lib/datetime/date.util";
import { EventDetailDto } from "@/types";
import { useTranslations } from "next-intl";
import { CardList } from "../_card/_list/CardList";

type EventViewFormProps = {
  eventDetail: EventDetailDto,
  onPageRefresh?: () => void
}

export const EventViewForm = ({ eventDetail: data }: EventViewFormProps) => {
  const t = useTranslations();
  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">

        {data.thumbnailUrl && (
          <div className="relative h-48 md:h-64 w-full">
            <img
              src={data.thumbnailUrl}
              alt={data.title}
              className="object-cover w-full h-full brightness-90"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                {data.title}
              </h2>
            </div>
          </div>
        )}

        <CardHeader className={data.thumbnailUrl ? "pt-6" : ""}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight">
              {data.title}
            </CardTitle>
            <EventStatusBadge status={data.status} />
          </div>
          <p className="text-muted-foreground mt-2">{data.description}</p>
        </CardHeader>

        <CardContent className="space-y-8 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">{t('event.detail.fields.id')}</p>
              <p className="font-mono text-sm">{data.id}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">{t('event.detail.fields.category')}</p>
              <p className="font-medium">{data.categoryId ?? "-"}</p>
            </div>
          </div>

          {data.settings && (
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">{t('event.detail.fields.settings')}</p>
              <pre className="text-xs bg-muted p-3 rounded-md overflow-auto mt-1">
                {JSON.stringify(data.settings, null, 2)}
              </pre>
            </div>
          )}

          <Separator className="my-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <CalendarClockIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {t('event.detail.fields.time')}
                </p>

                <p className="font-medium">
                  {data.startAt ? formatDateTime(data.startAt) : '-'}
                </p>
                <p className="font-light">{t('common.text.toLower')}</p>
                <p className="font-medium">
                  {data.endAt ? formatDateTime(data.endAt) : '-'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPinHouseIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {t('event.detail.fields.address')}
                </p>

                <p className="font-medium">{data.locationName}</p>
                <p className="text-sm text-muted-foreground">{data.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ClockIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {t('event.detail.fields.dateInfo')}
                </p>

                <p className="text-sm text-muted-foreground">
                  {t('event.detail.fields.createdAt')}:
                  <span className="text-foreground font-bold ml-2">{formatDateTime(data.createdAt)}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('event.detail.fields.updatedAt')}:
                  <span className="text-foreground font-bold ml-2">{formatDateTime(data.updatedAt)}</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MailIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {t('event.detail.fields.cardCount')}
                </p>

                <p className="text-xl font-bold text-center text-foreground">
                  <CounterUp value={20} duration={3} />
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ScanQrCodeIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {t('event.detail.fields.scannedCount')}
                </p>

                <p className="text-xl font-bold text-center text-foreground">
                  <CounterUp value={12} duration={3} />
                  /
                  <CounterUp value={20} duration={3} />
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <UsersIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {t('event.detail.fields.memberCount')}
                </p>

                <p className="text-xl font-bold text-center text-foreground">
                  <CounterUp value={4} duration={3} />
                </p>
              </div>
            </div>
          </div>

          {data.mapUrl && (
            <>
              <Separator className="my-8" />
              <div className="md:col-span-2">
                <MapCard mapUrl={data.mapUrl} />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('event.cardList.title')}</CardTitle>
          <CardDescription>{t('event.cardList.desc')}</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <CardList key={data.id} eventId={data.id} />
        </CardContent>
      </Card>
    </div>
  );
}
