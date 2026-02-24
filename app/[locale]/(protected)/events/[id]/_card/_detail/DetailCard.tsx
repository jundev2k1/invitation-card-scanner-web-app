"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Separator,
  SmartDateTime,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TruncatedText
} from "@/app/components";
import { ClockIcon, NotebookPenIcon, UserIcon, UserRoundCheckIcon } from "@/app/components/icons";
import { useTranslations } from "next-intl";
import React from "react";
import { useEventCardDetail } from "./useDetailCard";

type Props = {
  isOpen: boolean;
  onClose: () => void;
}
export const EventCardDetail = React.memo(({ isOpen, onClose }: Props) => {
  const t = useTranslations();
  const { data } = useEventCardDetail();
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
            <div className="flex gap-4">
              <p className="flex items-center gap-2 text-muted-foreground">
                <UserIcon size={16} />
                {t('event.cardList.detail.fields.guestName')}
              </p>
              <p className="text-foreground font-bold">Mock guest name</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2 text-muted-foreground text-bold">
                <NotebookPenIcon size={16} />
                {t('event.cardList.detail.fields.notes')}
              </p>
              <div className="py-4 px-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 rounded">
                <p className="text-muted-foreground text-sm italic">Mock notes</p>
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
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell width="40%">
                      <div className="flex gap-2">
                        <span className="flex items-center gap-1 dark:text-muted-foreground">
                          <UserRoundCheckIcon size={14} />
                          {t('event.cardList.detail.table.content.scannedByName')}:
                        </span>

                        <span className="font-medium dark:text-foreground">
                          {item.scannedByName}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <span className="flex items-center gap-1 dark:text-muted-foreground">
                          <ClockIcon size={14} />
                          {t('event.cardList.detail.table.content.scannedAt')}:
                        </span>

                        <SmartDateTime date={item.scanAt} />
                      </div>
                    </TableCell>
                    <TableCell width="60%" className="font-medium dark:text-muted-foreground">
                      <TruncatedText text={item.notes} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});
