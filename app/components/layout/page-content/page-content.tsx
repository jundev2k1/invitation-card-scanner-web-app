import { ChevronRightIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface AdminContentLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
  filters?: ReactNode;
  actions?: ReactNode;
}

export const PageContent = ({
  children,
  title,
  description,
  breadcrumbs = [],
  filters,
  actions,
}: AdminContentLayoutProps) => {
  return (
    <div className="flex flex-col min-h-full space-y-6">
      {/* Header section: Breadcrumb + Title + Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1.5">
          {/* Breadcrumb */}
          {breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/admin" className="hover:text-foreground transition-colors">
                <HomeIcon className="h-4 w-4" />
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  <ChevronRightIcon className="h-4 w-4 mx-1 text-muted-foreground" />
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* Page Title */}
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            {title}
          </h1>

          {/* Optional description */}
          {description && (
            <p className="text-muted-foreground text-sm md:text-base max-w-3xl">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Actions slot (right side) */}
      {(actions || filters) && (
        <div className="grid md:grid-cols-2 sm:1 gap-2 my-2 sm:mt-0">
          <div className="flex items-center gap-2">{filters}</div>
          <div className="flex items-center justify-end gap-2">{actions}</div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 bg-background rounded-lg border border-border shadow-sm">

        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};
