import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const FormSection = ({ title, children, className = "" }: FormSectionProps) => {
  return (
    <div className={`space-y-4 p-5 bg-card/60 backdrop-blur-xl rounded-2xl border border-border/60 shadow-[0_8px_32px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_48px_rgba(33,96,253,0.12)] hover:border-primary/40 transition-all duration-500 ${className}`}>
      <div className="flex items-center gap-2.5 pb-2 border-b border-border/40">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-primary via-primary-glow to-accent shadow-[0_4px_16px_rgba(33,96,253,0.3)]">
          <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-transparent animate-pulse" />
        </div>
        <h3 className="text-xs font-bold text-foreground tracking-wide uppercase">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};
