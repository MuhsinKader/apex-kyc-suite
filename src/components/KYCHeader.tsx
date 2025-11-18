import { Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <Button variant="ghost" size="sm" className="gap-2 font-semibold">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">User Account</span>
        </Button>
      </div>
    </header>
  );
};
