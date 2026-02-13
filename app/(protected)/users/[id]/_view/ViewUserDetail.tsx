'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, RoleBadge, Separator, SexBadge, UserStatusBadge } from "@/app/components";
import { CalendarClockIcon, MailIcon, PhoneIcon, UserIcon } from "@/app/components/icons";
import { userMapper } from "@/app/utils/mappers";
import { formatDate } from "@/lib/datetime/date.util";
import { UserDetailDto } from "@/types";
import { AvatarUpload } from "../_shared";

type UserViewFormProps = {
  userDetail: UserDetailDto,
  onPageRefresh?: () => void
}

export const UserViewForm = ({ userDetail: data }: UserViewFormProps) => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="text-center pb-2">
          <div className="p-2">
            <AvatarUpload
              id={data.id}
              placeholder={data.nickName || data.username}
              avatarUrl={data.avatarUrl} />
          </div>
          <CardTitle className="mt-4 text-2xl">{data.nickName || data.username}</CardTitle>
          <CardDescription className="text-base">
            <p>@{data.username}</p>
            <div className="flex justify-center gap-3 mt-2">
              <UserStatusBadge status={data.status} />
              <RoleBadge role={data.role} />
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <UserIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="font-medium">{data.id}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <UserIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Gender:</p>
                <p className="font-medium">{userMapper.getUserSex(data.sex)} <SexBadge sex={data.sex} /></p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MailIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{data.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <PhoneIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone number</p>
                <p className="font-medium">{data.phoneNumber || "-"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarClockIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Created at:</p>
                <p className="font-medium">{formatDate(data.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarClockIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Last updated at:</p>
                <p className="font-medium">{formatDate(data.updatedAt)}</p>
              </div>
            </div>
          </div>

          {data.bio && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Biography</h4>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {data.bio}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
