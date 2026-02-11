import { IconButton } from "@/app/components/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@/app/components/icons";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store";
import Link from "next/link";
import { SIDEBAR_GROUPS } from "./sidebar.hook";

export const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col border-r transition-all duration-300 ease-in-out",
        "bg-white dark:bg-gray-950",
        "border-gray-200 dark:border-gray-800",
        isCollapsed ? "w-16" : "w-64 lg:w-72",
        "lg:relative lg:translate-x-0"
      )}
    >
      {/* Sidebar Header */}
      <div
        className={cn(
          "flex h-16 items-center justify-between border-b px-4",
          "border-gray-200 dark:border-gray-800"
        )}
      >
        {!isCollapsed && (
          <div className="font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            Admin Panel
          </div>
        )}

        <IconButton
          icon={isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          className="hidden lg:flex text-gray-600 dark:text-gray-400"
          onClick={() => toggleSidebar(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"} />
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-6 px-3">
          {SIDEBAR_GROUPS.map((group, groupIndex) => (
            <li key={group.title}>
              {/* Group Title - hidden when collapsed */}
              {!isCollapsed && (
                <div
                  className={cn(
                    "mb-2 px-3 text-xs font-semibold uppercase tracking-wider",
                    "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {group.title}
                </div>
              )}

              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                        "dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100",
                        isCollapsed && "justify-center px-2",
                        item.isDisabled && 'disabled-link'
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer - simple version + copyright */}
      <div
        className={cn(
          "border-t px-4 py-3 text-xs",
          "border-gray-200 dark:border-gray-800",
          "text-gray-500 dark:text-gray-400"
        )}
      >
        {!isCollapsed ? (
          <div className="space-y-0.5">
            <div>Version: 1.0.0</div>
            <div>© {new Date().getFullYear()} Jun Dev</div>
          </div>
        ) : (
          <div className="text-center text-xs">v1</div>
        )}
      </div>
    </aside>
  );
}
