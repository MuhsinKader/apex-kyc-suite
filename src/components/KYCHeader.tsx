import { Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const KYCHeader = () => {
  return (
    <header className="border-b border-border/40 bg-card/80 backdrop-blur-2xl shadow-[0_4px_24px_rgba(15,23,42,0.08)] sticky top-0 z-50">
      <div className="container mx-auto px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative p-3 bg-gradient-to-br from-primary via-primary-glow to-accent rounded-2xl shadow-[0_8px_24px_rgba(33,96,253,0.3)]">
            <Shield className="h-8 w-8 text-white" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Consumer Profile Bureau</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] font-bold mt-0.5">Know Your Customer Portal</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="gap-2.5 font-bold hover:bg-primary/10 hover:text-primary transition-all duration-300">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">User Account</span>
        </Button>
      </div>
    </header>
  );
};
