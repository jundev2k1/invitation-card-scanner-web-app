"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  EventCardStatusBadge,
  IconButton,
  Separator,
  SkeletonListItem,
  SmartDateTime,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TruncatedText
} from "@/app/components";
import {
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
import QRCodeGenerator from "@/app/components/qr/QRCodeGenerator";
import { formatDateTime } from "@/lib/datetime/date.util";
import { useTranslations } from "next-intl";
import React from "react";
import { useEventCardDetail } from "./useDetailCard";

type Props = {
  eventId: string,
  cardId: string,
  isOpen: boolean,
  onClose: () => void,
}
export const EventCardDetail = React.memo(({ eventId, cardId, isOpen, onClose }: Props) => {
  const t = useTranslations();
  const {
    isLoading,
    data,
    showInfoId,
    onOpenInfo,
    onCloseInfo,
    hoverInfoId,
    onHoverInfo,
    onHoverOutInfo,
    createQrCodeContent,
  } = useEventCardDetail({ eventId, cardId });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl h-[90vh] p-0 flex flex-col" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader className="shrink-0 px-6 pt-6 pb-4 border-b text-foreground">
          <DialogTitle className="text-xl font-semibold text-accent-foreground">
            {t("event.cardList.detail.title")}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pt-2 pb-6 h-[calc(90vh-140px)] overflow-y-auto">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-2 md:border-r flex flex-col gap-2">
                <div className="flex gap-4">
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <IdCardIcon size={16} />
                    {t('event.cardList.detail.fields.id')}
                  </p>
                  <p className="text-foreground font-bold">
                    {data?.eventId}
                  </p>
                </div>

                <div className="flex gap-4">
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <UserIcon size={16} />
                    {t('event.cardList.detail.fields.guestName')}
                  </p>
                  <p className="text-foreground font-bold">
                    {data?.guestName}
                  </p>
                </div>

                <div className="flex gap-4">
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <InfoIcon size={16} />
                    {t('event.cardList.detail.fields.status')}
                  </p>
                  <p className="text-foreground font-bold">
                    {data?.status && <EventCardStatusBadge status={data?.status} />}
                  </p>
                </div>

                <div className="flex gap-4">
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
              <div className="p-4">
                <QRCodeGenerator
                  className="flex justify-center"
                  value={createQrCodeContent()}
                  size={200}
                  isLoading={isLoading}
                  onRefresh={() => { }}
                  copyable
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2 text-muted-foreground text-bold">
                <NotebookPenIcon size={16} />
                {t('event.cardList.detail.fields.notes')}
              </p>
              <div className="py-4 px-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 rounded">
                <p className="text-muted-foreground text-sm italic">
                  {data?.notes || `(${t('event.cardList.detail.placeholder.noNotes')})`}
                </p>
              </div>
            </div>

            <Separator />

            <h3 className="text-xl font-semibold text-accent-foreground">
              {t('event.cardList.detail.table.title')}
            </h3>

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
                        <TableCell width="40%"
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
                        <TableCell width="60%" className="font-medium dark:text-muted-foreground">
                          <TruncatedText text={item.notes} />
                        </TableCell>
                      </TableRow>
                    ))
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}, (prevProps, nextProps) => prevProps.eventId === nextProps.eventId && prevProps.cardId === nextProps.cardId);
