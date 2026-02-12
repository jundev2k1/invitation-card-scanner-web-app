import { UserDetailDto } from "@/types";

export const UserViewForm = ({ userDetail }: { userDetail: UserDetailDto }) => {
  return <div>{userDetail.id} View Form</div>
};
