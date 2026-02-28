"use client";
import {
  Button,
  IconButton,
  SmartDateTime,
  TextArea
} from "@/components";
import { PencilLineIcon } from "@/icons";
import { useTranslations } from "next-intl";
import React from "react";
import { useUpdateMember } from "./useUpdateMember";

type UpdateMemberProps = {
  eventId: string,
  memberId: string,
  assignedRole: string,
  assignedAt: Date,
};

export const UpdateMember = React.memo(({
  eventId,
  memberId,
  assignedRole,
  assignedAt,
}: UpdateMemberProps) => {
  const t = useTranslations();
  const {
    value,
    setValue,
    visible,
    setVisible,
    editMode,
    onOpen,
    onSubmit,
    onCancel,
  } = useUpdateMember(eventId, memberId, assignedRole);
  return (
    !editMode ? (
      <div className="flex flex-col gap-2">
        <div
          className="flex items-center gap-2"
          onMouseOver={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          <p className="italic">
            {value}
          </p>
          {visible && (
            <IconButton
              size="xs"
              variant="link"
              icon={<PencilLineIcon />}
              onClick={onOpen}
            />
          )}
        </div>
        <SmartDateTime date={assignedAt} />
      </div>
    ) : (
      <div className="flex flex-col gap-1 w-full">
        <TextArea className="w-full" onChange={(e) => setValue(e.currentTarget.value)}>
          {value}
        </TextArea>
        <div className="flex justify-end gap-1">
          <Button onClick={onCancel} variant="secondary">
            {t("common.actions.cancel")}
          </Button>
          <Button onClick={onSubmit}>
            {t("common.actions.save")}
          </Button>
        </div>
      </div>
    )
  );
});
