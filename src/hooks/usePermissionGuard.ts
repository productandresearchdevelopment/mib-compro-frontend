"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePermissionStore } from "@/store/permissionStore";

export function usePermissionGuard() {
  const pathname = usePathname();
  const router = useRouter();
  const { allowedPaths, allModulePaths } = usePermissionStore();

  useEffect(() => {
    if (!pathname) return;

    if (allModulePaths.length === 0 || allowedPaths.length === 0) return;

    const matchedBase = allModulePaths.find((base) =>
      pathname.startsWith(base)
    );

    if (!matchedBase) {
      router.replace("/404");
      return;
    }

    const isAllowed = allowedPaths.some((allowed) =>
      pathname.startsWith(allowed)
    );

    if (!isAllowed) {
      router.replace("/forbidden");
      return;
    }
  }, [allowedPaths, allModulePaths, pathname, router]);
}
