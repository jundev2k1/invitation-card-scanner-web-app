import { Toast } from "@/components";
import { phoneNumberRegex } from "@/lib/validation";
import { UpdateUserRequest, userService } from "@/services";
import { PageAction, Sex, UserDetailDto } from "@/types";
import { getSexOptions } from "@/users/_shared/options";
import { RouteUtil } from "@/utils/route";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const userEditSchema = z.object({
  email: z.string()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters long" })
    .max(30, { message: "Email must be at most 30 characters long" }),
  nickName: z.string().min(3, { message: "Nickname must be at least 3 characters long" }).max(30, { message: "Nickname must be at most 30 characters long" }),
  phoneNumber: z.string()
    .min(3, { message: "Phone number must be at least 3 characters long" })
    .max(15, { message: "Phone number must be at most 15 characters long" })
    .regex(phoneNumberRegex, "Invalid phone number"),
  sex: z.enum([Sex.MALE, Sex.FEMALE, Sex.OTHER]),
  bio: z.string(),
});

export const useUserEditForm = (userDetail: UserDetailDto, onPageRefresh: () => void) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const sexOptions = getSexOptions(t);

  const form = useForm<UpdateUserRequest>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      nickName: userDetail.nickName || "",
      email: userDetail.email,
      phoneNumber: userDetail.phoneNumber || "",
      sex: userDetail.sex || Sex.MALE,
      bio: userDetail.bio || "",
    },
  });

  const handleSubmit = async (data: UpdateUserRequest) => {
    try {
      await userService.updateUser(userDetail.id, data);
      Toast.showSuccess(t("common.messages.updateSuccess"));
      onPageRefresh();
    } catch (err) {
      console.error(err);
    }
  }

  const redirectToDetail = useCallback(() => {
    router.push(RouteUtil.getUserDetailUrl(locale, userDetail.id, PageAction.VIEW))
  }, [locale]);

  return {
    form,
    sexOptions,
    handleSubmit,
    redirectToDetail,
  };
}
