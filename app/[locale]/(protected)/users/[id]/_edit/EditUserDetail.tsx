'use client';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormRadioGroup,
  FormTextArea,
  FormTextBox,
  RoleBadge,
  Separator,
  UserStatusBadge,
} from "@/components";
import { SaveIcon, XIcon } from "@/icons";
import { UserDetailDto } from "@/types";
import { useTranslations } from "next-intl";
import { FormProvider } from "react-hook-form";
import { AvatarUpload } from "../_shared";
import { useUserEditForm } from "./useEditUserDetail";

type UserEditFormProps = {
  userDetail: UserDetailDto;
  onPageRefresh: () => void;
};

export const UserEditForm = ({ userDetail, onPageRefresh }: UserEditFormProps) => {
  const t = useTranslations();
  const {
    form,
    sexOptions,
    handleSubmit,
    redirectToDetail
  } = useUserEditForm(userDetail, onPageRefresh);
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card className="col-span-3">
          <CardHeader className="text-center pb-2">
            <div className="p-2">
              <AvatarUpload
                id={userDetail.id}
                placeholder={userDetail.nickName || userDetail.username}
                avatarUrl={userDetail.avatarUrl} />
            </div>
            <CardTitle className="mt-4 text-2xl">{userDetail.nickName || userDetail.username}</CardTitle>
            <CardDescription className="text-base">
              <p>@{userDetail.username}</p>
              <div className="flex justify-center gap-3 mt-2">
                <UserStatusBadge status={userDetail.status} />
                <RoleBadge role={userDetail.role} />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormTextBox name="nickName" label={t('user.detail.fields.nickname')} className="w-full" />
              <FormTextBox name="email" label={t('user.detail.fields.email')} className="w-full" />
              <FormTextBox name="phoneNumber" label={t('user.detail.fields.phoneNumber')} className="w-full" />
              <FormRadioGroup name="sex" label={t('user.detail.fields.gender')} className="w-full" options={sexOptions} />
              <div className="col-span-2">
                <Separator className="my-4" />
                <FormTextArea name="bio" label={t('user.detail.fields.bio')} className="col-span-2 w-full" />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                leftIcon={<XIcon />}
                variant="outline"
                onClick={redirectToDetail}
              >
                {t('common.actions.cancel')}
              </Button>
              <Button
                type="submit"
                leftIcon={<SaveIcon />}
                disabled={form.formState.isSubmitting}
              >
                {t('common.actions.save')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </FormProvider >
  );
};
