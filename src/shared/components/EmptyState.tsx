import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-40 gap-3">
      {icon && <div className="text-text-muted">{icon}</div>}
      <div className="text-center">
        <p className="text-text font-medium">{title}</p>
        {description && (
          <p className="text-text-muted text-sm mt-1">{description}</p>
        )}
      </div>
      {action && action}
    </div>
  );
};
