import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const FormSection = ({ title, children, className = "" }: FormSectionProps) => {
  return (
    <div className={`bg-muted/30 rounded-xl p-6 space-y-5 border border-border/50 ${className}`}>
      <div className="flex items-center gap-3 pb-3 border-b-2 border-primary/20">
        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
        <h3 className="text-base font-bold text-primary uppercase tracking-wide">
          {title}
        </h3>
      </div>
      <div className="space-y-5">
        {children}
      </div>
    </div>
  );
};
