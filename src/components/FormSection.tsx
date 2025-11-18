import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const FormSection = ({ title, children, className = "" }: FormSectionProps) => {
  return (
    <div className={`space-y-5 p-7 bg-gradient-to-br from-muted/20 to-muted/10 rounded-2xl border-2 border-border/50 shadow-sm hover:border-primary/30 transition-all duration-300 ${className}`}>
      <div className="flex items-center gap-3.5 pb-2 border-b border-border/30">
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
        </div>
        <h3 className="text-lg font-bold text-foreground tracking-tight uppercase text-sm">{title}</h3>
      </div>
      <div className="space-y-5">
        {children}
      </div>
    </div>
  );
};
