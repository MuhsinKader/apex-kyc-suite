import { Shield, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";

export const KYCHeader = () => {
  return (
    <header className="border-b-2 border-border/50 bg-gradient-to-r from-card via-card to-muted/20 shadow-lg">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-gradient-to-br from-primary to-primary-glow rounded-xl shadow-md">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Consumer Profile Bureau</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Know Your Customer Portal</p>
          </div>
        </div>
        <NavLink icon={User} text="User Account" />
      </div>
    </header>
  );
};
