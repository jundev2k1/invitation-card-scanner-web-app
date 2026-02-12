import { UserDetailDto } from "@/types";
import { useUserEditForm } from "./useEditUserDetail";

type UserEditFormProps = {
  userDetail: UserDetailDto;
};

export const UserEditForm = ({ userDetail }: UserEditFormProps) => {
  const { userDetail: sd } = useUserEditForm(userDetail);
  return <div>{sd.id} Edit Form</div>;
};
