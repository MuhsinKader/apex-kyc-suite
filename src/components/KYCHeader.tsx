import { Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const KYCHeader = () => {
  return (
    <header className="border-b border-border/40 bg-card/80 backdrop-blur-2xl shadow-[0_4px_24px_rgba(15,23,42,0.08)] sticky top-0 z-50">
      <div className="container mx-auto px-6 xl:px-8 2xl:px-12 py-5 xl:py-6 2xl:py-8 flex items-center justify-between">
        <div className="flex items-center gap-4 xl:gap-5">
          <div className="relative p-3 xl:p-4 bg-gradient-to-br from-primary via-primary-glow to-accent rounded-2xl shadow-[0_8px_24px_rgba(33,96,253,0.3)]">
            <Shield className="h-8 w-8 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 text-white" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          <div>
            <h1 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-foreground tracking-tight">Consumer Profile Bureau</h1>
            <p className="text-xs xl:text-sm 2xl:text-base text-muted-foreground uppercase tracking-[0.15em] font-bold mt-0.5">Know Your Customer Portal</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="gap-2.5 font-bold hover:bg-primary/10 hover:text-primary transition-all duration-300 text-sm xl:text-base h-10 xl:h-12">
          <User className="h-4 w-4 xl:h-5 xl:w-5" />
          <span className="hidden sm:inline">User Account</span>
        </Button>
      </div>
    </header>
  );
};
