'use client';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, FormRadioGroup, FormTextArea, FormTextBox, RoleBadge, Separator, UserStatusBadge } from "@/app/components";
import { SaveIcon, XIcon } from "@/app/components/icons";
import { RouteUtil } from "@/app/utils/route";
import { UserDetailDto } from "@/types";
import { FormProvider } from "react-hook-form";
import { AvatarUpload } from "../_shared";
import { sexOptions, useUserEditForm } from "./useEditUserDetail";

type UserEditFormProps = {
  userDetail: UserDetailDto;
  onPageRefresh: () => void;
};

export const UserEditForm = ({ userDetail, onPageRefresh }: UserEditFormProps) => {
  const { form, handleSubmit } = useUserEditForm(userDetail, onPageRefresh);
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
              <FormTextBox name="nickName" label="Nickname" className="w-full" />
              <FormTextBox name="email" label="Email" className="w-full" />
              <FormTextBox name="phoneNumber" label="Phone Number" className="w-full" />
              <FormRadioGroup name="sex" label="Gender" className="w-full" options={sexOptions} />
              <div className="col-span-2">
                <Separator className="my-4" />
                <FormTextArea name="bio" label="Biography" className="col-span-2 w-full" />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                leftIcon={<XIcon />}
                variant="outline"
                onClick={() => RouteUtil.redirectToUserDetail(userDetail.id)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                leftIcon={<SaveIcon />}
                disabled={form.formState.isSubmitting}
              >
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </FormProvider >
  );
};
