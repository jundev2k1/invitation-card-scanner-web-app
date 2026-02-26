import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EventCardStatusBadge,
  IconButton,
  Separator,
  Skeleton,
  SkeletonListItem,
  SmartDateTime,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TruncatedText,
} from "@/app/components";
import {
  CalendarClockIcon,
  CheckCheckIcon,
  ClockIcon,
  EyeIcon,
  EyeOffIcon,
  IdCardIcon,
  InfoIcon,
  MailIcon,
  NotebookPenIcon,
  PhoneIcon,
  ScanQrCodeIcon,
  UserIcon,
  UserRoundCheckIcon,
} from "@/app/components/icons";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/datetime/date.util";
import { useTranslations } from "next-intl";
import { useEventInformation } from "./useEventInformation";

type EventInformationProps = {
  token: string,
  onReset: () => void
}

export const EventInformation = ({ token, onReset }: EventInformationProps) => {
  const t = useTranslations();
  const {
    data,
    isLoading,
    showInfoId,
    onOpenInfo,
    onCloseInfo,
    hoverInfoId,
    onHoverInfo,
    onHoverOutInfo,
  } = useEventInformation({ token, onReset });

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-start justify-between">
            <h3>{t("event.cardList.detail.title")}</h3>
            {data?.isUsed ? (
              <span className="flex flex-col items-end gap-1">
                <Badge variant="default">{t("event.enum.isScanned.YES")}</Badge>
                {data.firstScannedAt && (
                  <SmartDateTime className="text-xs text-right" date={data.firstScannedAt} />
                )}
              </span>
            ) : (
              <Badge variant="destructive">{t("event.enum.isScanned.NO")}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end">
            <IconButton
              icon={<ScanQrCodeIcon size={16} />}
              variant="outline"
              size="sm"
              onClick={onReset}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div className="flex flex-col gap-1">
              <p className="flex items-center gap-2 text-muted-foreground text-sm">
                <CalendarClockIcon size={16} />
                {t('event.cardList.detail.fields.eventId')}
              </p>
              <p className="text-foreground font-bold w-full">
                {data ? (
                  <TruncatedText maxWidth="max-w-[200px]" text={data?.eventId} showCopy isUUID />
                ) : (
                  <SkeletonListItem />
                )}
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
            <div className="flex flex-col gap-1 text-sm">
              <p className="flex items-center gap-2 text-muted-foreground">
                <IdCardIcon size={16} />
                {t('event.cardList.detail.fields.id')}
              </p>
              <p className="text-foreground font-bold w-full">
                {data ? (
                  <TruncatedText maxWidth="max-w-[200px]" text={data.eventId} showCopy isUUID />
                ) : (
                  <Skeleton className="h-4 w-3/4" />
                )}
              </p>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <p className="flex items-center gap-2 text-muted-foreground">
                <UserIcon size={16} />
                {t('event.cardList.detail.fields.guestName')}
              </p>
              <p className="text-foreground font-bold">
                {data ? (
                  <TruncatedText maxWidth="max-w-[200px]" text={data.guestName} />
                ) : (
                  <Skeleton className="h-4 w-3/4" />)}
              </p>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <p className="flex items-center gap-2 text-muted-foreground">
                <InfoIcon size={16} />
                {t('event.cardList.detail.fields.status')}
              </p>
              <p className="text-foreground font-bold">
                {data?.status ? (
                  <EventCardStatusBadge status={data?.status} />
                ) : (
                  <Skeleton className="h-4 w-3/4" />
                )}
              </p>
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <p className="flex items-center gap-2 text-muted-foreground">
                <ScanQrCodeIcon size={16} />
                {t('event.cardList.detail.fields.firstScannedAt')}
              </p>
              <p className="text-foreground font-bold">
                {data?.firstScannedAt ? (
                  formatDateTime(data.firstScannedAt)
                ) : (
                  <span className="text-gray-400 text-sm font-light italic">
                    ({t('event.cardList.detail.placeholder.notScanned')})
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <p className="flex items-center gap-2 text-muted-foreground">
              <NotebookPenIcon size={16} />
              {t('event.cardList.detail.fields.notes')}
            </p>
            <div className="py-4 px-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 rounded">
              <p className="text-muted-foreground text-xs italic">
                {data?.notes || `(${t('event.cardList.detail.placeholder.noNotes')})`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('event.cardList.detail.table.title')}</CardTitle>
        </CardHeader>
        <CardContent>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('event.cardList.detail.table.columns.information')}</TableHead>
                <TableHead>{t('event.cardList.detail.table.columns.notes')}</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading || !data ? (
                <TableRow>
                  <TableCell colSpan={2} className="h-8 text-center font-medium dark:text-muted-foreground">
                    <SkeletonListItem />
                  </TableCell>
                </TableRow>
              ) : (
                data.scannedLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} className="h-8 text-center font-medium dark:text-muted-foreground">
                      {t('event.cardList.detail.placeholder.noHistory')}
                    </TableCell>
                  </TableRow>
                ) : (
                  data.scannedLogs.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell width="50%"
                        onMouseOver={() => onHoverInfo(item.id)}
                        onMouseOut={onHoverOutInfo}
                      >
                        <div className="flex items-center justify-start gap-2">
                          <span className="flex items-center gap-1 dark:text-muted-foreground">
                            <UserRoundCheckIcon size={14} />
                            {t('event.cardList.detail.table.content.scannedByName')}:
                          </span>

                          <span className="font-medium dark:text-foreground">
                            {item.scannedBy.nickname}
                          </span>

                          {(hoverInfoId === item.id || showInfoId === item.id) && (
                            <IconButton
                              className="dark:text-muted-foreground"
                              icon={showInfoId ? <EyeOffIcon size={14} /> : <EyeIcon size={14} />}
                              onClick={() => !showInfoId ? onOpenInfo(item.id) : onCloseInfo()}
                              size="xs"
                            />
                          )}
                        </div>

                        {showInfoId === item.id && (
                          <div className="flex items-center gap-2 pl-4 my-2">
                            <Avatar>
                              <AvatarImage
                                src={item.scannedBy.avatarUrl}
                                className="grayscale"
                              />
                              <AvatarFallback>{item.scannedBy.nickname.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col ">
                              <p className="flex items-center text-xs gap-1 dark:text-muted-foreground">
                                <MailIcon size={10} />
                                {item.scannedBy.email}
                              </p>
                              <p className="flex items-center text-xs gap-1 dark:text-muted-foreground">
                                <PhoneIcon size={10} />
                                {item.scannedBy.phoneNumber}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <span className="flex items-center gap-1 dark:text-muted-foreground">
                            <ClockIcon size={14} />
                            {t('event.cardList.detail.table.content.scannedAt')}:
                          </span>

                          {item.scannedAt && <SmartDateTime date={item.scannedAt} />}
                        </div>
                      </TableCell>
                      <TableCell width="50%" className="font-medium dark:text-muted-foreground">
                        <TruncatedText text={item.notes} />
                      </TableCell>
                    </TableRow>
                  ))
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-2">
        <Button
          leftIcon={<CheckCheckIcon size={16} />}
          size="sm"
          onClick={() => { }}
        >
          {t('event.scanner.actions.approve')}
        </Button>

        <Button
          className="dark:text-muted-foreground"
          leftIcon={<ScanQrCodeIcon size={16} />}
          variant="outline"
          size="sm"
          onClick={onReset}
        >
          {t('event.scanner.actions.reScan')}
        </Button>

      </div>
    </div>
  );
};
