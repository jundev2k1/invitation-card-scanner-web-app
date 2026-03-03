import { PermissionManager } from "./PermissionManager";

interface RoleDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function RoleDetail({ params }: RoleDetailPageProps) {
  const { id } = await params;
  return <PermissionManager roleId={id} />;
}