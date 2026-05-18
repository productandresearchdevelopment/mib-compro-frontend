import { useUserMe } from "@/store/api/auth";
import { useCheckRoleModules } from "@/store/api/role/module";

type RoleName = "superadmin" | "developer" | "administrator" | string;

export function useAuthUser() {
  const { data: user, isLoading, error } = useUserMe();

  const roleName: RoleName | undefined = user?.role?.name?.toLowerCase();
  const roleId = user?.role?.id;

  const isSuperAdmin = roleName === "superadmin";
  const isDeveloper = roleName === "developer";
  const isPrivileged = isSuperAdmin || isDeveloper;

  return {
    user,
    roleId,
    roleName,
    isLoading,
    error,

    isSuperAdmin,
    isDeveloper,
    isPrivileged,
  };
}

export function useCanModules(moduleNames: string[]) {
  const { roleId } = useAuthUser();

  const query = useCheckRoleModules(roleId ?? "", moduleNames);
  return {
    haveRoute: (name: string) => {
      return query.data?.[name] ?? false;
    },
    isLoadingHaveRoute: query.isLoading,
  };
}
