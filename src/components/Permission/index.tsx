import userStore, { UserDTO } from '@/store/user';

export const checkPermission = (interfaceId: string) => {
  const permissions =
    (userStore.userInfo?.interfaceList as UserDTO[]).map((item) =>
      item?.id?.toString(),
    ) || [];
  return permissions.includes(interfaceId);
};

export default function PermissionWrap({
  interfaceId,
  children,
}: {
  interfaceId: string;
  children: React.ReactNode;
}) {
  const hasPermission = checkPermission(interfaceId);

  return hasPermission ? <>{children}</> : null;
}
