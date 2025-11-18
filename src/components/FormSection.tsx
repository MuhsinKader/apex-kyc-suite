import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const FormSection = ({ title, children, className = "" }: FormSectionProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-sm font-semibold text-primary uppercase tracking-wide border-b border-border pb-2">
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};
