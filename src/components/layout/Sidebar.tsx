"use client";

import { useMemo, useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebarStore } from "@/store/sidebarStore";
import { cn } from "@/lib/utils";
import * as Hugeicons from "@hugeicons/core-free-icons";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { useUserMe } from "@/store/api/auth";
import { useFetchRoleModuleMenus } from "@/store/api/role/module";
import { IRoleModule, IModule } from "@/types/model";
import { usePathname, useRouter } from "next/navigation";
import { useUpdateLastModuleAccess } from "@/store/api/user";
import Link from "next/link";
import useWindowSizeAndScroll from "@/hooks/useWindowSizeAndScroll";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Sidebar() {
  const { data: userLogin } = useUserMe();
  const { isSidebarOpen, collapsed, closeSidebar, toggleCollapsed } = useSidebarStore();
  const router = useRouter();
  const pathname = usePathname();
  const { windowSize } = useWindowSizeAndScroll();
  const { mutate: updateLastModuleAccess } = useUpdateLastModuleAccess();

  const hasInitialRedirect = useRef(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const { data: modules, isLoading } = useFetchRoleModuleMenus(
    userLogin?.role_id as string,
  );

  const resolveIcon = (iconName?: string): IconSvgElement => {
    if (!iconName) return Hugeicons.PackageDeliveredIcon;
    if (iconName in Hugeicons) {
      return Hugeicons[iconName as keyof typeof Hugeicons];
    }
    return Hugeicons.PackageDeliveredIcon;
  };

  const toggleExpanded = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRedirect = (path?: string, moduleId?: number) => {
    if (!path) return;
    if (moduleId) {
      updateLastModuleAccess({ module_id: moduleId });
    }
    router.push(path);
    if (windowSize.width < 1024) {
      closeSidebar();
    }
  };

  const isModuleActive = (route?: string) => {
    if (!route || !pathname) return false;
    if (route === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(route);
  };

  const hasActiveChild = (children?: IModule[]) => {
    if (!children || children.length === 0) return false;
    return children.some((child) => isModuleActive(child.route));
  };

  const getAllAccessibleModuleIds = useMemo(() => {
    const moduleIds: number[] = [];

    modules?.forEach((roleModule: IRoleModule) => {
      const parent = roleModule.module;
      if (!parent) return;

      if (parent.route && parent.id) {
        moduleIds.push(parent.id);
      }

      if (parent.children) {
        parent.children.forEach((child) => {
          if (child.route && child.id) {
            moduleIds.push(child.id);
          }
        });
      }
    });

    return moduleIds;
  }, [modules]);

  useEffect(() => {
    if (hasInitialRedirect.current || !modules?.length) return;

    const accessibleModuleIds = getAllAccessibleModuleIds;
    if (accessibleModuleIds.length === 0) return;

    let currentModuleId: number | null = null;
    modules.forEach((roleModule: IRoleModule) => {
      const parent = roleModule.module;
      if (!parent) return;

      if (parent.route && pathname.startsWith(parent.route) && parent.id) {
        currentModuleId = parent.id;
      }

      if (parent.children) {
        parent.children.forEach((child) => {
          if (child.route && pathname.startsWith(child.route) && child.id) {
            currentModuleId = child.id;
          }
        });
      }
    });

    if (currentModuleId) {
      hasInitialRedirect.current = true;
      return;
    }

    const lastModuleId = userLogin?.last_module_id;
    let targetRoute: string | null = null;

    if (lastModuleId && accessibleModuleIds.includes(lastModuleId)) {
      modules.forEach((roleModule: IRoleModule) => {
        const parent = roleModule.module;
        if (!parent) return;

        if (parent.id === lastModuleId && parent.route) {
          targetRoute = parent.route;
        }

        if (parent.children) {
          parent.children.forEach((child) => {
            if (child.id === lastModuleId && child.route) {
              targetRoute = child.route;
            }
          });
        }
      });
    }

    if (!targetRoute && accessibleModuleIds.length > 0) {
      const firstModuleId = accessibleModuleIds[0];

      modules.forEach((roleModule: IRoleModule) => {
        const parent = roleModule.module;
        if (!parent) return;

        if (parent.id === firstModuleId && parent.route) {
          targetRoute = parent.route;
        }

        if (parent.children) {
          parent.children.forEach((child) => {
            if (child.id === firstModuleId && child.route) {
              targetRoute = child.route;
            }
          });
        }
      });

      if (firstModuleId) {
        updateLastModuleAccess({ module_id: firstModuleId });
      }
    }

    if (targetRoute && targetRoute !== pathname) {
      hasInitialRedirect.current = true;
      router.push(targetRoute);
    } else {
      hasInitialRedirect.current = true;
    }
  }, [
    modules,
    pathname,
    userLogin?.last_module_id,
    getAllAccessibleModuleIds,
    updateLastModuleAccess,
    router,
  ]);

  useEffect(() => {
    if (!modules?.length || !hasInitialRedirect.current) return;

    let currentModuleId: number | null = null;
    modules.forEach((roleModule: IRoleModule) => {
      const parent = roleModule.module;
      if (!parent) return;

      if (parent.route && pathname.startsWith(parent.route) && parent.id) {
        currentModuleId = parent.id;
      }

      if (parent.children) {
        parent.children.forEach((child) => {
          if (child.route && pathname.startsWith(child.route) && child.id) {
            currentModuleId = child.id;
          }
        });
      }
    });

    if (currentModuleId && currentModuleId !== userLogin?.last_module_id) {
      updateLastModuleAccess({ module_id: currentModuleId });
    }
  }, [pathname, modules, userLogin?.last_module_id, updateLastModuleAccess]);

  const organizedModules = useMemo(() => {
    if (!modules || modules.length === 0) {
      return { regularSections: [], systemAdmin: null };
    }
    const regularSections: IRoleModule[] = [];
    let systemAdmin: IRoleModule | null = null;

    modules.forEach((roleModule: IRoleModule) => {
      if (!roleModule.checked || !roleModule.module) return;
      const moduleData = roleModule.module;
      const isSystemAdmin = moduleData.name.toLowerCase() === "configuration";
      if (isSystemAdmin) {
        systemAdmin = roleModule;
      } else {
        regularSections.push(roleModule);
      }
    });
    return { regularSections, systemAdmin };
  }, [modules]);

  const renderModule = (roleModule: IRoleModule) => {
    const moduleData = roleModule?.module;
    if (!moduleData) return null;

    const moduleType = moduleData.module_type?.name?.toLowerCase();
    const Icon = resolveIcon(moduleData.icon);
    const isExpanded = expandedItems.includes(moduleData?.id as number);
    const hasChildren = moduleData.children && moduleData.children.length > 0;

    const buttonClasses = (isActive: boolean) =>
      cn(
        "w-full flex items-center transition-all duration-200 cursor-pointer group",
        "gap-4 px-4 py-3 rounded-xl",
        collapsed ? "justify-center" : "justify-start",
        isActive
          ? "bg-slate-900 dark:bg-slate-800 text-white font-semibold shadow-md"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100"
      );

    if (moduleType === "label menu") {
      return (
        <div key={`module-${moduleData.id}`} className="mt-6 mb-2">
          <div
            className={cn(
              "px-5 text-[11px] font-bold tracking-widest text-gray-400 uppercase transition-all duration-200",
              collapsed && "opacity-0 h-0 mt-0 mb-0"
            )}
          >
            {moduleData.name}
          </div>
          {hasChildren && (
            <div className="space-y-1.5 mt-2">
              {moduleData.children?.map((child: IModule) => (
                <div key={`child-wrapper-${child.id}`}>
                  {renderModule({ ...roleModule, module: child })}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (moduleType === "route accordion" || (hasChildren && moduleType !== "label menu")) {
      const hasActiveChildItem = hasActiveChild(moduleData.children);

      return (
        <TooltipProvider key={`module-${moduleData.id}`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => toggleExpanded(moduleData?.id as number)}
                className={buttonClasses(hasActiveChildItem)}
              >
                <div className="flex items-center justify-center w-6 h-6 shrink-0">
                  <HugeiconsIcon icon={Icon} className="w-6 h-6" />
                </div>
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left text-[14px] font-medium leading-tight">
                      {moduleData.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-full">
                        {moduleData.children?.length || 0}
                      </span>
                      <svg
                        className={`w-4 h-4 opacity-50 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </>
                )}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" className="flex items-center gap-2 font-semibold">
                {moduleData.name}
                <span className="text-[10px] bg-blue-500 text-white px-1.5 rounded-full">
                  {moduleData.children?.length || 0}
                </span>
              </TooltipContent>
            )}
          </Tooltip>

          {isExpanded && (
            <div className={cn("overflow-hidden mt-1", collapsed ? "ml-0" : "ml-9")}>
              <div className="space-y-1 border-l-2 border-slate-100 dark:border-slate-800 ml-3 pl-2">
                {moduleData.children?.map((child: IModule) => {
                  const ChildIcon = resolveIcon(child.icon);
                  const isActive = isModuleActive(child.route);
                  return (
                    <button
                      key={`subchild-${child.id}`}
                      onClick={() => handleRedirect(child.route, child.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13.5px] transition-all text-left",
                        isActive
                          ? "text-slate-900 dark:text-white font-semibold bg-slate-50 dark:bg-slate-800/40"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/30"
                      )}
                    >
                      <HugeiconsIcon icon={ChildIcon} className="w-4.5 h-4.5" />
                      {!collapsed && <span>{child.name}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </TooltipProvider>
      );
    }

    if (moduleType === "route menu" || moduleData.route) {
      const isActive = isModuleActive(moduleData.route);
      return (
        <TooltipProvider key={`module-${moduleData.id}`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => handleRedirect(moduleData.route, moduleData.id)}
                className={buttonClasses(isActive)}
              >
                <div className="flex items-center justify-center w-6 h-6 shrink-0">
                  <HugeiconsIcon icon={Icon} className="w-6 h-6" />
                </div>
                {!collapsed && (
                  <span className="text-[14px] font-medium leading-tight">
                    {moduleData.name}
                  </span>
                )}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" className="font-semibold">
                {moduleData.name}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      );
    }
    return null;
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeSidebar}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white dark:bg-[#020617] z-51 transition-all duration-300 flex flex-col overflow-x-hidden border-r border-gray-200 dark:border-gray-700 backdrop-blur-lg",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          collapsed ? "w-18" : "w-64"
        )}
      >
        <div
          className={cn(
            "flex h-20 items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4",
            collapsed && "justify-center"
          )}
        >
          {!collapsed && (
            <Link href="/dashboard" aria-label="Go to dashboard">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl transform -rotate-3 hover:rotate-0 transition-transform">
                  Q
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tighter text-slate-900 leading-none">
                    Product
                  </h1>
                  <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">
                    Hub
                  </span>
                </div>
              </div>
            </Link>
          )}

          <button
            type="button"
            onClick={toggleCollapsed}
            className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <HugeiconsIcon
              icon={
                collapsed
                  ? Hugeicons.ArrowRight01Icon
                  : Hugeicons.ArrowLeft01Icon
              }
            />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4 no-scrollbar">
          {isLoading ? (
            <div className="space-y-4 px-2">
              {[...Array(10)].map((_, i) => (
                <div key={`skeleton-loading-${i}`} className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2.5">
                    <Skeleton className="w-5 h-5 rounded bg-slate-200" />
                    <Skeleton className="h-4 flex-1 bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col h-full bg-white dark:bg-[#020617]">
              <div className="flex-1">
                <nav className="space-y-1.5">
                  {organizedModules.regularSections.map((roleModule: IRoleModule) => renderModule(roleModule))}
                </nav>
              </div>
              {organizedModules.systemAdmin && (
                <div className="mt-auto pt-8">
                  {renderModule(organizedModules.systemAdmin)}
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
