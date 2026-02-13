import { Toast } from "@/app/components";
import { phoneNumberRegex } from "@/lib/validation";
import { userService } from "@/services";
import { UpdateUserRequest } from "@/services/user/user.type";
import { Sex, UserDetailDto } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
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
    .max(20, { message: "Phone number must be at most 20 characters long" })
    .regex(phoneNumberRegex, "Invalid phone number"),
  sex: z.enum([Sex.MALE, Sex.FEMALE, Sex.OTHER]),
  bio: z.string(),
});

export const sexOptions = [
  { value: Sex.MALE, label: "Male" },
  { value: Sex.FEMALE, label: "Female" },
  { value: Sex.OTHER, label: "Other" },
];

export const useUserEditForm = (userDetail: UserDetailDto, onPageRefresh: () => void) => {
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
      Toast.showSuccess("Update user successfully.");
      onPageRefresh();
    } catch (err) {
      console.error(err);
    }
  }

  return {
    form,
    userDetail,
    handleSubmit,
  };
}
